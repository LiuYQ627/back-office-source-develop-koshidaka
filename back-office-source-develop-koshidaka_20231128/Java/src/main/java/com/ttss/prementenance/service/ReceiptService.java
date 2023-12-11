/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230203  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 * 20230320  wangchunmei(Neusoft)  G002.00.0  issue課題#1586を対応します.
 */
package com.ttss.prementenance.service;

import java.math.BigInteger;
import java.net.ConnectException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.FetchReceiptDetailResponseModel;
import com.ttss.prementenance.model.GetReceiptDetailRequestModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.request.ReceiptListRequest;
import com.ttss.prementenance.response.ReceiptListResponse;
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
public class ReceiptService {
	/**
	 * レシート.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public FetchReceiptDetailResponseModel getReceiptDetail(
			GetReceiptDetailRequestModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new FetchReceiptDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + "receiptplans/setting/" + requestParamModel.getCompanyCode() + "/" + requestParamModel.getStoreCode() + "/" + requestParamModel.getPlanningCode();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params, 
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
					mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {
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

	public FetchReceiptDetailResponseModel updateReceiptDetail(
			Map<String, Object> requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new FetchReceiptDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			var url = apiContext.getWso2CommonUrl() + "receiptplans/setting/"
					+ requestParamModel.get("companyCode").toString() + "/"
					+ requestParamModel.get("storeCode").toString() + "/"
					+ requestParamModel.get("planningCode").toString();

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			var params = new JSONObject(requestParamModel).toString();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.PUT, "", params, 
					accessToken, ELERAToken, params, userId, passWord, messageSource);

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
					mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {
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
	
	public ReceiptListResponse getReceiptList(
			ReceiptListRequest requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ReceiptListResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
//			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);

			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + "receiptplans/" + requestParamModel.getCompanyCode() + '/' + requestParamModel.getStoreCode();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
					accessToken, ELERAToken, params, userId, passWord, messageSource);

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
			// G002.00.0 Add-Start
			case 204:
				responseModel.getResult().setCode(2);
				return responseModel;
			// G002.00.0 Add-End
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
					mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {
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

	// G001.00.0 Add-Start
	public FetchReceiptDetailResponseModel destroyReceiptDetail(
			Map<String, Object> requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new FetchReceiptDetailResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			var url = apiContext.getWso2CommonUrl() + "receiptplans/setting/"
					+ requestParamModel.get("companyCode").toString() + "/"
					+ requestParamModel.get("storeCode").toString() + "/"
					+ requestParamModel.get("planningCode").toString();

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			var params = "";

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "", params,
					accessToken, ELERAToken, params, userId, passWord, messageSource);

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
					responseModel.getResult().setCode(2);
					break;
				default:
					responseModel.getResult().setCode(response.getResponse().statusCode());
					messageKey = "F00107.E002";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
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

	public String getHashValue(String key) {
		String cacheKey;
		try {
			MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
			byte[] sha256_result = sha256.digest(key.getBytes());
			cacheKey = String.format("%040x", new BigInteger(1, sha256_result));
		} catch (NoSuchAlgorithmException e) {
			cacheKey = String.valueOf(key.hashCode());
		}
		return cacheKey;
	}
	// G001.00.0 Add-End
}