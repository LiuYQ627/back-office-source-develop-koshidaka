package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.AuthorizationCommonModel;
import com.ttss.prementenance.model.AuthorizationRoleModel;
import com.ttss.prementenance.model.AuthorizationUsersQueryResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostAuthorizationLoginRequestModel;
import com.ttss.prementenance.model.PostAuthorizationLoginResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersDeleteUserRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersDeleteUserResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersQueryRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersQueryResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRetrieveRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRetrieveResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesResponseModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRetrieveRequestModel;
import com.ttss.prementenance.model.PostAuthorizationUsersRolesRetrieveResponseModel;
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

import lombok.Data;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221216 tianxh(Neusoft)    G001.00.0  issue課題#809を対応します.
 * 20221230  tianxh(Neusoft)  G002.00.0  issue課題#1169を対応します.
 */
/**
* ユーザ情報API.
*
* @author
* @version 1.0.
*/
@Service
public class AuthorizationService {

	@Autowired
	public AuthorizationService() {
	}

	@Autowired
	public HttpSession session;

	/**
	 * ログインAPI実行.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationLoginResponseModel postLogin(
			PostAuthorizationLoginRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken) {

		var responseModel = new PostAuthorizationLoginResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ログイン処理をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationlogin();

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json));
			// 応答Bodyないなので変換しない
			var messageKey = "";
			Object[] args = null;
			switch (response.statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);

				break;
			case 401:
				if (response.body().indexOf("PASSWORD_EXPIRED") >= 0) {
					// パスワード有効期限切れ
					responseModel.getResult().setCode(5);
					return responseModel;
				}
				// AS TEC.Gotou STD#809
				if (response.body().indexOf("INVALID_USER") >= 0) {
					// パスワードがロックされています。
					responseModel.getResult().setCode(response.statusCode());
					messageKey = "O00001.E022";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.body(), args));

					return responseModel;
				}
				// AE TEC.Gotou STD#809

				// 認証失敗
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E003";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));

				return responseModel;
			case 403:
				// 認証失敗
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E003";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));

				return responseModel;
			//KSD V001.000 AS
			case 400:
				responseModel.getResult().setCode(-98);
				responseModel.setResponseModel(mapper.readValue(response.body(), new TypeReference<Map<String,Object>>(){}));
				return responseModel;
			//KSD V001.000 AE
			default:
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}

			// "EleraToken"
			responseModel.setELERAToken(response.headers().allValues("authorization").get(0));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E002"), -30, e));
		}
		return responseModel;
	}

	// G001.00.0 Add-Start
	/**
	 * パスワードの更新API実行.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationLoginResponseModel postPwUpdate(
			PostAuthorizationLoginRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken) {

		var responseModel = new PostAuthorizationLoginResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ログイン処理をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationlogin();

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json));
			// 応答Bodyないなので変換しない
			var messageKey = "";
			Object[] args = null;
			switch (response.statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);

				break;
			case 401:
				if (response.body().indexOf("PASSWORD_EXPIRED") >= 0) {
					// パスワード有効期限切れ
					responseModel.getResult().setCode(5);
					return responseModel;
				}
				if (response.body().indexOf("BAD_CREDENTIALS") >= 0) {
					// 古いパスワードを間違
					responseModel.getResult().setCode(response.statusCode());
					messageKey = "O00001.E006";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.body(), args));

					return responseModel;
				}
				if (response.body().indexOf("INVALID_USER") >= 0) {
					// パスワードがロックされています。
					responseModel.getResult().setCode(response.statusCode());
					messageKey = "O00001.E022";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.body(), args));

					return responseModel;
				}
				// 認証失敗
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E003";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));

				return responseModel;
			case 403:
				// 認証失敗
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E003";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));

				return responseModel;
			//KSD V001.000 AS
			case 400:
					responseModel.getResult().setCode(-98);
					responseModel.setResponseModel(mapper.readValue(response.body(), new TypeReference<Map<String,Object>>(){}));
					return responseModel;
				//KSD V001.000 AE
			default:
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "O00001.E006";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}

			// "EleraToken"
			responseModel.setELERAToken(response.headers().allValues("authorization").get(0));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E006"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E005"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E005"), -30, e));
		}
		return responseModel;
	}
	// G001.00.0 Add-End
	
	/**
	 * ユーザ情報更新
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersResponseModel postUsers(
			PostAuthorizationUsersRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostAuthorizationUsersResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ユーザ情報更新をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusers();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				if (response.getResponse().body().indexOf("DUPLICATE_POSUSER") != -1) {
					responseModel.getResult().setCode(-100);
					messageKey = "F00001.E008";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
				} else {
					messageKey = "F00001.E007";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
				}
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), AuthorizationCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E007"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E007"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ユーザ情報削除
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersDeleteUserResponseModel postUsersDeleteUser(
			PostAuthorizationUsersDeleteUserRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostAuthorizationUsersDeleteUserResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ユーザ情報削除をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersdeleteuser();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00001.E010";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), AuthorizationCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E009"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E010"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E010"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ユーザ情報取得
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersRetrieveResponseModel postUsersRetrieve(
			PostAuthorizationUsersRetrieveRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostAuthorizationUsersRetrieveResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ユーザ情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersretrieve();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			case 204:
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00001.E004";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(
						mapper.readValue(response.getResponse().body(), AuthorizationCommonModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E004"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E004"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ユーザ情報問い合わせ
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersQueryResponseModel postUsersQuery(
			PostAuthorizationUsersQueryRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostAuthorizationUsersQueryResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ユーザ情報問い合わせをリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());
			//            if (json.equals("{}")) {
			//                // 空っぽの場合はjson自体空にしておく
			//                json = "";
			//            }

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersquery();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			case 204:
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00001.E004";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					new TypeReference<List<AuthorizationUsersQueryResponseModel>>() {
					}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E004"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E004"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ロール取得
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersRolesRetrieveResponseModel postUsersRolesRetrieve(
			PostAuthorizationUsersRolesRetrieveRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken) {

		var responseModel = new PostAuthorizationUsersRolesRetrieveResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ロール取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersrolesretrieve();

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json));

			var messageKey = "";
			Object[] args = null;
			switch (response.statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				break;
			default:
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "F00001.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.body(), new TypeReference<List<AuthorizationRoleModel>>() {
					}));

			// 必ず取れる前提
			if (responseModel.getResponseModel().size() == 0) {
				responseModel.getResult().setCode(-1);
				messageKey = "F00001.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ロール設定
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostAuthorizationUsersRolesResponseModel postUsersRoles(
			PostAuthorizationUsersRolesRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostAuthorizationUsersRolesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ロール取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersroles();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00001.E023";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), AuthorizationRoleModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E022"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E023"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00001.E023"), -30, e));
		}
		return responseModel;
	}

	//G002.00.0 Add-Start
	/**
	 * ユーザロール削除
	 *
	 * @param requestBodyModel  リクエストボディ
	 * @param messageSource     メッセージソース
	 * @param apiContext        アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ
	 * @since 2022.12.30
	 * @since [ISSUE 1169]
	 */
	public DeleteRolesResponseModel postUsersDeleteRoles(
			DeleteRolesRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new DeleteRolesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ロール取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel);

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationUsersDeleteRoles();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
				case 200:
				case 204:
					// 正常
					responseModel.getResult().setCode(0);
					// WSO2のトークン格納
					responseModel.getResult().setWSO2Token(response.getWSO2Token());
					// ELERAのトークン格納
					responseModel.getResult().setELERAToken(response.getELERAToken());
					break;
				default:
					responseModel.getResult().setCode(response.getResponse().statusCode());
					messageKey = "F00004.E045";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E044"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E045"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E045"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * Authorizationユーザロール設定レスポンス データモデル.
	 *
	 * @since 2022.12.30
	 * @since [ISSUE 1169]
	 */
	@Data
	public static class DeleteRolesResponseModel {

		/**
		 * 実行結果
		 */
		private ApiCommonResponseModel result = new ApiCommonResponseModel();

	}

	/**
	 * 
	 * @since 2022.12.30
	 * @since [ISSUE 1169]
	 */
	@Data
	public static class DeleteRolesRequestModel {

		/**
		 * userId
		 */
		private String userId;

		/**
		 * nodeId
		 */
		private String nodeId;

	}
	// G002.00.0 Add-End

//KSD V001.000 20230821 AS
		/**
		 * 暗号化POSパスワード取得
		 * @param model リクエストパラメータ
		 * @param messageSource メッセージソース
		 * @return API応答＋エラーメッセージ
		 */
		public RentalsUpdateResponseModel AuthorizationEncodepwdGet(
				Map<String, Object> model,
				MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

			var responseModel = new RentalsUpdateResponseModel();
			var messageResourseUtil = new MessageSourceUtil(messageSource);

			// リクエスト作成
			try {
				// リクエストボディ設定(Object→JSON)
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				String json = mapper.writeValueAsString(model);

				// URLの生成
				var url = "";
				url = apiContext.getWso2CommonUrl() + apiContext.getAuthorizationusersretrieveencodepwd();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//				url = "http://localhost:8082/" + apiContext.getAuthorizationusersretrieveencodepwd();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

				// リクエストを送信して応答を取得
				HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
						accessToken, ELERAToken, json, userId, passWord , messageSource);

				var messageKey = "";
				Object[] args = null;
				switch (response.getResponse().statusCode()) {
				case 200:
					// 正常
					responseModel.getResult().setCode(0);
					// WSO2のトークン格納
					responseModel.getResult().setWSO2Token(response.getWSO2Token());
					// ELERAのトークン格納
					responseModel.getResult().setELERAToken(response.getELERAToken());
					break;
				default:
					responseModel.getResult().setCode(response.getResponse().statusCode());
//KSD V001.000 20231117 CS
//					messageKey = "C00211.E002";
					messageKey = "C00227.E004";
//KSD V001.000 20231117 CE
					responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
					return responseModel;
				}
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
				if (responseModel.getResponseModel().size() == 0) {
					// 該当ユーザなし
					responseModel.getResult().setCode(2);
				}

			} catch (ConnectException e) {
				// 通信に失敗時
//KSD V001.000 20231117 CS
//				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E001"), -10, e));
				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00227.E003"), -10, e));
//KSD V001.000 20231117 CE
			} catch (JsonProcessingException e) {
				// JSON変換エラー
//KSD V001.000 20231117 CS
//				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E002"), -20, e));
				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00227.E004"), -20, e));
//KSD V001.000 20231117 CE
			} catch (Exception e) {
				// 上記以外
//KSD V001.000 20231117 CS
//				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E002"), -30, e));
				responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("C00227.E004"), -30, e));
//KSD V001.000 20231117 CE
			}
			return responseModel;
		}
//KSD V001.000 20230821 AE
		

}
