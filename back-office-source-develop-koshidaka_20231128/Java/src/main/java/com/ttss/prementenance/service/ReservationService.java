/**
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221214  dingxin(Neusoft)  G001.00.0  issue課題#983を対応します.
 * 20221220  dingxin(Neusoft)  G002.00.0  issue課題#1212を対応します.
 * 20221226  duyouwei(Neusoft) G003.00.0  issue課題#1161を対応します.
 */
package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.ConfigurationDetailModel;
import com.ttss.prementenance.model.ConfigurationDetailResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.GetReservationDateQueryRequestParamModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PutReservationResponseModel;
import com.ttss.prementenance.model.ReservationDateModel;
import com.ttss.prementenance.model.ReservationDateResponseModel;
import com.ttss.prementenance.model.ReservationDetailModel;
import com.ttss.prementenance.model.ReservationDetailResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* 基準日情報取得API.
*
* @author
* @version 1.0.0
*/
@Service
public class ReservationService {

	/**
	 * 基準日一覧取得API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public ReservationDateResponseModel getReservationDate(
			GetReservationDateQueryRequestParamModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ReservationDateResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/list" + params;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<ReservationDateModel>>() {
					}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 基準日詳細情報取得API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public ReservationDetailResponseModel getReservationDetail(
			GetReservationDateQueryRequestParamModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ReservationDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/list" + params;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<ReservationDetailModel>>() {
					}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 基準日詳細の更新API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PutReservationResponseModel updateReservation(
			String nodeId, String type, String executionDate,
			ReservationDetailModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PutReservationResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel);
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/" + nodeId + "/" + type + "/"
					+ executionDate;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), ReservationDetailModel.class));
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}
	
	// G002.00.0 Add Start
	/**
	 * 基準日詳細の削除API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public PutReservationResponseModel destroyReservation(
			String nodeId, String type, String executionDate,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PutReservationResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/" + nodeId + "/" + type + "/"
					+ executionDate;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E008";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), ReservationDetailModel.class));
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E008"), -30, e));
		}
		return responseModel;
	}
	// G002.00.0 Add End

	/**
	 * 基準日詳細の更新API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PutReservationResponseModel updateConfigReservation(
			String nodeId, String type, String executionDate,
			GetConfigurationsNodesNodeIdResponseModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PutReservationResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel);
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/" + nodeId + "/" + type + "/"
					+ executionDate;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), ReservationDetailModel.class));
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 基準日詳細の更新API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PutReservationResponseModel updateReservationReflect(
			String nodeId, String type, String executionDate,
			ReservationDetailModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PutReservationResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel);
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/reservations/" + nodeId + "/" + type + "/"
					+ executionDate + "/reflect";

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel
					.setResponseModel(mapper.readValue(response.getResponse().body(), ReservationDetailModel.class));
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 現在設定詳細情報取得API.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public ConfigurationDetailResponseModel getConfigurationDetail(
			String nodeId,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ConfigurationDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// nodeを設定
			// G001.00.0 Update Start
//			var url = apiContext.getWso2CommonUrl() + "configurations/nodes/" + nodeId;
			var url = apiContext.getWso2CommonUrl() + "configurations/nodes/" + nodeId + "?sparse=true";
			// G001.00.0 Update End
			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00107.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<ConfigurationDetailModel>() {
					}));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

	// G003.00.0 Add-Start
	/**
	 *
	 * @param nodeId ノードID　企業、店舗など
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public ConfigurationDetailResponseModel getConfigurationDetailRecursive(
			String nodeId,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ConfigurationDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// nodeを設定
			var url = apiContext.getWso2CommonUrl() + "configurations/nodes/" + nodeId;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + "configurations/nodes/" + nodeId;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA deb
			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

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
					messageKey = "F00107.E002";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<ConfigurationDetailModel>() {
					}));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}
	// G003.00.0 Add-End
}
