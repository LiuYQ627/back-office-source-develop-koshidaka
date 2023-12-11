package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.DeleteDevicesResponseModel;
import com.ttss.prementenance.model.DevicesCommonModel;
import com.ttss.prementenance.model.GetDevicesNodeResponseModel;
import com.ttss.prementenance.model.GetDevicesResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestBodyModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestParamModel;
import com.ttss.prementenance.model.PostDevicesQueryResponseModel;
import com.ttss.prementenance.model.PostDevicesRequestModel;
import com.ttss.prementenance.model.PostDevicesResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* デバイス情報取得API.
*
* @author 
* @version 1.0.0
*/
@Service
public class DevicesService {

	/**
	 * デバイス情報取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public GetDevicesResponseModel getDevices(
			String deviceId, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetDevicesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			String param = "";

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getDevicesdeviceid().replace("{deviceId}", deviceId);

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", param,
					accessToken, ELERAToken, param, userId, passWord , messageSource);
			
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
				messageKey = "F00107.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
            if (response.getResponse().body().length() == 0) {
                // データなし
                responseModel.getResult().setCode(2);
            } else {
    			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
    			// レスポンス変換（JSON -> Javaオブジェクト）
    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), DevicesCommonModel.class));
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
	 * デバイス情報削除.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public DeleteDevicesResponseModel deleteDevices(
			String deviceId, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new DeleteDevicesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			String json = "";

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getDevicesdeviceid().replace("{deviceId}", deviceId);

			// リクエストを送信して応答を取得
//			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.DELETE, "", json,
//					accessToken, ELERAToken, json);
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "", json,
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
				messageKey = "F00107.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), DevicesCommonModel.class));

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

	/**
	 * デバイス情報更新.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostDevicesResponseModel postDevices(
			PostDevicesRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostDevicesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報更新をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getDevices();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord , messageSource);
			
			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00107.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), DevicesCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * デバイス構成取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public GetDevicesNodeResponseModel getDevicesNode(
			String nodeId, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken) {

		var responseModel = new GetDevicesNodeResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			String param = "";

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getDevicesnodenodeid().replace("{nodeId}", nodeId);

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", param,
					accessToken, ELERAToken, param);
			var messageKey = "";
			Object[] args = null;
			switch (response.statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				break;
			default:
				responseModel.getResult().setCode(response.statusCode());
				messageKey = "F00107.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.body(), DevicesCommonModel.class));

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

	/**
	 * デバイス情報照会.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostDevicesQueryResponseModel postDevicesQuery(
			PostDevicesQueryRequestParamModel requestParamModel, 
			PostDevicesQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostDevicesQueryResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getDevicesquery() + params;

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
				messageKey = "F00107.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<DevicesCommonModel>>(){}));
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
}
