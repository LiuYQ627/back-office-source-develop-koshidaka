/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230301  dingxin(Neusoft)   G001.00.0  issue課題#715を対応します.
 */
package com.ttss.prementenance.service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.AccessAuthorityModel;
import com.ttss.prementenance.model.AuthorizationRoleModel;
import com.ttss.prementenance.model.GetAccessAuthorityRequestModel;
import com.ttss.prementenance.model.GetAccessAuthorityResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostPermissionsRequestModel;
import com.ttss.prementenance.model.PostPermissionsResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import java.net.ConnectException;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

/**
 * ユーザ情報API.
 *
 * @author
 * @version 1.0.
 */
@Service
public class PermissionsService {

	@Autowired
	public PermissionsService() {
	}

	@Autowired
	public HttpSession session;

	/**
	 * テーブル取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2022.09.01
	 */
	public GetAccessAuthorityResponseModel getList(GetAccessAuthorityRequestModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord, String query) {

		var responseModel = new GetAccessAuthorityResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ノード取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet("");

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPermissionsList() + query;

			// リクエストを送信して応答を取得
			// HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
			// accessToken, ELERAToken, params);
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "",
					"", accessToken, ELERAToken, "", userId, passWord, messageSource);

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
				messageKey = "O00001.E020";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					new TypeReference<List<AccessAuthorityModel>>() {
					}));
			if (responseModel.getResponseModel() == null) {
				// 該当なし
				responseModel.getResult().setCode(2);
			}
			// G001.00.0 Add-Start
			if (responseModel.getResponseModel().size() == 0) {
				// 該当なし
				responseModel.getResult().setCode(2);
			}
			// G001.00.0 Add-End

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E019"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E020"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E020"), -30, e));
		}
		return responseModel;
	}

	/**
	 * アクセス権限設定
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ 2021.12.01
	 */
	public PostPermissionsResponseModel postRoleName(PostPermissionsRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord, String roreName,
			String changePlanName) {

		var responseModel = new PostPermissionsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// アクセス権限設定をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			//            var url = apiContext.getWso2CommonUrl()
			//                    + apiContext.getPermissionsRolename().replace("{roleName}", roreName) + "/"
			//                    + changePlanName;
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getPermissionsRolename();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json, accessToken,
					ELERAToken,
					ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

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
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), AuthorizationRoleModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E022"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E023"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E023"), -30, e));
		}
		return responseModel;
	}

	/**
	 * アクセス権限削除
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return ログインAPI応答＋エラーメッセージ 2021.12.01
	 */
	public PostPermissionsResponseModel deleteRoleName(PostPermissionsRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord, String roreName,
			String changePlanName) {

		var responseModel = new PostPermissionsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// アクセス権限設定をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			//            var url = apiContext.getWso2CommonUrl()
			//                    + apiContext.getPermissionsRolename().replace("{roleName}", roreName) + "/"
			//                    + changePlanName;
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getPermissionsRolename();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json, accessToken,
					ELERAToken,
					ApiUtil.deletedPrivacyInfo(json), userId, passWord, messageSource);

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
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), AuthorizationRoleModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E022"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E023"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00001.E023"), -30, e));
		}
		return responseModel;
	}
}
