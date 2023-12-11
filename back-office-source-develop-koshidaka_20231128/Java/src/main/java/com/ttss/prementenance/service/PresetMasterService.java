/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221230  tianxh(Neusoft)  G001.00.0  issue課題#1169を対応します.
 * 20230117  litie(Neusoft)   G002.00.0  issue課題#1088を対応します.
 */
package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.data.PlanningModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.request.PresetCatalogDeleteRequest;
import com.ttss.prementenance.request.PresetCatalogDetailRequest;
import com.ttss.prementenance.request.PresetCatalogListRequest;
import com.ttss.prementenance.response.PresetCatalogDetailResponse;
import com.ttss.prementenance.response.PresetCatalogListResponse;
import com.ttss.prementenance.response.PresetCreateFolderResponse;
import com.ttss.prementenance.response.PresetDeleteFolderResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

@Service
public class PresetMasterService {

	@Autowired
	public PresetMasterService() {}
	
	@Autowired
	public HttpSession session;
	
	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private ObjectMapper objectMapper;

	public PresetCatalogDetailResponse getPresetCatalogDetails(
			PresetCatalogDetailRequest requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new PresetCatalogDetailResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel);
			
			var url = apiContext.getWso2CommonUrl() + "presets/catalog/" + requestParamModel.getCompanyCode() + "/" + requestParamModel.getStoreCode() + "/" + requestParamModel.getPlanningCode();

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
			case 400:
				String resStr = response.getResponse().body();
				JSONObject jsonObject = new JSONObject(resStr);
				if ("412".equals(jsonObject.get("status").toString())) {
					responseModel.getResult().setCode(204);
					messageKey = "F00002.E001";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
				} else {
					ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
					// レスポンス変換（JSON -> Javaオブジェクト）
					responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
				}
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00002.E001";
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
    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F00002.E001"), -30, e));
		}
		
		return responseModel;
	}
	
	public PresetCatalogDetailResponse createPresetCatalogDetails(
			Map<String, Object> requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new PresetCatalogDetailResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var url = apiContext.getWso2CommonUrl() + "presets/catalog/";

			var params = new JSONObject(requestParamModel).toString();

            // リクエストを送信して応答を取得
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
			case 204:
				// データ無し
				responseModel.getResult().setCode(2);
				return responseModel;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00002.E001";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			
			if (response.getResponse().body().length() == 0) {
                // データなし
                responseModel.getResult().setCode(2);
            } else {
//    			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
//
//    			// レスポンス変換（JSON -> Javaオブジェクト）
//    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F00002.E011"), -30, e));
		}
		
		return responseModel;
	}
	
	public PresetCatalogDetailResponse deletePreset(
			PresetCatalogDeleteRequest requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new PresetCatalogDetailResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var catalogId = requestParamModel.getPlanningId();
			var url = apiContext.getWso2CommonUrl() + "presets/catalog/" + catalogId;

            // リクエストを送信して応答を取得
            HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "",
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
				messageKey = "F00002.E001";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			
			if (response.getResponse().body().length() == 0) {
                // データなし
                responseModel.getResult().setCode(2);
            } else {
            	// DELETE SUCCESS
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F00002.E011"), -30, e));
		}
		
		return responseModel;
	}
	
	public PresetCatalogListResponse listPresets(
			PresetCatalogListRequest requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new PresetCatalogListResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var corpId = requestParamModel.getCompanyCode();
			var storeId = requestParamModel.getStoreCode();
			// KSD V001.000 DS issue #1373 対応
			//var url = apiContext.getWso2CommonUrl() + "presets/" + corpId + "/" + storeId;
			// KSD V001.000 DE issue #1373 対応
			
			// KSD V001.000 AS issue #1373 対応
			var url = apiContext.getWso2CommonUrl() + "presets/" + corpId + "?storeCode=" + storeId;
			// KSD V001.000 AE issue #1373 対応

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
			case 400:
				String resStr = response.getResponse().body();
				JSONObject jsonObject = new JSONObject(resStr);
				if ("412".equals(jsonObject.get("status").toString())) {
					responseModel.getResult().setCode(204);
					messageKey = "F00002.E001";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
				} else {
					responseModel.getResult().setCode(response.getResponse().statusCode());
					messageKey = "F00002.E001";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
				}
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00002.E001";
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
            	
            	responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<PlanningModel>>(){}));
//            	responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
    			if (responseModel.getResponseModel().size() == 0) {
    				// 該当なし
    				responseModel.getResult().setCode(2);
    			}
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00002.E009"), -30, e));
		}
		
		return responseModel;
	}

	// G002.00.0 Update-Start
	/**
	 * S3バケットに商品プリセット画像を保存する企業フォルダを作成
	 * @param corpId 企業コード
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId
	 * @param password
	 * @return API応答＋エラーメッセージ
	 */
	public PresetCreateFolderResponse createPresetFolder(@NotNull String corpId, String accessToken,
			String ELERAToken, String userId, String password) {

		var responseModel = new PresetCreateFolderResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPresetsFolderPost();
			String businessUnitCd = "";
			String parameterString = "?name=" + corpId;
			String params = "";
			String logParamsIgnored = "";

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url + parameterString, HttpMethod.POST,
					businessUnitCd, params, accessToken, ELERAToken, logParamsIgnored, userId, password, messageSource);

			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				return responseModel;
			case 400:
				var error = objectMapper.readValue(response.getResponse().body(),
						PresetCreateFolderResponse.ErrorResponse.class);
				if (error.isFolderExistsError()) {
					// 正常：存在した
					responseModel.getResult().setCode(0);
					return responseModel;
				}
				break;
			default:
				break;
			}

			// エラー処理
			responseModel.getResult().setCode(response.getResponse().statusCode());
			var messageKey = "";
			Object[] args = null;
			messageKey = "F00002.E011";
			responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
			return responseModel;
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00002.E011"), -30, e));
		}

		return responseModel;
	}
	// G002.00.0 Update-End

	/**
	 * 企業を削除した際に企業ノードの削除に続いて、S3バケットを削除
	 * @param corpId 企業コード
	 * @param accessToken
	 * @param ELERAToken
	 * @param userId
	 * @param password
	 * @return API応答＋エラーメッセージ
	 * @since 2022.12.30
	 * @since [ISSUE 1169]
	 */
    public PresetDeleteFolderResponse deletePresetFolder(@NotNull String corpId, String accessToken,
			String ELERAToken, String userId, String password) {

		var responseModel = new PresetDeleteFolderResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getPresetsFolderDelete();
			String businessUnitCd = "";
			String parameterString = "?name=" + corpId;
			String logParamsIgnored = "";

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, businessUnitCd, parameterString,
					accessToken, ELERAToken, logParamsIgnored, userId, password, messageSource);

			switch (response.getResponse().statusCode()) {
				case 200:
					// 正常
					responseModel.getResult().setCode(0);
					// WSO2のトークン格納
					responseModel.getResult().setWSO2Token(response.getWSO2Token());
					// ELERAのトークン格納
					responseModel.getResult().setELERAToken(response.getELERAToken());
					return responseModel;
				case 400:
					var error = objectMapper.readValue(response.getResponse().body(), PresetDeleteFolderResponse.ErrorResponse.class);
					if (error.isFolderNotExistError()) {
						// 正常：存在しない
						responseModel.getResult().setCode(0);
						return responseModel;
					}
					break;
				default:
		// G001.00.0 Delete-Start
		// 				break;
		// 	}

		// 	// エラー処理
		// 	// TODO messageKey
		// 	responseModel.getResult().setCode(response.getResponse().statusCode());
		// 	var messageKey = "";
		// 	Object[] args = null;
		// 	messageKey = "F00002.E001";
		// 	responseModel.getResult()
		// 			.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
		// 					response.getResponse().body(), args));
		// 	return responseModel;
		// } catch (Exception e) {
		// 	// TODO messageKey
		// 	responseModel.setResult(ApiUtil.createExceptionResponseModel(
		// 			messageResourseUtil.getMessage("F00002.E011"), -30, e));
		// }
		// G001.00.0 Delete-End
		// G001.00.0 Add-Start
					// エラー処理
					responseModel.getResult().setCode(response.getResponse().statusCode());
					var messageKey = "";
					Object[] args = null;
					messageKey = "F00004.E045";
					responseModel.getResult()
							.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
									response.getResponse().body(), args));
					return responseModel;
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E044"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E045"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00004.E045"), -30, e));
		}
		// G001.00.0 Add-End

		return responseModel;
	}
}
