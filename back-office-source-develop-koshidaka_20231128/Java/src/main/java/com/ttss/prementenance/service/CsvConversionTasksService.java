// KSD V001.000 20230907 AS
package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.net.http.HttpResponse;
import java.util.Map;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.CsvConversionCommonResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* CsvConversionTasks サービス
*
* @author 
* @version 1.0.0
*/
@Service
public class CsvConversionTasksService {

	/**
     * CSVファイルのIMPORT taskの新規作成
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public CsvConversionCommonResponseModel CsvConversionEntrySub(
			String json,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new CsvConversionCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			var params = "";

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getCsvconversiontasks() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getCsvconversiontasks() + params;
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
				messageKey = "F32242.E501";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// エラー終了
				responseModel.getResult().setCode(-1);
				messageKey = "F32242.E501";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E500"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E501"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E501"), -30, e));
		}
		return responseModel;
	}
	/**
     * taskの実行開始
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public CsvConversionCommonResponseModel CsvConversionExecuteSub(
			String taskId,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new CsvConversionCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getCsvconversiontaskstaskIdexecute().replace("{taskId}", taskId);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getCsvconversiontaskstaskIdexecute().replace("{taskId}", taskId);
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
				messageKey = "F32242.E505";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// エラー終了
				responseModel.getResult().setCode(-1);
				messageKey = "F32242.E505";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
//			//ステータスチェック
//			//"status"のフィールドが存在しない場合は、例外(-30)になる
//			var status = responseModel.getResponseModel().get("status");
//			if (status.equals("EXECUTING")){
//				// 正常終了
//				responseModel.getResult().setCode(Integer.valueOf(0));
//			} else {
//				// エラー終了
//				messageKey = "C01800.E002";
//				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
//							response.getResponse().body(), args));
//				responseModel.getResult().setCode(Integer.valueOf(-4));
//			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E504"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E505"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E505"), -30, e));
		}
		return responseModel;
	}
	/**
     * task情報の取得
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public CsvConversionCommonResponseModel CsvConversionGetSub(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new CsvConversionCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// リクエスト作成
		try {
			// リクエストパラメータ設定(Object→文字列)
			String taskId = model.get("taskId").toString();

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String json = "";

			// URLの生成
			var url = "";
			url = apiContext.getWso2CommonUrl() + apiContext.getCsvconversiontasksget().replace("{taskId}", taskId);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getCsvconversiontasksget().replace("{taskId}", taskId);
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
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F32242.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// エラー終了
				responseModel.getResult().setCode(-1);
				messageKey = "F32242.E507";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			//ステータスチェック
			//"status"のフィールドが存在しない場合は、例外(-30)になる
			var status = responseModel.getResponseModel().get("status");
			if (status.equals("COMPLETE")){
				// 正常終了
				responseModel.getResult().setCode(Integer.valueOf(0));
			}else if (status.equals("EXECUTING")){
				// 正常終了（実行中）
				responseModel.getResult().setCode(Integer.valueOf(3));
			} else if (status.equals("COMPLETE_WITH_ERROR")){
				// エラー終了（ファイル内容確認のエラーメッセージが応答される。エラーメッセージは無し）
				responseModel.getResult().setCode(Integer.valueOf(-2));
			} else if (status.equals("ERROR")){
				// エラー終了
				messageKey = "F32242.E507";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				responseModel.getResult().setCode(Integer.valueOf(-3));
			} else {
				// エラー終了
				messageKey = "F32242.E507";
				responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				responseModel.getResult().setCode(Integer.valueOf(-4));
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E506"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E507"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E507"), -30, e));
		}
		return responseModel;
	}
	/**
     * ファイル送信
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public CsvConversionCommonResponseModel CsvConversionSendSub(
			MultipartFile file,String taskId,
			MessageSource messageSource, ApiContext apiContext, String accessToken,
			String ELERAToken, String userId, String passWord){

		var responseModel = new CsvConversionCommonResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		try {
			var url = apiContext.getWso2CommonUrl() + "csv-conversion/tasks/" + taskId + "/submit";

			// リクエストを送信して応答を取得
			HttpResponse<String> response = ApiUtil.sendMsForFileUpload(url, HttpMethod.POST, taskId,
					file.getOriginalFilename(), file, accessToken, ELERAToken);
			Object[] args = null;
			if (200 == response.statusCode()) {
				// 正常
				responseModel.getResult().setCode(0);
				ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
				responseModel.setResponseModel(mapper.readValue(response.body(), new TypeReference<Map<String, Object>>() {}));
			}else {
				responseModel.getResult().setCode(response.statusCode());
				String messageKey = "F32242.E502";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.body(), args));
				return responseModel;
			}
		} catch (Exception e) {
			responseModel.setResult(ApiUtil.createExceptionResponseModel(messageResourseUtil.getMessage("F32242.E503"), -30, e));
		}

		return responseModel;
	}

}
//KSD V001.000 20230907 AE
