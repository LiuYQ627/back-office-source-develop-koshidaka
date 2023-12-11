package com.ttss.prementenance.service;

import java.net.ConnectException;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.DataManagementModel;
import com.ttss.prementenance.model.DeleteDataManagementTableListResponseModel;
import com.ttss.prementenance.model.GetDataManagementTableListRequestModel;
import com.ttss.prementenance.model.GetDataManagementTableListResponseModel;
import com.ttss.prementenance.model.GetDataRetentionSettingsModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostStoreMasterCopyRequestModel;
import com.ttss.prementenance.model.PostStoreMasterCopyResponseModel;
import com.ttss.prementenance.model.UpdateDataRetentionSettingsModel;
import com.ttss.prementenance.request.GetDataRetentionSettingsRequestModel;
import com.ttss.prementenance.request.PostDataRetentionNodeAddRequestModel;
import com.ttss.prementenance.response.DataRetentionSettingsResponseModel;
import com.ttss.prementenance.response.GetDataRetentionSettingsResponseModel;
import com.ttss.prementenance.response.PostDataRetentionNodeAddResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20231121  wupsh(Neusoft)    G001.00.0  issue課題#1877を対応します.
 */
/**
 * ユーザ情報API.
 *
 * @author
 * @version 1.0.
 */
@Service
public class DataManagementService {

    @Autowired
    public DataManagementService() {
    }

    @Autowired
    public HttpSession session;

    // KSD V001.000 AS
    @Value("${api.data_management_data_retention_settings_query}")
    private String dataRetentionSettingsUri;

		@Value("${api.data_management_data_retention_settings_update}")
    private String dataRetentionSettingsUpdateUri;

    @Value("${api.data_managements_copy_store_master}")
    private String copyStoreMasterURI;
    // KSD V001.000 AE

    /**
     * テーブル取得.
     *
     * @param requestParamModel リクエストパラメータ
     * @param requestBodyModel リクエストボディ
     * @param messageSource メッセージソース
     * @param apiContext アプリケーションプロパティ
     * @return API応答＋エラーメッセージ 2022.09.01
     */
	// G001.00.0 Update-Start
	//    public GetDataManagementTableListResponseModel getNodesList(
	//            GetDataManagementTableListRequestModel requestParamModel, MessageSource messageSource,
	//            ApiContext apiContext, String accessToken, String ELERAToken, String userId,
	//            String passWord) {
	public GetDataManagementTableListResponseModel getNodesList(
			GetDataManagementTableListRequestModel requestParamModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord, Integer tableCategory) {
		// G001.00.0 Update-End
		var responseModel = new GetDataManagementTableListResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// ノード取得をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getNodeId());
			// G001.00.0 Update-Start
			//            var url = apiContext.getWso2CommonUrl()
			//                    + apiContext.getTableList().replace("{nodeId}", requestParamModel.getNodeId());
			var url = "";
			if (tableCategory == 0) {
				// マスタ系（type=MASTER）URLの生成
				url = apiContext.getWso2CommonUrl()
						+ apiContext.getTableList().replace("{nodeId}", requestParamModel.getNodeId())
						+ "MASTER";
			} else {
				// 取引系（type=TRANSACTION）URLの生成
				url = apiContext.getWso2CommonUrl()
						+ apiContext.getTableList().replace("{nodeId}", requestParamModel.getNodeId())
						+ "TRANSACTION";
			}
			// G001.00.0 Update-End
            // リクエストを送信して応答を取得
            // HttpResponse<String> response = ApiUtil.sendMs(url, HttpMethod.GET, "", params,
            // accessToken, ELERAToken, params);
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
                    messageKey = "O00001.E020";
                    responseModel.getResult().setErrorMessageMap(
                            messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
                                    response.getResponse().body(), args));
                    return responseModel;
            }
            ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
            // レスポンス変換（JSON -> Javaオブジェクト）
            responseModel.setResponseModel(
                    mapper.readValue(response.getResponse().body(), DataManagementModel.class));
            if (responseModel.getResponseModel() == null) {
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
     * テーブル削除.
     *
     * @param requestParamModel リクエストパラメータ
     * @param requestBodyModel リクエストボディ
     * @param messageSource メッセージソース
     * @param apiContext アプリケーションプロパティ
     * @return API応答＋エラーメッセージ 2022.09.01
     */
	// G001.00.0 Update-Start
	//    public DeleteDataManagementTableListResponseModel deleteNodesList(
	//            GetDataManagementTableListRequestModel requestParamModel, MessageSource messageSource,
	//            ApiContext apiContext, String accessToken, String ELERAToken, String userId,
	//            String passWord) {
	public DeleteDataManagementTableListResponseModel deleteNodesList(
			GetDataManagementTableListRequestModel requestParamModel, MessageSource messageSource,
			ApiContext apiContext, String accessToken, String ELERAToken, String userId,
			String passWord, Integer tableCategory) {
		// G001.00.0 Update-End
		var responseModel = new DeleteDataManagementTableListResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// テーブル削除をリクエスト
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getNodeId());
			// G001.00.0 Update-Start
			//            var url = apiContext.getWso2CommonUrl() + apiContext.getTableListDelete()
			//           .replace("{nodeId}", requestParamModel.getNodeId());
			var url = "";
			if (tableCategory == 0) {
				// マスタ系（type=MASTER）URLの生成
				url = apiContext.getWso2CommonUrl() + apiContext.getTableListDelete()
						.replace("{nodeId}", requestParamModel.getNodeId()) + "MASTER";
			} else {
				// 取引系（type=TRANSACTION）URLの生成
				url = apiContext.getWso2CommonUrl() + apiContext.getTableListDelete()
						.replace("{nodeId}", requestParamModel.getNodeId()) + "TRANSACTION";
			}
			// G001.00.0 Update-End
            // リクエストを送信して応答を取得
            HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE,
                    "", "", accessToken, ELERAToken, "", userId, passWord, messageSource);

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
                    mapper.readValue(response.getResponse().body(), DataManagementModel.class));

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

    // KSD V001.000 AS
    /**
     * データ保持設定情報
     * @param messageSource メッセージソース
     * @param apiContext アプリケーションプロパティ
     * @param accessToken アクセストークン
     * @param ELERAToken トークン
     * @param userId ユーザーID
     * @param passWord パスワード
     * @return データ保持設定情報
     */
    public GetDataRetentionSettingsResponseModel getMaintainData(
            GetDataRetentionSettingsRequestModel model, MessageSource messageSource,
            ApiContext apiContext, String accessToken, String ELERAToken, String userId,
            String passWord) {

        var responseModel = new GetDataRetentionSettingsResponseModel();
        var messageResourseUtil = new MessageSourceUtil(messageSource);
        
        try {

            //var url = "/data-management/maintain";
            var url = apiContext.getWso2CommonUrl() + dataRetentionSettingsUri.replace("{groupName}", model.getGroupName());

            HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, 
            "", "", accessToken, ELERAToken, "", userId, passWord, messageSource);

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
                    return responseModel;
                default:
                    responseModel.getResult().setCode(response.getResponse().statusCode());
                    messageKey = "F32212.E002";
                    responseModel.getResult().setErrorMessageMap(
                            messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
                                    response.getResponse().body(), args));
                    return responseModel;
            }
            
            ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
            // レスポンス変換（JSON -> Javaオブジェクト）
            responseModel.setResponseModel(
                    mapper.readValue(response.getResponse().body(), new TypeReference<GetDataRetentionSettingsModel>(){}));

            if (responseModel.getResponseModel() == null) {
                // 該当なし
                responseModel.getResult().setCode(2);
            }

        } catch (ConnectException e) {
            // 通信に失敗時
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E001"), -10, e));
        } catch (JsonProcessingException e) {
            // JSON変換エラー
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E002"), -20, e));
        } catch (Exception e) {
            // 上記以外
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E002"), -30, e));
        }
        
        return responseModel;
    }

    /**
     * データ保持設定情報更新
     * @param requestBodyModel リクエストボディ
     * @param messageSource メッセージソース
     * @param apiContext アプリケーションプロパティ
     * @param accessToken アクセストークン
     * @param ELERAToken トークン
     * @param userId ユーザーID
     * @param passWord パスワード
     * @return データ保持設定情報
     */
    public DataRetentionSettingsResponseModel updateMaintainData(
        UpdateDataRetentionSettingsModel requestBodyModel, MessageSource messageSource, 
        ApiContext apiContext, String accessToken, String ELERAToken, 
        String userId, String passWord) {

        
        var responseModel = new DataRetentionSettingsResponseModel();
        var messageResourseUtil = new MessageSourceUtil(messageSource);
        
        // デバイス情報更新をリクエスト
        try {
            // リクエストボディ設定(Object→JSON)
            ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
            String groupName = requestBodyModel.getGroupName();
            requestBodyModel.setGroupName(null);
            String json = mapper.writeValueAsString(requestBodyModel);

            // URLの生成
            var url = apiContext.getWso2CommonUrl() + dataRetentionSettingsUpdateUri.replace("{groupName}",groupName);

            // リクエストを送信して応答を取得
            HttpResponseExtentionModel response = ApiUtil.sendMsExtension(
                url, HttpMethod.POST, "", json, accessToken, 
                ELERAToken, json, userId, passWord, messageSource);

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
                    messageKey = "F32212.E003";
                    responseModel.getResult().setErrorMessageMap(
                            messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
                                    response.getResponse().body(), args));
                    return responseModel;
            }

        } catch (ConnectException e) {
            // 通信に失敗時
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E004"), -10, e));
        } catch (JsonProcessingException e) {
            // JSON変換エラー
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E003"), -20, e));
        } catch (Exception e) {
            // 上記以外
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E003"), -30, e));
        }
        
        return responseModel;
    }
    
	/**
	 * 店舗マスタコピー処理
	 * @param requestParamModel リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param accessToken アクセストークン
	 * @param eLERAToken ELERAトークン
	 * @param userId ユーザID
	 * @param passWord パスワード
	 * @return 応答モデル
	 */
	public PostStoreMasterCopyResponseModel copyStoreMaster(
		PostStoreMasterCopyRequestModel requestParamModel, MessageSource messageSource,
		ApiContext apiContext, String accessToken, String eLERAToken,
		String userId, String passWord) {

		var responseModel = new PostStoreMasterCopyResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);
		try {
			var url = apiContext.getWso2CommonUrl() + copyStoreMasterURI;

			var params = new JSONObject(requestParamModel).toString();

			// リクエストを送信して応答を取得

			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
				params, accessToken, eLERAToken, params, userId, passWord, messageSource);

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
//KSD V001.000 20231116 CS
//				messageKey = "F00107.E002";
				messageKey = "F32254.E001";
//KSD V001.000 20231116 CE
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
// KSD V001.000 20231024 DS 応答body無し
//			if (response.getResponse().body().length() == 0) {
//				// データなし
//				responseModel.getResult().setCode(2);
//			}
// KSD V001.000 20231024 DE 応答body無し
		} catch (ConnectException e) {
			// 通信に失敗時
//KSD V001.000 20231116 CS
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F32254.E001"), -10, e));
//KSD V001.000 20231116 CE
		} catch (JsonProcessingException e) {
			// JSON変換エラー
//KSD V001.000 20231116 CS
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F32254.E001"), -20, e));
//KSD V001.000 20231116 CE
		} catch (Exception e) {
//KSD V001.000 20231116 CS
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("F32254.E001"), -30, e));
//KSD V001.000 20231116 CE
		}

		return responseModel;
	}
	// KSD V001.000 AE
	// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
    /**
     * 保持期間外データ情報へNode追加
     * @param groupName グループ名
     * @param requestBodyModel リクエストボディ
     * @param messageSource メッセージソース
     * @param apiContext アプリケーションプロパティ
     * @param accessToken アクセストークン
     * @param ELERAToken トークン
     * @param userId ユーザーID
     * @param passWord パスワード
     * @return Node設定追加結果
     */
    public PostDataRetentionNodeAddResponseModel DataRetentionNodeAdd(
    	String groupName,
		PostDataRetentionNodeAddRequestModel requestBodyModel, MessageSource messageSource, 
        ApiContext apiContext, String accessToken, String ELERAToken, 
        String userId, String passWord) {

        var responseModel = new PostDataRetentionNodeAddResponseModel();
        var messageResourseUtil = new MessageSourceUtil(messageSource);
            
        // 保持期間外データ情報へNode追加をリクエスト
        try {
            // リクエストボディ設定(Object→JSON)
            ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
            String json = mapper.writeValueAsString(requestBodyModel);

            // URLの生成
            // /data-management/data-retention-settings/{groupName}/nodes/add
            var url = apiContext.getWso2CommonUrl() + apiContext.getDataRetentionSettingsNodeAdd().replace("{groupName}", groupName);

            // リクエストを送信して応答を取得
            HttpResponseExtentionModel response = ApiUtil.sendMsExtension(
                url, HttpMethod.POST, "", json, accessToken, 
                ELERAToken, json, userId, passWord, messageSource);

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
                    messageKey = "F32212.E003";
                    responseModel.getResult().setErrorMessageMap(
                            messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
                            response.getResponse().body(), args));
                    return responseModel;
            }

        } catch (ConnectException e) {
            // 通信に失敗時
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E004"), -10, e));
        } catch (JsonProcessingException e) {
            // JSON変換エラー
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E003"), -20, e));
        } catch (Exception e) {
            // 上記以外
            responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F32212.E003"), -30, e));
        }
            
        return responseModel;
    }
	// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
}
