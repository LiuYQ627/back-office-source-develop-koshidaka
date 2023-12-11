package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.GetReservationDateQueryRequestParamModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.RentalsUpdateResponseModel;
import com.ttss.prementenance.model.ReservationDateModel;
import com.ttss.prementenance.model.ReservationDateResponseModel;
import com.ttss.prementenance.model.RestaurantsCommonResponseModel;
import com.ttss.prementenance.model.TaxSetsModel;
import com.ttss.prementenance.request.TaxSetsNewRequest;
import com.ttss.prementenance.request.TaxSetsRequest;
import com.ttss.prementenance.request.TaxSetsUpdateRequest;
import com.ttss.prementenance.response.TaxSetsResponse;
import com.ttss.prementenance.response.TaxSetsUpdateResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
 * 税率設定情報API.
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.
 */
@Service
public class TaxService {

	@Autowired
	public HttpSession session;

	public TaxService() {
	}

// KSD V001.000 DS 「デフォルト税区分取得API」と「税区分追加API」を分けた
//	@Value("${api.tax_taxes}")
//	private String taxTaxes;
// KSD V001.000 DE 「デフォルト税区分取得API」と「税区分追加API」を分けた
// KSD V001.000 AS 「デフォルト税区分取得API」と「税区分追加API」を分けた
	@Value("${api.tax_taxes_query}")
	private String taxTaxesQuery;
	@Value("${api.tax_taxes_update}")
	private String taxTaxesUpdate;
// KSD V001.000 AE 「デフォルト税区分取得API」と「税区分追加API」を分けた
	@Value("${api.tax_rates_reservations_list}")
	private String taxRatesreservationsList;
	@Value("${api.tax_rates_reservations_del}")
	private String taxRatesreservationsDel;
	@Value("${api.tax_rates_reservations}")
	private String taxRatesreservations;
	@Value("${api.tax_rates_reservations_reflect}")
	private String taxRatesreservationsReflect;
	@Value("${api.tax_sets}")
	private String taxSets;

	/**
	 * 税率設定リクエストAPIの実行
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken	エレラトークン
	 * @param userId	ユーザーID
	 * @param passWord	パスワード
	 * @return 税セット要求の実行
	 */
	public TaxSetsResponse getTaxTaxes(TaxSetsRequest requestParamModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new TaxSetsResponse();
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			var params = "";
			// KSD V001.000 DS 「デフォルト税区分取得API」と「税区分追加API」を分けた
			//var url = apiContext.getWso2CommonUrl() + taxTaxes.replace("{nodeId}", requestParamModel.getNodeId());
			// KSD V001.000 DS 「デフォルト税区分取得API」と「税区分追加API」を分けた
			// KSD V001.000 AS 「デフォルト税区分取得API」と「税区分追加API」を分けた
			var url = apiContext.getWso2CommonUrl() + taxTaxesQuery.replace("{nodeId}", requestParamModel.getNodeId());
			// KSD V001.000 AE 「デフォルト税区分取得API」と「税区分追加API」を分けた
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//				url = "http://localhost:8082/" + taxTaxesQuery.replace("{nodeId}", requestParamModel.getNodeId());
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "",
	                params, accessToken, ELERAToken, params, userId, passWord, messageSource);
			
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
					// 正常
					responseModel.getResult().setCode(2);
					// WSO2のトークン格納
					responseModel.getResult().setWSO2Token(response.getWSO2Token());
					// ELERAのトークン格納
					responseModel.getResult().setELERAToken(response.getELERAToken());
					return responseModel;
				default:
					responseModel.getResult().setCode(response.getResponse().statusCode());
					messageKey = "F322b4.E015";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
					return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
// KSD V001.000 DS
//			if(response.getResponse().body().length() == 0) {
//				responseModel.getResult().setCode(2);
//				return responseModel;
//			}
// KSD V001.000 DE
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<TaxSetsModel>>(){}));
// KSD V001.000 AS
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}
// KSD V001.000 AE

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E014"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E015"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E015"), -30, e));
		}

		return responseModel;
	}

	/**
	 * 税セット更新APIの実行
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken	エレラトークン
	 * @param userId	ユーザーID
	 * @param passWord	パスワード
	 * @return 税セット更新APIの実行
	 */
	public TaxSetsUpdateResponse updateTaxTaxes(TaxSetsUpdateRequest requestBodyModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new TaxSetsUpdateResponse();
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			var nodeId = requestBodyModel.getNodeId();
			requestBodyModel.setNodeId(null);
			requestBodyModel.setVersion(null);
			String params = mapper.writeValueAsString(requestBodyModel);
			// KSD V001.000 DS 「デフォルト税区分取得API」と「税区分追加API」を分けた
			//var url = apiContext.getWso2CommonUrl() + taxTaxes.replace("{nodeId}", nodeId);
			// KSD V001.000 DE 「デフォルト税区分取得API」と「税区分追加API」を分けた
			// KSD V001.000 AS 「デフォルト税区分取得API」と「税区分追加API」を分けた
			var url = apiContext.getWso2CommonUrl() + taxTaxesUpdate.replace("{nodeId}", nodeId);
			// KSD V001.000 AE 「デフォルト税区分取得API」と「税区分追加API」を分けた
			
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
	                params, accessToken, ELERAToken, params, userId, passWord, messageSource);
			
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
					messageKey = "F322b4.E017";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
					return responseModel;
			}
			responseModel.setResponseModel(null);
		
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E016"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -30, e));
		}
		
		return responseModel;
	}

	/**
	 * 税セット新規作成APIの実行
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken	エレラトークン
	 * @param userId	ユーザーID
	 * @param passWord	パスワード
	 * @return 税セット更新APIの実行
	 */
	public TaxSetsUpdateResponse newTaxSets(TaxSetsNewRequest requestBodyModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new TaxSetsUpdateResponse();
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String params = mapper.writeValueAsString(requestBodyModel);
			var url = apiContext.getWso2CommonUrl() + taxSets;
			
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
	                params, accessToken, ELERAToken, params, userId, passWord, messageSource);
			
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
					messageKey = "F322b4.E017";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
					return responseModel;
			}
			responseModel.setResponseModel(null);
		
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E016"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 税率設定更新（設定変更の即時反映）
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken	エレラトークン
	 * @param userId	ユーザーID
	 * @param passWord	パスワード
	 * @return 税セット更新APIの実行
	 */
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel updateTaxTaxes2(
//			Map<String, Object> model,
//			MessageSource messageSource, ApiContext apiContext, String accessToken,
//            String ELERAToken, String userId, String passWord) {
//		
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel updateTaxTaxes2(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(model);
			var url = apiContext.getWso2CommonUrl() + taxRatesreservations;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//				url = "http://localhost:8082/" + taxRatesreservations;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			
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
					messageKey = "F322b4.E017";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
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
		
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E016"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 税率設定更新（設定変更の即時反映）
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken	エレラトークン
	 * @param userId	ユーザーID
	 * @param passWord	パスワード
	 * @return 税セット更新APIの実行
	 */
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel updateTaxTaxesReflect(
//			String reservationsid,
//			MessageSource messageSource, ApiContext apiContext, String accessToken,
//            String ELERAToken, String userId, String passWord) {
//		
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel updateTaxTaxesReflect(
			String reservationsid,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			var url = apiContext.getWso2CommonUrl() + taxRatesreservationsReflect.replace("{reservationsid}", reservationsid);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//				url = "http://localhost:8082/" + taxRatesreservationsReflect.replace("{reservationsid}", reservationsid);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			
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
					messageKey = "F322b4.E017";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
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
		
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E016"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F322b4.E017"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 変更基準日一覧取得
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public ReservationDateResponseModel getTaxRateReservationList(
			GetReservationDateQueryRequestParamModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new ReservationDateResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			// 「nodeId=&executionDate=&excludeFields=true」と「nodeId=&excludeFields=true」は同じ
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			var url = apiContext.getWso2CommonUrl() + taxRatesreservationsList + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + taxRatesreservationsList + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
			case 204:
				// 正常
				// 204=データ無し
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
//KSD V001.000 20230816 AS
				if( response.getResponse().statusCode() == 204 ){
					responseModel.getResult().setCode(2);
					return responseModel;
				}
//KSD V001.000 20230816 AE
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F322b4.E002";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<ReservationDateModel>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当ユーザなし
				responseModel.getResult().setCode(2);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E002"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 変更基準日の取得
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
//KSD V001.000 20230816 DS
//	public RestaurantsCommonResponseModel getTaxRateReservation(
//			String id,
//			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
//			String passWord) {
//
//		var responseModel = new RestaurantsCommonResponseModel();
//KSD V001.000 20230816 DE
//KSD V001.000 20230816 AS
	public RentalsUpdateResponseModel getTaxRateReservation(
			String id,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new RentalsUpdateResponseModel();
//KSD V001.000 20230816 AE
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";
			var url = apiContext.getWso2CommonUrl() + taxRatesreservationsDel.replace("{id}", id);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + taxRatesreservationsDel.replace("{id}", id);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

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
				messageKey = "F322b4.E004";
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

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E004"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E004"), -30, e));
		}
		return responseModel;
	}
	/**
	 * 変更基準日の削除
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public RestaurantsCommonResponseModel delTaxRateReservation(
			String id,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new RestaurantsCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
//KSD V001.000 20230816 DS
//			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
//KSD V001.000 20230816 DE
			String json = "";
			var url = apiContext.getWso2CommonUrl() + taxRatesreservationsDel.replace("{id}", id);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + taxRatesreservationsDel.replace("{id}", id);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

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
				messageKey = "F322b4.E010";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
//KSD V001.000 20230816 DS
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//KSD V001.000 20230816 DE
			
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E009"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E010"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F322b4.E010"), -30, e));
		}
		return responseModel;
	}

}

