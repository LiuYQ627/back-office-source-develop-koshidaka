package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.CatalogsCommonModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsItemIdResponseModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsRequestModel;
import com.ttss.prementenance.model.GetCatalogsCatalogNameItemsResponseModel;
import com.ttss.prementenance.model.GetCatalogsGroupsResponseModel;
import com.ttss.prementenance.model.GetCatalogsResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsItemIdRequestModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsItemIdResponseModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsRequestBodyModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsRequestParamModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameItemsResponseModel;
import com.ttss.prementenance.model.PostCatalogsGroupsRequestBodyModel;
import com.ttss.prementenance.model.PostCatalogsGroupsRequestParamModel;
import com.ttss.prementenance.model.PostCatalogsGroupsResponseModel;
import com.ttss.prementenance.model.PostCatalogsRequestModel;
import com.ttss.prementenance.model.PostCatalogsResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
// KSD V001.000 AS
import com.ttss.prementenance.model.GetCatalogsGroupsCatalogNameItemsRequestModel;
import com.ttss.prementenance.model.GetCatalogsGroupsCatalogNameItemsResponseModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameGroupsItemsQueryRequestModel;
import com.ttss.prementenance.model.PostCatalogsCatalogNameGroupsItemsQueryResponseModel;
import com.ttss.prementenance.model.GetCatalogsGroupsHierarchyRequestModel;
import com.ttss.prementenance.model.GetCatalogsGroupsHierarchyResponseModel;
import com.ttss.prementenance.model.GetCatalogsGroupsGroupIdResponseModel;
import com.ttss.prementenance.model.CatalogsCommonProductGroupModel;
import com.ttss.prementenance.model.PostCatalogsGroupsProductGroupResponseModel;
import com.ttss.prementenance.model.PostCatalogsGroupsProductGroupRequestBodyModel;
import com.ttss.prementenance.model.CatalogsGroupsHierarchyResponseModel;
// KSD V001.000 AE

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230220 litie(Neusoft)     G001.00.0  issue課題#1564を対応します.
 */

/**
* カタログ情報操作API.
*
* @author 
* @version 1.0.0
*/
@Service
public class CatalogsService {

	@Autowired
	public CatalogsService() {}

        // KSD V001.000 AS
	private final static String CATALOGS_GROUPS_PATH = "catalogs/{catalogName}/groups/{groupId}";
        // KSD V001.000 AE

	@Autowired
	public HttpSession session;

	// G001.00.0 Update-Start
	/**
	 * カタログ取得.
	 *
	 * @param name カタログ名
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public GetCatalogsResponseModel getCatalogs(
			String name, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetCatalogsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getCatalogs() + "/" + name;

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", json,
					accessToken, ELERAToken, json, userId, passWord , messageSource);
			
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
				messageKey = "F00108.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body() != null && response.getResponse().body().length() > 0) {
				// レスポンス変換（JSON -> Javaオブジェクト）
				responseModel
						.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));
			} else {
				responseModel.setResponseModel(null);
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E002"), -30, e));
		}
		return responseModel;
	}
	// G001.00.0 Update-End

	/**
	 * カタログ更新.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostCatalogsResponseModel postCatalogs(
			PostCatalogsRequestModel requestModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getCatalogs();

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
				messageKey = "F00108.E026";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E025"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E026"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E026"), -30, e));
		}
		return responseModel;
	}

	// G001.00.0 Update-Start
	/**
	 * カタロググループ取得.
	 *
	 * @param name カタログ名
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 */
	public GetCatalogsGroupsResponseModel getCatalogsGroups(
			String name, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetCatalogsGroupsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getCatalogsgroups() + "?catalogName=" + name;

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
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E030";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<CatalogsCommonModel>>() {
					}));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E029"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E030"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E030"), -30, e));
		}
		return responseModel;
	}
	// G001.00.0 Update-End

	/**
	 * カタロググループ更新.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostCatalogsGroupsResponseModel postCatalogsGroups(
			PostCatalogsGroupsRequestParamModel requestParamModel, 
			PostCatalogsGroupsRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsGroupsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogsgroups()
					+ params;

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
				messageKey = "F00108.E028";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E027"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E028"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E028"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * カタログアイテム一覧取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public GetCatalogsCatalogNameItemsResponseModel getCatalogsCatalogNameItems(
			GetCatalogsCatalogNameItemsRequestModel requestParamModel,
			String catalogName, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetCatalogsCatalogNameItemsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogscatalognameitems().replace("{catalogName}", catalogName);

			// リクエストを送信して応答を取得
//			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
//					accessToken, ELERAToken, params);
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
					accessToken, ELERAToken, params, userId, passWord , messageSource);
			
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
				messageKey = "F00108.E002";
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
    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<CatalogsCommonModel>>(){}));
    			if (responseModel.getResponseModel().size() == 0) {
    				// 該当なし
    				responseModel.getResult().setCode(2);
    			}
            
            }

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E002"), -30, e));
		}
		return responseModel;

	}

	/**
	 * カタログアイテム登録.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostCatalogsCatalogNameItemsResponseModel postCatalogsCatalogNameItems(
			PostCatalogsCatalogNameItemsRequestParamModel requestParamModel, 
			PostCatalogsCatalogNameItemsRequestBodyModel requestBodyModel,
			String catalogName, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsCatalogNameItemsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogscatalognameitems().replace("{catalogName}", catalogName)
					+ params;

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
				messageKey = "F00108.E004";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E004"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E004"), -30, e));
		}
		return responseModel;
	}
	
	/**
	 * アイテム情報取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public GetCatalogsCatalogNameItemsItemIdResponseModel getCatalogsCatalogNameItemsItemId(
			GetCatalogsCatalogNameItemsItemIdRequestModel requestParamModel,
			String catalogName, String itemId,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken,String userId, String passWord) {

		var responseModel = new GetCatalogsCatalogNameItemsItemIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogscatalognameitemsitemid()
						.replace("{catalogName}", catalogName)
						.replace("{itemId}", itemId);

			// リクエストを送信して応答を取得
//			HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
//					accessToken, ELERAToken, params);
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
					accessToken, ELERAToken, params, userId, passWord , messageSource);
			
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
				messageKey = "F00108.E006";
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
    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));
            }

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E005"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E006"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E006"), -30, e));
		}
		return responseModel;
	}

	/**
	 * カタログアアイテム追加.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public PostCatalogsCatalogNameItemsItemIdResponseModel postCatalogsCatalogNameItemsItemId(
			PostCatalogsCatalogNameItemsItemIdRequestModel requestParamModel, 
			String catalogName, String itemId,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsCatalogNameItemsItemIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			String json = "";

			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogscatalognameitemsitemid()
						.replace("{catalogName}", catalogName)
						.replace("{itemId}", itemId)
					+ params;

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
				messageKey = "F00108.E008";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E007"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E008"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00108.E008"), -30, e));
		}
		return responseModel;
	}

// KSD V001.000 AS
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
	private Boolean bWireMock = false;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
	/**
	 * 商品構成コード一覧取得.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId ログイン中ユーザーID
	 * @param passWord ログインパスワード
	 * @return API応答＋エラーメッセージ
	 */
	public GetCatalogsGroupsCatalogNameItemsResponseModel getCatalogsGroupsCatalogNameItems(
			GetCatalogsGroupsCatalogNameItemsRequestModel requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetCatalogsGroupsCatalogNameItemsResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 商品構成コード一覧取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogsgroups();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (bWireMock == true) {
url = "http://localhost:8082/" + apiContext.getCatalogsgroups();	// wiremock
}
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
					accessToken, ELERAToken, params, userId, passWord , messageSource);

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
				messageKey = "F00204.E012";
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
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<CatalogsCommonProductGroupModel>>(){}));
				if (responseModel.getResponseModel().size() == 0) {
					// 該当なし
					responseModel.getResult().setCode(2);
				}
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E011"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E012"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E012"), -30, e));
		}
		return responseModel;

	}

	/**
	 * 商品構成コード条件抽出
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param catalogName カタログ名
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId ログイン中ユーザーID
	 * @param passWord ログインパスワード
	 * @return API応答＋エラーメッセージ
	 */
	public PostCatalogsCatalogNameGroupsItemsQueryResponseModel postCatalogsGroupsQueryLimit(
			PostCatalogsCatalogNameGroupsItemsQueryRequestModel requestParamModel,
			String catalogName,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsCatalogNameGroupsItemsQueryResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 商品構成条件抽出をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);

			// URLの生成
			var url = apiContext.getWso2CommonUrl();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (bWireMock == true) {
url = "http://localhost:8082/";	// wiremock
}
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			url += apiContext.getCatalogs() + "/" + catalogName + "/groups/query" +
					"?nodeId=" + requestParamModel.getNodeId() +
					"&queryMode=" + requestParamModel.getQueryMode() +
					"&queryLimit=" + requestParamModel.getQueryLimit();
			String json = requestParamModel.getKeyword();
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
					messageKey = "F00204.E014";
					responseModel.getResult().setErrorMessageMap(
							messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(
					mapper.readValue(response.getResponse().body(), new TypeReference<List<CatalogsCommonProductGroupModel>>(){}));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00204.E013"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00204.E014"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00204.E014"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 商品構成情報取得.
	 *
	 * @param catalogName カタログ名
	 * @param productId 商品構成コード
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId ログイン中ユーザーID
	 * @param passWord ログインパスワード
	 * @return API応答＋エラーメッセージ
	 */
	public GetCatalogsGroupsGroupIdResponseModel getCatalogsGroupsGroupId(
			String catalogName, String productId, String productClassificationNumber,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken,String userId, String passWord) {

		var responseModel = new GetCatalogsGroupsGroupIdResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 商品構成情報取得をリクエスト
		try {
			String json = "";

			// URLの生成
			var url = apiContext.getWso2CommonUrl();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (bWireMock == true) {
url = "http://localhost:8082/";	// wiremock
}
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			var groupName = catalogName.subSequence(0, 15) + productClassificationNumber + productId;
			url += CATALOGS_GROUPS_PATH
					.replace("{catalogName}", catalogName)
					.replace("{groupId}", groupName);
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
			case 204:
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00204.E016";
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
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonProductGroupModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E015"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E016"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E016"), -30, e));
		}
		return responseModel;
	}

	/**
	 * 商品構成のリンク階層取得
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param catalogName カタログ名
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId ログイン中ユーザーID
	 * @param passWord ログインパスワード
	 * @return API応答＋エラーメッセージ
	 */
	public GetCatalogsGroupsHierarchyResponseModel getCatalogsGroupsHierarchy(
			GetCatalogsGroupsHierarchyRequestModel requestParamModel,
			String catalogName,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetCatalogsGroupsHierarchyResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 商品構成のリンク階層取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogs() + "/" + catalogName + "/groups/hierarchy";
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (bWireMock == true) {
url = "http://localhost:8082/"
		+ apiContext.getCatalogs() + "/" + catalogName + "/groups/hierarchy";	// wiremock
}
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
					accessToken, ELERAToken, params, userId, passWord , messageSource);

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
				messageKey = "F00204.E018";
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
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsGroupsHierarchyResponseModel.class));
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E017"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E018"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E018"), -30, e));
		}
		return responseModel;

	}

	/**
	 * 商品構成の更新
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId ログイン中ユーザーID
	 * @param passWord ログインパスワード
	 * @return API応答＋エラーメッセージ
	 */
	public PostCatalogsGroupsProductGroupResponseModel postCatalogsGroupsProductGroup(
			PostCatalogsGroupsRequestParamModel requestParamModel, 
			PostCatalogsGroupsProductGroupRequestBodyModel requestBodyModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostCatalogsGroupsProductGroupResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 商品構成登録をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = mapper.writeValueAsString(requestBodyModel.getRequestModel());

			// URLの生成
			var url = apiContext.getWso2CommonUrl()
					+ apiContext.getCatalogsgroups()
					+ params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
if (bWireMock == true) {
url = "http://localhost:8082/"
		+ apiContext.getCatalogsgroups()
		+ params;	// wiremock
}
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
				messageKey = "F00204.E020";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), CatalogsCommonProductGroupModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E019"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E020"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00204.E020"), -30, e));
		}
		return responseModel;
	}

}
// KSD V001.000 AE
