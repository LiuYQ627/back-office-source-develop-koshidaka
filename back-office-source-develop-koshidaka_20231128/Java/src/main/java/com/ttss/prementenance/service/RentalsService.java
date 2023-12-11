package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostRentalsQueryRequestBodyModel;
import com.ttss.prementenance.model.PostRentalsQueryRequestParamModel;
import com.ttss.prementenance.model.RentalsCommonResponseModel;
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* Rentalsアイテム サービス
*
* @author 
* @version 1.0.0
*/
@Service
public class RentalsService {

	/**
	 * 曜日区分アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsWeekdayDivisionQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsweekdaydivisionquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsweekdaydivisionquery() + params;
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
				messageKey = "C00214.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 曜日区分アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsWeekdayDivisionUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsWeekdayDivisionUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsweekdaydivision() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsweekdaydivision() + params;
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
				messageKey = "C00214.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 曜日区分アイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsWeekdayDivisionDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long weekdayCode = model.get("weekdayCode").hashCode();
			Integer intWeekdayCode = Integer.valueOf((int)weekdayCode);
			String strWeekdayCode = intWeekdayCode.toString();
			
			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsweekdaydivisionnodeid().replace("{nodeId}", nodeId).replace("{weekdayCode}", strWeekdayCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsweekdaydivisionnodeid().replace("{nodeId}", nodeId).replace("{weekdayCode}", strWeekdayCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00214.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00214.E008"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * ルームコースアイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomcourseQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomcoursequery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomcoursequery() + params;
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
				messageKey = "C00215.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * ルームコースアイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsRoomcourseUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsRoomcourseUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomcourse() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomcourse() + params;
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
				messageKey = "C00215.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * ルームコースアイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomcourseDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long chargeCode = model.get("chargeCode").hashCode();
			Integer intChargeCode = Integer.valueOf((int)chargeCode);
			String strChargeCode = intChargeCode.toString();
			
			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomcoursenodeid().replace("{nodeId}", nodeId).replace("{chargeCode}", strChargeCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomcoursenodeid().replace("{nodeId}", nodeId).replace("{chargeCode}", strChargeCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00215.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E008"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * ドリンクコースアイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsDrinkcourseQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsdrinkcoursequery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsdrinkcoursequery() + params;
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
				messageKey = "C00217.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * ドリンクコースアイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsDrinkcourseUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsDrinkcourseUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsdrinkcourse() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsdrinkcourse() + params;
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
				messageKey = "C00217.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * ドリンクコースアイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsDrinkcourseDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long drinkCourseNo = model.get("drinkCourseNo").hashCode();
			Integer intDrinkCourseNo = Integer.valueOf((int)drinkCourseNo);
			String strDrinkCourseNo = intDrinkCourseNo.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsdrinkcoursenodeid().replace("{nodeId}", nodeId).replace("{drinkCourseNo}", strDrinkCourseNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsdrinkcoursenodeid().replace("{nodeId}", nodeId).replace("{drinkCourseNo}", strDrinkCourseNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00217.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00217.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ルームコース料金アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomcourseRateQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomcourseratequery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomcourseratequery() + params;
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
				messageKey = "C00211.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * ルームコース料金アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomcourseRateUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomcourserate() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomcourserate() + params;
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
				messageKey = "C00211.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//issues #162 対応（Body部無し） 2023.04.18 ST
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//			if (responseModel.getResponseModel().size() == 0) {
//				// 該当ユーザなし
//				responseModel.getResult().setCode(2);
//			}
//issues #162 対応（Body部無し） 2023.04.18 ED

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00211.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 機材アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsEquipmentQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsequipmentquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsequipmentquery() + params;
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
				messageKey = "C00218.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 機材アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230809 DS
//	public RentalsCommonResponseModel RentalsEquipmentUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230809 DE
//KSD V001.000 20230809 AS
	public RentalsUpdateResponseModel RentalsEquipmentUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230809 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsequipment() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsequipment() + params;
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
				messageKey = "C00218.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//KSD V001.000 20230809 DS
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230809 DE
//KSD V001.000 20230809 AS
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230809 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 機材アイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsEquipmentDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long equipNo = model.get("equipNo").hashCode();
			Integer intEquipNo = Integer.valueOf((int)equipNo);
			String strEquipNo = intEquipNo.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsequipmentnodeid().replace("{nodeId}", nodeId).replace("{equipNo}", strEquipNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsequipmentnodeid().replace("{nodeId}", nodeId).replace("{equipNo}", strEquipNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00218.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00218.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 機材設備アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsModelQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsmodelquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsmodelquery() + params;
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
				messageKey = "C00219.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 機材設備アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230809 DS
//	public RentalsCommonResponseModel RentalsModelUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230809 DE
//KSD V001.000 20230809 AS
	public RentalsUpdateResponseModel RentalsModelUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230809 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsmodel() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsmodel() + params;
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
				messageKey = "C00219.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//KSD V001.000 20230810 DS
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230810 AS
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 機材設備アイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsModelDelete(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long modelNo = model.get("modelNo").hashCode();
			Integer intModelNo = Integer.valueOf((int)modelNo);
			String strModelNo = intModelNo.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsmodelnodeid().replace("{nodeId}", nodeId).replace("{modelNo}", strModelNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsmodelnodeid().replace("{nodeId}", nodeId).replace("{modelNo}", strModelNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00219.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00219.E008"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * 部屋関連情報アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomInformationQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroominformationquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroominformationquery() + params;
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
				messageKey = "C00220.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 部屋関連情報アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsRoomInformationUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsRoomInformationUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroominformation() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroominformation() + params;
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
				messageKey = "C00220.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 部屋関連情報アイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomInformationDelete(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long indexNo = model.get("indexNo").hashCode();
			Integer intIndexNo = Integer.valueOf((int)indexNo);
			String strIndexNo = intIndexNo.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroominformationnodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroominformationnodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00220.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00220.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 部屋情報アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomquery() + params;
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
				messageKey = "C00208.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 部屋情報アイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsRoomUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsRoomUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroom() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroom() + params;
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
				messageKey = "C00208.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 部屋情報アイテム削除
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long indexNo = model.get("indexNo").hashCode();
			Integer intIndexNo = Integer.valueOf((int)indexNo);
			String strIndexNo = intIndexNo.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomnodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomnodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
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
				messageKey = "C00208.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00208.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 部屋情報サブアイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsRoomSubQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
			PostRentalsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomsubquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomsubquery() + params;
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
				messageKey = "C00221.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 部屋情報サブアイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsRoomSubUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsRoomSubUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalsroomsub() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalsroomsub() + params;
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
				messageKey = "C00221.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00221.E006"), -30, e));
		}
		return responseModel;
	}


	/**
	 * カレンダーアイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RentalsCommonResponseModel RentalsCalendarQuery(
			PostRentalsQueryRequestParamModel requestParamModel, 
// KSD V001.000 20230719 DS
//			PostRentalsQueryRequestBodyModel requestBodyModel,
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
			Map<String, Object> model,
// KSD V001.000 20230719 AE
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
// KSD V001.000 20230719 DS
//			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
			String json = mapper.writeValueAsString(model);
// KSD V001.000 20230719 AE

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalscalendarquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalscalendarquery() + params;
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
				messageKey = "C00212.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * カレンダーアイテム新規作成／更新
	 * @param model リクエスト
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RentalsCommonResponseModel RentalsCalendarUpdate(
//			Map<String, Object> model, 
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RentalsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel RentalsCalendarUpdate(
			Map<String, Object> model, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRentalscalendar() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRentalscalendar() + params;
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
				messageKey = "C00212.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//KSD V001.000 20230816 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00212.E006"), -30, e));
		}
		return responseModel;
	}

}
