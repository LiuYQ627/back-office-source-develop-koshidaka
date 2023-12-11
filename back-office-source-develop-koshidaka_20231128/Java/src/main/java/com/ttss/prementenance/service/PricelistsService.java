package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.Arrays;
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
import com.ttss.prementenance.model.DeletePricelistsRecordPriceListRecordIdResponseModel;
import com.ttss.prementenance.model.DeletePricelistsRequestModel;
import com.ttss.prementenance.model.DeletePricelistsResponseModel;
import com.ttss.prementenance.model.GetPricelistsItemsRequestModel;
import com.ttss.prementenance.model.GetPricelistsItemsResponseModel;
import com.ttss.prementenance.model.GetPricelistsNodeNodeIdItemsSkuIdRequestModel;
import com.ttss.prementenance.model.GetPricelistsNodeNodeIdItemsSkuIdResponseModel;
import com.ttss.prementenance.model.GetPricelistsPriceListNameItemRequestModel;
import com.ttss.prementenance.model.GetPricelistsPriceListNameItemResponseModel;
import com.ttss.prementenance.model.GetPricelistsRecordPriceListRecordIdResponseModel;
import com.ttss.prementenance.model.GetPricelistsRequestModel;
import com.ttss.prementenance.model.GetPricelistsResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameItemRequestModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameItemResponseModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameRequestModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsPriceListNameResponseModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdRequestBodyModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdRequestParamModel;
import com.ttss.prementenance.model.PostPricelistsRecordPriceListRecordIdResponseModel;
import com.ttss.prementenance.model.PostPricelistsRequestModel;
import com.ttss.prementenance.model.PostPricelistsResponseModel;
import com.ttss.prementenance.model.PricelistsCommonModel;
import com.ttss.prementenance.model.PricelistsRecordCommonModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230220 litie(Neusoft)     G001.00.0  issue課題#1564を対応します.
 */

/**
 * デバイス情報取得API.
 *
 * @author
 * @version 1.0.0
 */
@Service
public class PricelistsService {

	@Autowired
	public PricelistsService() {
	}

	@Autowired
	public HttpSession session;

	/**
	 * pricelist一覧取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsResponseModel getPricelists(GetPricelistsRequestModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelists();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "",
					params, accessToken, ELERAToken, params, userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				break;
			case 204:
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E020";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
						new TypeReference<List<PricelistsCommonModel>>() {
						}));
				if (responseModel.getResponseModel().size() == 0) {
					// 該当なし
					responseModel.getResult().setCode(2);
				}
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E019"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -30, e));
		}
		return responseModel;
	}

	// G001.00.0 Update-Start
	/**
	 * pricelist一覧取得.
	 *
	 * @param name カタログ名
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public GetPricelistsResponseModel getPricelists(String name,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelists() + "/" + name;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "",
					params, accessToken, ELERAToken, params, userId, passWord, messageSource);

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
				messageKey = "F00108.E020";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body() != null && response.getResponse().body().length() > 0) {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				PricelistsCommonModel pricelistsCommonModel = mapper.readValue(response.getResponse().body(),
						PricelistsCommonModel.class);
				responseModel.setResponseModel(new ArrayList<>(Arrays.asList(pricelistsCommonModel)));
			} else {
				responseModel.setResponseModel(new ArrayList<>());
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E019"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -30, e));
		}
		return responseModel;
	}
	// G001.00.0 Update-End

	/**
	 * pricelist追加.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostPricelistsResponseModel postPricelists(PostPricelistsRequestModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new PostPricelistsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist追加をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelists();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
					json, accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00108.E022";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), PricelistsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E021"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E022"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E022"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist更新.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostPricelistsPriceListNameResponseModel postPricelistsPriceListName(
			PostPricelistsPriceListNameRequestParamModel requestParamModel,
			PostPricelistsPriceListNameRequestModel requestBodyModel, String priceListName,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new PostPricelistsPriceListNameResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist追加をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistspricelistname()
					.replace("{priceListName}", priceListName) + params;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
					json, accessToken, ELERAToken, json, userId, passWord, messageSource);

			var messageKey = "";
			Object[] args = null;
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E024";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), PricelistsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E023"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E024"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E024"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist更新取消.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public DeletePricelistsResponseModel deletePricelistsPriceListName(
			DeletePricelistsRequestModel requestParamModel, String priceListName,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new DeletePricelistsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist追加をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistspricelistname()
					.replace("{priceListName}", priceListName);

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE,
					"", params, accessToken, ELERAToken, params, userId, passWord, messageSource);

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
				messageKey = "F00108.E024";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), PricelistsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E023"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E024"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E024"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist商品一覧取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsPriceListNameItemResponseModel getPricelistsPriceListNameItem(
			GetPricelistsPriceListNameItemRequestModel requestParamModel, String priceListName,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsPriceListNameItemResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist商品一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistspricelistnameitems()
					.replace("{priceListName}", priceListName);

			// リクエストを送信して応答を取得
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
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E010";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
						new TypeReference<List<PricelistsRecordCommonModel>>() {
						}));
				if (responseModel.getResponseModel().size() == 0) {
					// 該当なし
					responseModel.getResult().setCode(2);
				}
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E009"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E010"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E010"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist商品追加.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostPricelistsPriceListNameItemResponseModel postPricelistsPriceListNameItem(
			PostPricelistsPriceListNameItemRequestModel requestBodyModel, String priceListName,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new PostPricelistsPriceListNameItemResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist商品追加をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistspricelistnameitems()
					.replace("{priceListName}", priceListName);

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
					json, accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00108.E012";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					PricelistsRecordCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E011"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E012"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E012"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist商品編集
	 *
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostPricelistsPriceListNameItemResponseModel updatePricelistsPriceListNameItem(
			PostPricelistsPriceListNameItemRequestModel requestBodyModel, String priceListName,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new PostPricelistsPriceListNameItemResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist商品追加をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + "pricelists/record/"
					+requestBodyModel.getRequestModel().getId()
					+"?changePlanName=" + requestBodyModel.getRequestModel().getChangePlan().getName();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
					json, accessToken, ELERAToken, json, userId, passWord, messageSource);

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
					messageKey = "F00108.E012";
					responseModel.getResult().setErrorMessageMap(
							messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					PricelistsRecordCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E011"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E012"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E012"), -30, e));
		}
		return responseModel;
	}


	/**
	 * 店舗価格情報取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsNodeNodeIdItemsSkuIdResponseModel getPricelistsNodeNodeIdItemsSkuId(
			GetPricelistsNodeNodeIdItemsSkuIdRequestModel requestParamModel, String nodeId,
			String skuId, MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsNodeNodeIdItemsSkuIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 店舗価格情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistsnodenodeiditemsskuid()
					.replace("{nodeId}", nodeId).replace("{skuId}", skuId);
			//             var url =
			//             apiContext.getWso2CommonUrl() + apiContext.getPricelistsNodePricelistnameSkuid()
			//             .replace("{nodeId}", nodeId) + "%5E" + skuId + "%24";

			// リクエストを送信して応答を取得
			// HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
			// accessToken, ELERAToken, params);
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
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E014";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
						PricelistsRecordCommonModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E013"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 店舗価格情報取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsNodeNodeIdItemsSkuIdResponseModel getPricelistsNodeNodeIdItemsSkuIdList(
			GetPricelistsNodeNodeIdItemsSkuIdRequestModel requestParamModel, String nodeId,
			String skuId, MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsNodeNodeIdItemsSkuIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 店舗価格情報取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistsnodenodeiditemsskuid()
					.replace("{nodeId}", nodeId).replace("{skuId}", skuId);
			//             var url =
			//             apiContext.getWso2CommonUrl() + apiContext.getPricelistsNodePricelistnameSkuid()
			//             .replace("{nodeId}", nodeId) + "%5E" + skuId + "%24";

			// リクエストを送信して応答を取得
			// HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
			// accessToken, ELERAToken, params);
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
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E014";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				// レスポンス変換（JSON -> Javaオブジェクト）
				// 配列で取得
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				//				Collection<PricelistsRecordCommonModel> readValues = new ObjectMapper().readValue(
				//						response.getResponse().body(), new TypeReference<Collection<PricelistsRecordCommonModel>>() {
				//						});
				//				responseModel.setResponseModelList(mapper.readValue(response.getResponse().body(),
				//						new TypeReference<List<PricelistsRecordCommonModel>>() {
				//						}));
				Map<String, Object> map = mapper.readValue(response.getResponse().body(),
						new TypeReference<Map<String, Object>>() {
						});
				if (map.get("startDate") != null) {
					responseModel.getResponseModel().setStartDate(map.get("startDate").toString());
				}
				if (map.get("endDate") != null) {
					responseModel.getResponseModel().setEndDate(map.get("endDate").toString());
				}
				if (map.get("price") != null) {
					responseModel.getResponseModel().setPrice((int) map.get("price"));
				}
				if (map.get("unitPrice") != null) {
					responseModel.getResponseModel().setUnitPrice((int) map.get("unitPrice"));
				}
				if (map.get("manufacturerPrice") != null) {
					responseModel.getResponseModel().setManufacturerPrice((int) map.get("manufacturerPrice"));
				}
				if (map.get("priceChangeType") != null) {
					responseModel.getResponseModel()
							.setPriceChangeType((int) map.get("priceChangeType"));
				}
				if (map.get("pricedownType") != null) {
					responseModel.getResponseModel()
							.setPricedownType((int) map.get("pricedownType"));
				}
				if (map.get("currencyCode") != null) {
					responseModel.getResponseModel().setCurrencyCode(map.get("currencyCode").toString());
				}
				if (map.get("priceList") != null) {
					responseModel.getResponseModel().setPriceList(map.get("priceList").toString());
				}
				if (map.get("id") != null) {
					responseModel.getResponseModel().setId(map.get("id").toString());
				}
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E013"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelistレコード取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsRecordPriceListRecordIdResponseModel getPricelistsRecordPriceListRecordId(
			String pricelistRecordId, MessageSource messageSource, ApiContext apiContext,
			String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetPricelistsRecordPriceListRecordIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelistレコード取得をリクエスト
		try {
			var params = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getPricelistsrecordpricelistrecordid()
							.replace("{pricelistRecordId}", pricelistRecordId);

			// リクエストを送信して応答を取得
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
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E014";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
						PricelistsRecordCommonModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E013"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E014"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelistレコード更新.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostPricelistsRecordPriceListRecordIdResponseModel postPricelistsRecordPriceListRecordId(
			PostPricelistsRecordPriceListRecordIdRequestParamModel requestParamModel,
			PostPricelistsRecordPriceListRecordIdRequestBodyModel requestBodyModel,
			String pricelistRecordId, MessageSource messageSource, ApiContext apiContext,
			String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostPricelistsRecordPriceListRecordIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist商品追加をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getPricelistsrecordpricelistrecordid()
							.replace("{pricelistRecordId}", pricelistRecordId)
					+ params;

			// リクエストを送信して応答を取得
			// HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.POST, "", json,
			// accessToken, ELERAToken, json);
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
					json, accessToken, ELERAToken, json, userId, passWord, messageSource);

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
				messageKey = "F00108.E016";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					PricelistsRecordCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E015"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E016"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E016"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelistレコード更新取消.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public DeletePricelistsRecordPriceListRecordIdResponseModel deletePricelistsRecordPriceListRecordId(
			String pricelistRecordId, MessageSource messageSource, ApiContext apiContext,
			String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new DeletePricelistsRecordPriceListRecordIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelistレコード更新取消をリクエスト
		try {
			String params = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getPricelistsrecordpricelistrecordid()
							.replace("{pricelistRecordId}", pricelistRecordId);

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE,
					"", params, accessToken, ELERAToken, params, userId, passWord, messageSource);

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
				messageKey = "F00108.E018";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					PricelistsRecordCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E017"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E018"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E018"), -30, e));
		}
		return responseModel;
	}

	/**
	 * pricelist商品一覧取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPricelistsItemsResponseModel getPricelistsItems(
			GetPricelistsItemsRequestModel requestParamModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new GetPricelistsItemsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// pricelist商品一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPricelistsitems();

			// リクエストを送信して応答を取得
			// HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
			// accessToken, ELERAToken, params);
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
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E020";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
						new TypeReference<List<PricelistsRecordCommonModel>>() {
						}));
				if (responseModel.getResponseModel().size() == 0) {
					// 該当なし
					responseModel.getResult().setCode(2);
				}
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E019"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00108.E020"), -30, e));
		}
		return responseModel;
	}
}
