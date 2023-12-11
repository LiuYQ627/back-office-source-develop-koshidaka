package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.DurationTimeModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.LanguageDisplayModel;
import com.ttss.prementenance.model.PostRestaurantsQueryRequestBodyModel;
import com.ttss.prementenance.model.PostRestaurantsQueryRequestParamModel;
import com.ttss.prementenance.model.RestaurantsCommonResponseModel;
import com.ttss.prementenance.model.RestaurantsComplianceResponseModel;
import com.ttss.prementenance.model.RestaurantsDeleteResponseModel;
import com.ttss.prementenance.model.RestaurantsMasterFscpRegisterRequestModel;
import com.ttss.prementenance.model.RestaurantsQueryRequestParamModel;
import com.ttss.prementenance.model.RestaurantsUpdateResponseModel;
import com.ttss.prementenance.request.PostRestaurantsSetToolDbSelectRequest;
import com.ttss.prementenance.request.RestaurantsMasterFscpRequest;
import com.ttss.prementenance.response.DeleteRestaurantResponseModel;
import com.ttss.prementenance.response.PostRestaurantsMasterFscpDataResponse;
import com.ttss.prementenance.response.PostRestaurantsMasterFscpDataResponseUpd;
import com.ttss.prementenance.response.PostRestaurantsSetToolDbSelectResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* Restaurantsアイテム　サービス
*
* @author 
* @version 1.0.0
*/
@Service
public class RestaurantsService {

	/**
	 * 会員ランク アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsMemberRankQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsmemberrankquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsmemberrankquery() + params;
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
				messageKey = "C00213.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 会員ランク アイテム新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230810 DS
//	public RestaurantsCommonResponseModel RestaurantsMemberRankUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
	public RestaurantsUpdateResponseModel RestaurantsMemberRankUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230810 AE
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsmemberrank() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsmemberrank() + params;
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
				messageKey = "C00213.E006";
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
//KSD V001.000 20230810 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 会員ランク アイテム削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsMemberRankDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsmemberranknodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsmemberranknodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
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
				messageKey = "C00213.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00213.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 年齢区分アイテム取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsAgeDivisionQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsagedivisionquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsagedivisionquery() + params;
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
				messageKey = "C00216.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 年齢区分アイテム新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230810 DS
//	public RestaurantsCommonResponseModel RestaurantsAgeDivisionUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
	public RestaurantsUpdateResponseModel RestaurantsAgeDivisionUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230810 AE
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsagedivision() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsagedivision() + params;
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
				messageKey = "C00216.E006";
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
//KSD V001.000 20230810 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 年齢区分アイテム削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsAgeDivisionDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long ageDivisionCode = model.get("ageDivisionCode").hashCode();
			Integer intAgeDivisionCode = Integer.valueOf((int)ageDivisionCode);
			String strAgeDivisionCode = intAgeDivisionCode.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsagedivisionnodeid().replace("{nodeId}", nodeId).replace("{ageDivisionCode}", strAgeDivisionCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsagedivisionnodeid().replace("{nodeId}", nodeId).replace("{ageDivisionCode}", strAgeDivisionCode);
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
				messageKey = "C00216.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00216.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * コンプライアンス情報アイテム取得
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel RestaurantsComplianceGet(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RestaurantsUpdateResponseModel RestaurantsComplianceGet(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
			long storeCode = model.get("storeCode").hashCode();
			Integer intStoreCode = Integer.valueOf((int)storeCode);
			String strStoreCode = intStoreCode.toString();

			// リクエストボディ設定(Object→JSON)
//KSD V001.000 20230901 AS
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
//KSD V001.000 20230901 AE
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantscompliancenodeid().replace("{nodeId}", nodeId).replace("{storeCode}", strStoreCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantscompliancenodeid().replace("{nodeId}", nodeId).replace("{storeCode}", strStoreCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
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

//KSD V001.000 20230901 AS
			case 204:
				// データ無し→正常（初期値をセット）
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				RestaurantsComplianceResponseModel responseInitial = new RestaurantsComplianceResponseModel();
				
				List<LanguageDisplayModel> languageDisplay = new ArrayList<>();
				//条文画像
				for(int i=0; i < 6; i++) {
					LanguageDisplayModel languageDisplay_wk = new LanguageDisplayModel();
					languageDisplay_wk.setLanguage(i+1);
					languageDisplay_wk.setLanguageName("");
					languageDisplay_wk.setProvisionsImageFile01("");
					languageDisplay_wk.setProvisionsImageFile02("");
					languageDisplay_wk.setProvisionsImageFile03("");
					languageDisplay_wk.setProvisionsImageFile04("");
					languageDisplay_wk.setProvisionsImageFile05("");
					languageDisplay_wk.setProvisionsImageFile06("");
					languageDisplay.add(languageDisplay_wk);
				}
				//保護者同伴 利用可能時間
				DurationTimeModel guardianTime = new DurationTimeModel();
				guardianTime.setStart("0000");
				guardianTime.setEnd("0000");
				//18歳未満 利用可能時間
				DurationTimeModel under18Time = new DurationTimeModel();
				under18Time.setStart("0000");
				under18Time.setEnd("0000");
				//16歳未満 利用可能時間
				DurationTimeModel under16Time = new DurationTimeModel();
				under16Time.setStart("0000");
				under16Time.setEnd("0000");
				
				responseInitial.setLanguageDisplay(languageDisplay);
				responseInitial.setGuardianTime(guardianTime);
				responseInitial.setUnder18Time(under18Time);
				responseInitial.setUnder16Time(under16Time);

				// レスポンス変換（JSON -> Javaオブジェクト）
				String json_wk = mapper.writeValueAsString(responseInitial);
				responseModel.setResponseModel(mapper.readValue(json_wk, new TypeReference<Map<String, Object>>() {}));

				return responseModel;
//KSD V001.000 20230901 AE
				
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "C00210.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// リクエストボディ設定
//KSD V001.000 20230901 DS
//			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
//KSD V001.000 20230901 DE
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * コンプライアンス情報アイテム新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel RestaurantsComplianceUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RestaurantsUpdateResponseModel RestaurantsComplianceUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
//			String nodeId = model.get("nodeId").toString();
//			long storeCode = model.get("storeCode").hashCode();
//			Integer intStoreCode = Integer.valueOf((int)storeCode);
//			String strStoreCode = intStoreCode.toString();
			
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantscompliance();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantscompliance();
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
				messageKey = "C00210.E006";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00210.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 券種設定　取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsTicketQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsticketquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsticketquery() + params;
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
				messageKey = "C00222.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 券種設定　新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230810 DS
//	public RestaurantsCommonResponseModel RestaurantsTicketUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
	public RestaurantsUpdateResponseModel RestaurantsTicketUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
//KSD V001.000 20230810 AE
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsticket() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsticket() + params;
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
				messageKey = "C00222.E006";
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
//KSD V001.000 20230810 AE
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E006"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 券種設定 削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsCommonResponseModel RestaurantsTicketDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			String nodeId = model.get("nodeId").toString();
//2023.05.25 ST fuse "code" -> "Code"対応
//			long code = model.get("code").hashCode();
			long code = model.get("Code").hashCode();
//2023.05.25 ED fuse "code" -> "Code"対応
			Integer intCode = Integer.valueOf((int)code);
			String strCode = intCode.toString();

			// リクエストボディ設定(Object→JSON)
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsticketnodeid().replace("{nodeId}", nodeId).replace("{code}", strCode);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsticketnodeid().replace("{nodeId}", nodeId).replace("{code}", strCode);
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
				messageKey = "C00222.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00222.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * フロアマスタ設定　取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsCommonResponseModel RestaurantsFloorQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsfloorquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsfloorquery() + params;
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
				messageKey = "C00001.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * フロアマスタ設定　新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsFloorUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsfloor() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsfloor() + params;
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
				messageKey = "C00001.E006";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * フロアマスタ設定 削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	/**
	 * 会員ランク アイテム削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsFloorDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsfloornodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsfloornodeid().replace("{nodeId}", nodeId).replace("{indexNo}", strIndexNo);
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
				messageKey = "C00001.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00001.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * テーブルマスタ設定　取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsTableQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantstablequery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantstablequery() + params;
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
				messageKey = "C00005.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E002"), -30, e));
		}
		return responseModel;
	}

//KSD V001.000 20230823 AS
	/**
	 * テーブルマスタ設定　取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 説明）RestaurantsTableQuery()との違いは引数(requestBodyModel->model)が異なるだけでその他は同じです
	 */
	public RestaurantsCommonResponseModel RestaurantsTableQuery2(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantstablequery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantstablequery() + params;
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
				messageKey = "C00005.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E002"), -30, e));
		}
		return responseModel;
	}
//KSD V001.000 20230823 AE

	/**
	 * テーブルマスタ設定　新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
//KSD V001.000 20230809 DS
//	public RestaurantsCommonResponseModel RestaurantsTableUpdate(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230809 DE
//KSD V001.000 20230809 AS
	public RestaurantsUpdateResponseModel RestaurantsTableUpdate(
		Map<String, Object> model,
		MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantstable() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantstable() + params;
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
				messageKey = "C00005.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//KSD V001.000 20230809 DS
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230809 DS
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * テーブルマスタ設定　削除(初期値で更新)
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public RestaurantsCommonResponseModel RestaurantsTableUpdateDelete(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantstable() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantstable() + params;
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
				messageKey = "C00005.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//KSD V001.000 20230816 DS
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//			if (responseModel.getResponseModel().size() == 0) {
//				// 該当ユーザなし
//				responseModel.getResult().setCode(2);
//			}
//KSD V001.000 20230816 DE

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00005.E008"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * システム管理固定マスタ設定　取得
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsCommonResponseModel RestaurantsSysteminffixSysQuery(
			PostRestaurantsQueryRequestParamModel requestParamModel, 
			PostRestaurantsQueryRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
//MS定義書変更 2023.04.18 ST
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());
//			var params = "";
//MS定義書変更 2023.04.18 ED

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantssysteminffixsysquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantssysteminffixsysquery() + params;
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
				messageKey = "C00006.E002";
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
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00006.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00006.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00006.E002"), -30, e));
		}
		return responseModel;
	}

	// KSD V001.000 AS
	/**
	 * 指定条件でSCPマスタのデータを取得
	 * @param reqParam リクエストパラメータ
	 * @param requestBody リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public PostRestaurantsMasterFscpDataResponse RestaurantsMcFscp(
		RestaurantsQueryRequestParamModel reqParam, RestaurantsMasterFscpRequest requestBody, 
		MessageSource messageSource, ApiContext apiContext, String accessToken, 
		String ELERAToken, String userId, String passWord){
		
		var responseModel = new PostRestaurantsMasterFscpDataResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		
		// リクエスト作成
		try {
			var params = ApiUtil.createRequestParamWhenGet(reqParam);
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBody);
			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsMcfscpQuery() + params;

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
				messageKey = "F32283.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().equals(null)) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E002"), -30, e));
		}

		return responseModel;
	}
	
	/**
	 * SCPマスタのデータ登録処理
	 * @param requestModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
// KSD V001.000 20230905 DS
//	public PostRestaurantsMasterFscpDataResponse RestaurantsMcFscpUpdate(
// KSD V001.000 20230905 DE
// KSD V001.000 20230905 AS
	public PostRestaurantsMasterFscpDataResponseUpd RestaurantsMcFscpUpdate(
// KSD V001.000 20230905 AE
		RestaurantsMasterFscpRegisterRequestModel requestModel,
		MessageSource messageSource, ApiContext apiContext, String accessToken, 
		String ELERAToken, String userId, String passWord){
			
// KSD V001.000 20230905 DS
//		var responseModel = new PostRestaurantsMasterFscpDataResponse();
// KSD V001.000 20230905 DE
// KSD V001.000 20230905 AS
		var responseModel = new PostRestaurantsMasterFscpDataResponseUpd();
// KSD V001.000 20230905 AE
			
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		
		// リクエスト作成
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestModel.getRequestModel());
			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsMcfscpUpdate();

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
				messageKey = "F32283.E006";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
// KSD V001.000 20230905 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
// KSD V001.000 20230905 DE
// KSD V001.000 20230905 AS
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
// KSD V001.000 20230905 AE
			if (responseModel.getResponseModel().equals(null)) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E006"), -30, e));
		}

		return responseModel;

	}

	/**
	 * 指定条件でSCPマスタのデータを削除します
	 * @param requestModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public DeleteRestaurantResponseModel RestaurantsMcFscpDelete(
		String nodeId, Integer ScpNo, MessageSource messageSource, 
		ApiContext apiContext, String accessToken, 
		String ELERAToken, String userId, String passWord){
			
		var responseModel = new DeleteRestaurantResponseModel();
			
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		
		// リクエスト作成
		try {
			// リクエストボディ設定(Object→JSON)
			// ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// String json = mapper.writeValueAsString(requestModel);
			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsMcfscpDelete().replace("{nodeId}", nodeId).replace("{ScpNo}", ScpNo.toString());

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "", "",
				accessToken, ELERAToken, "", userId, passWord , messageSource);

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
				messageKey = "F32283.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E008"), -30, e));
		}

		return responseModel;

	}

	/**
	 * 指定条件でメニューマスタのデータを取得
	 * @param reqParam リクエストパラメータ
	 * @param requestBody リクエストボディ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public PostRestaurantsSetToolDbSelectResponse RestaurantSetToolDbSelect(
		PostRestaurantsSetToolDbSelectRequest requestModel,
		MessageSource messageSource, ApiContext apiContext, String accessToken, 
		String ELERAToken, String userId, String passWord){
			
		var responseModel = new PostRestaurantsSetToolDbSelectResponse();
			
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		
		// リクエスト作成
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestModel);
			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsSettoolDbselect();

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
				messageKey = "F32283.E004";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
			if (responseModel.getResponseModel().equals(null)) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E004"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E004"), -30, e));
		}

		return responseModel;

	}
	// KSD V001.000 AE

//KSD V001.000 20230921 AS
	/**
	 * メニューマスタ　新規作成／更新
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsUpdateResponseModel RestaurantsMcFumenuUpdate(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsUpdateResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsfumenuquery() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsticket() + params;
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
				messageKey = "F32283.E011";
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
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E010"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E011"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E011"), -30, e));
		}
		return responseModel;
	}
//KSD V001.000 20230921 AE

//KSD V001.000 20231023 AS
	/**
	 * メニューマスタ　削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsDeleteResponseModel RestaurantsMcFumenuDelete(
			String nodeId, String code,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new RestaurantsDeleteResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getRestaurantsfumenudelete().replace("{nodeId}", nodeId).replace("{code}", code.toString());
			
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getRestaurantsfumenudelete().replace("{nodeId}", nodeId).replace("{code}", code.toString());
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
				messageKey = "F32283.E013";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
//			if (responseModel.getResponseModel().size() == 0) {
//				// 該当ユーザなし
//				responseModel.getResult().setCode(2);
//			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E012"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E013"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32283.E013"), -30, e));
		}
		return responseModel;
	}
//KSD V001.000 20231023 AE

}
