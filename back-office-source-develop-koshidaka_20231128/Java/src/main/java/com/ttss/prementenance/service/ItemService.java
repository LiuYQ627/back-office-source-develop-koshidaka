package com.ttss.prementenance.service;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.request.DeleteImageFileRequest;
import com.ttss.prementenance.request.ItemImageFileRequest;
import com.ttss.prementenance.request.ItemKeywordRequest;
import com.ttss.prementenance.response.ItemImageAddAndDeleteResponse;
import com.ttss.prementenance.response.ItemImageFileResponse;
import com.ttss.prementenance.response.ItemKeywordResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

@Service
public class ItemService {

	@Autowired
	public ItemService() {}
	
	@Autowired
	public HttpSession session;
	
	public ItemKeywordResponse searchKeyword(
			ItemKeywordRequest requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new ItemKeywordResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
//			var params = ApiUtil.createRequestParamWhenGet(requestParamModel);
			var params = "";
            var nodeId = requestParamModel.getCompanyCode() + requestParamModel.getStoreCode();
			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getCatalogs()+ "/node/"
					+ nodeId + "/items/query?queryMode=ALL&queryLimit=" + requestParamModel.getLimit();
			//String json = "{\"displayName\": { \"default\" :\"/商品/\" }}";
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
    			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
    			List<Map<String, Object>> items = mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>(){});
    			
    			responseModel.setItems(items);
//    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F00002.E001"), -30, e));
		}
		
		return responseModel;
	}
	
	public ItemImageFileResponse searchImages(
			ItemImageFileRequest requestParamModel,
            MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {

		var responseModel = new ItemImageFileResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
//			var params = ApiUtil.createRequestParamWhenGet(requestParamModel);
			var params = "";
			
			var url = apiContext.getWso2CommonUrl() +
					"presets/images/" +
					requestParamModel.getCompanyCode() +
					"?standardStoreCode=" + requestParamModel.getStoreCode() +
					"&planningCode=" + requestParamModel.getPlanningCode(); 

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
    			List<Map<String, Object>> images = mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>(){});
    			responseModel.setImages(images);
//    			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), PlanningModel.class));
            }
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
                    messageResourseUtil.getMessage("F00002.E001"), -30, e));
		}
		
		return responseModel;
	}


	public ItemImageAddAndDeleteResponse addImage(
			MultipartFile file,String companyCode,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord){

		var responseModel = new ItemImageAddAndDeleteResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var url = apiContext.getWso2CommonUrl() +
					"presets/images/" +
					companyCode +
					"?filename=" + file.getOriginalFilename().substring(0,file.getOriginalFilename().lastIndexOf("."));

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMsForFileUpload(url, HttpMethod.POST, companyCode,
					file.getOriginalFilename(),file, accessToken, ELERAToken);
			Object[] args = null;
			if (200 == response.statusCode()) {
				// 正常
				responseModel.getResult().setCode(0);
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				Map<String, Object> images = mapper.readValue(response.body(), new TypeReference<Map<String, Object>>(){});
				responseModel.setImages(images);
			}else {
				responseModel.getResult().setCode(response.statusCode());
				String messageKey = "F00002.E001";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}

		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00002.E001"), -30, e));
		}

		return responseModel;
	}


	public ItemImageAddAndDeleteResponse deleteImage(
			DeleteImageFileRequest requestParamModel,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord) {

		var responseModel = new ItemImageAddAndDeleteResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
//			var params = ApiUtil.createRequestParamWhenGet(requestParamModel);
			// KSD V001.000 DS issue #1373 対応
			// var params = "?filename=" + requestParamModel.getFileName();
			// KSD V001.000 DE issue #1373 対応
			
			// KSD V001.000 AS issue #1373 対応
			var params = "?filename=" + requestParamModel.getFileName() + "&filetype=" + requestParamModel.getFileType();
			// KSD V001.000 AE issue #1373 対応

			var url = apiContext.getWso2CommonUrl() +
					"presets/images/" +
					requestParamModel.getCompanyCode();

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.DELETE, "",
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
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				Map<String, Object> images = mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>(){});
				responseModel.setImages(images);
			}
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(
					messageResourseUtil.getMessage("F00002.E001"), -30, e));
		}

		return responseModel;
	}


	/**
	 * 部門の一覧取得API実行.
	 *
	 * @param requestParamModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param requestHeaderParam リクエストヘッダーパラメータモデル
	 * @param sessionId セッションID
	 * @param sessionUtil セッション操作の共通クラス
	 * @return 部門の一覧取得API応答＋エラーメッセージ
	 */
//	public GetDepartmentsResponseModel getDepartments(GetDepartmentsRequestModel requestParamModel,
//													  MessageSource messageSource, ApiContext apiContext,
//													  RequestHeaderParamModel requestHeaderParam, String sessionId, SessionUtil sessionUtil) {
//
//		var responseModel = new GetDepartmentsResponseModel();
//		var messageResourseUtil = new MessageSourceUtil(messageSource);
//
//		// プリセット情報取得をリクエスト
//		try {
//
//			// リクエストパラメータ設定(Object→文字列)
//			var params = ApiUtil.createRequestParamWhenGet(requestParamModel);
//
//			// URLの生成
//			var url = apiContext.getWso2CommonUrl() + apiContext.getDepartmentsManagement();
//
//			// リクエストを送信して応答を取得
//			var model = new SendMsRequestModel(url, HttpMethod.GET, params, params, requestHeaderParam,
//					sessionId, sessionUtil);
//			HttpResponse<String> response = ApiUtil.sendMs(model);
//
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			ObjectMapper mapper = new ObjectMapper();
//			responseModel = mapper.readValue(response.body(), GetDepartmentsResponseModel.class);
//
//			// 応答コードの確認
//			var code = responseModel.getResult().getCode();
//			if (code != 0 || responseModel.getDepartments().isEmpty()) {
//				// 応答コード0以外 もしくは 部門情報が0件の場合はエラー
//				var messageKey = "";
//				switch (code) {
//					case 1:
//					case -1:
//					case 2:
//						messageKey = "F00002.E004";
//						break;
//					default:
//						messageKey = "F00002.E004";
//						break;
//				}
//
//				// エラーメッセージをセット
//				responseModel.getResult().setErrorMessageMap(
//						messageResourseUtil.createGlobalErrorMessageMap(messageKey, url, response.body()));
//			}
//		} catch (ConnectException e) {
//			// 通信に失敗時
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00002.E003"), -10, e));
//		} catch (JsonProcessingException e) {
//			// JSON変換エラー
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00002.E004"), -20, e));
//		} catch (Exception e) {
//			// 上記以外
//			responseModel.setResult(ApiUtil
//					.createExceptionResponseModel(messageResourseUtil.getMessage("F00002.E004"), -30, e));
//		}
//		return responseModel;
//	}
}