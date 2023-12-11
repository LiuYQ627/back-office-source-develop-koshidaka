package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;

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
import com.ttss.prementenance.model.ConfigurationCloudposDetailModel;
import com.ttss.prementenance.model.ConfigurationsModel;
import com.ttss.prementenance.model.DeleteConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.DeleteConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.GetConfigurationsMetadataGroupRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.GetItemsResponseModel;
import com.ttss.prementenance.model.GetPaymentDetailModel;
import com.ttss.prementenance.model.GetPaymentResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.ItemsModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.PostConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestBodyModel;
import com.ttss.prementenance.model.PostConfigurationsNodesRequestParamModel;
import com.ttss.prementenance.model.PostConfigurationsNodesResponseModel;
import com.ttss.prementenance.request.PostConfigurationsCommonDisplayRequestModel;
import com.ttss.prementenance.response.PostConfigurationsCommonDisplayResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
 * Configurations情報API.
 *
 * @author
 * @version 1.0.0
 */
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221229  bai.ry(Neusoft)  G001.00.0  issue課題#699を対応します.
 */
@Service
public class ConfigurationsService {

	@Autowired
	public ConfigurationsService() {
	}

	@Autowired
	public HttpSession session;

	// KSD V001.000 AS
	@Value("${api.configurations_nodes}")
	private String config_node;

	@Value("${api.clouldpos}")
	private String CLOUDPOS_node;
	// KSD V001.000  

	/**
	 * ノード設定.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostConfigurationsNodesResponseModel postNodes(
			PostConfigurationsNodesRequestParamModel requestParamModel,
			PostConfigurationsNodesRequestBodyModel requestBodyModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostConfigurationsNodesResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ノード設定をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getConfigurationsNodes() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//				url = "http://localhost:8082/" + apiContext.getConfigurationsNodes() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA deb

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
				messageKey = "F00004.E005";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), ConfigurationsModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ノード取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetConfigurationsNodesListResponseModel getNodesList(
			GetConfigurationsNodesListRequestModel requestParamModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new GetConfigurationsNodesListResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ノード取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getConfigurationsList();

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
				messageKey = "O00001.E020";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(),
					new TypeReference<List<ConfigurationsModel>>() {
					}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当なし
				responseModel.getResult().setCode(2);
			}

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
	 * ストア設定取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetConfigurationsNodesNodeIdResponseModel getNodesNodeId(
			GetConfigurationsNodesNodeIdRequestModel requestParamModel, String nodeId,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new GetConfigurationsNodesNodeIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ストア設定取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getConfigurationsNodes() + "/"
					+ nodeId;

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
				messageKey = "F00004.E002";
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
				responseModel.setResponseModel(
						mapper.readValue(response.getResponse().body(), ConfigurationsModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E002"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 変更計画エントリ作成.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public PostConfigurationsNodesNodeIdResponseModel postNodesNodeId(
			PostConfigurationsNodesRequestParamModel requestParamModel,
			PostConfigurationsNodesNodeIdRequestModel requestBodyModel, String nodeId,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new PostConfigurationsNodesNodeIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 変更計画エントリ作成をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getConfigurationsNodes() + "/"
					+ nodeId + "/" + params;

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
				messageKey = "F00004.E005";
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
				responseModel.setResponseModel(
						mapper.readValue(response.getResponse().body(), ConfigurationsModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 変更計画ノード削除.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public DeleteConfigurationsNodesNodeIdResponseModel deleteNodesNodeId(
			DeleteConfigurationsNodesNodeIdRequestModel requestParamModel, String nodeId,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new DeleteConfigurationsNodesNodeIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 変更計画ノード削除をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getConfigurationsNodes() + "/"
					+ nodeId;

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
				messageKey = "F00004.E008";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), ConfigurationsModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E006"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E008"), -30, e));
		}
		return responseModel;
	}

	/**
	 * ストア設定取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ 2021.12.01
	 */
	public GetPaymentResponseModel getMetadataGroup(
			GetConfigurationsMetadataGroupRequestModel requestParamModel, String group,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord, String nodeId) {

		var responseModel = new GetPaymentResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ストア設定取得をリクエスト
		try {

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getConfigurationsMetadataGroup().replace("{nodeId}", nodeId);

			// リクエストを送信して応答を取得
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
				messageKey = "F00004.E002";
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
				responseModel.setResponseModel(
						mapper.readValue(response.getResponse().body(), GetPaymentDetailModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E002"), -30, e));
		}
		return responseModel;
	}
    // G001.00.0 Add-Start
	/**
	 * queryItemsLimit
	 * @param nodeId
	 * @param messageSource
	 * @param apiContext
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId
	 * @param passWord
	 * @param limit
	 * @return
	 */
	public GetItemsResponseModel queryItemsLimit(String nodeId,
												 MessageSource messageSource, ApiContext apiContext, String accessToken,
												 String ELERAToken, String userId, String passWord, int limit,String searchParams) {

		var responseModel = new GetItemsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 変更計画エントリ作成をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getCatalogs()+ "/node/"
					+ nodeId + "/items/query?queryMode=ALL&queryLimit=" + limit;
			//String json = "{\"displayName\": { \"default\" :\"/商品/\" }}";
			String json = searchParams;
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
					messageKey = "F00004.E005";
					responseModel.getResult().setErrorMessageMap(
							messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<ItemsModel>>(){}));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E005"), -30, e));
		}
		return responseModel;
	}
	// G001.00.0 Add-End
	
	// KSD V001.000 AS
	/**
	 * 最新ニュース、メンテナンスのお知らせ取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param ELERAToken ELERAアクセストークン
	 * @param userId 決め打ちログインユーザー
	 * @param passWord 決め打ちパスワード
	 * @return API応答
	 */
	public PostConfigurationsCommonDisplayResponseModel getCommonDisplay(
			PostConfigurationsCommonDisplayRequestModel requestParamModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord) {

		var responseModel = new PostConfigurationsCommonDisplayResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ノード取得をリクエスト
		try {
			// URLの生成
			//var uri = "/configurations/nodes/CLOUDPOS";
			var url = apiContext.getWso2CommonUrl() + config_node + CLOUDPOS_node;

			// リクエストを送信して応答を取得
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
				messageKey = "O00001.E024";
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
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), ConfigurationCloudposDetailModel.class));
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E023"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E024"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("O00001.E024"), -30, e));
		}
		return responseModel;
	}
	// KSD V001.000 AE
}
