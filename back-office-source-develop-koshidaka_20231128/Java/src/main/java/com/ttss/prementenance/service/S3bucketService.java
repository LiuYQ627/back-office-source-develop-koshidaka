package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.S3FileGetResuponceModel;
import com.ttss.prementenance.model.S3bucketCommonResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* S3bucket サービス
*
* @author 
* @version 1.0.0
*/
@Service
public class S3bucketService {

	/**
	 * S3ファイル取得
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 */
	public S3bucketCommonResponseModel S3bucketGetFile(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new S3bucketCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getS3bucketgetfile() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getS3bucketgetfile() + params;
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
				messageKey = "C00215.E012";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
			if (responseModel.getResponseModel().size() == 0) {
				// 該当データなし
// KSD V001.000 20230904 DS
//				responseModel.getResult().setCode(2);
// KSD V001.000 20230904 DE
// KSD V001.000 20230904 AS
				responseModel.getResult().setCode(0);
				//レスポンス作成（初期値）
				List<S3FileGetResuponceModel> responseInitial = new ArrayList<>();
				S3FileGetResuponceModel responseModel_wk = new S3FileGetResuponceModel();
				responseModel_wk.setExists(1);
				responseModel_wk.setFileName("");
				responseModel_wk.setSignedUrl("");
				responseModel_wk.setHash("");
				responseInitial.add(responseModel_wk);
				// レスポンス変換（JSON -> Javaオブジェクト）
				String json_wk = mapper.writeValueAsString(responseInitial);
				responseModel.setResponseModel(mapper.readValue(json_wk, new TypeReference<List<Map<String, Object>>>() {}));
// KSD V001.000 20230904 AE
			}

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E011"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E012"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E012"), -30, e));
		}
		return responseModel;
	}
	/**
	 * S3ファイル登録
	 * @param multipartFileアップロードファイル
	 * @param request HttpServletのリクエスト
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public S3bucketCommonResponseModel S3bucketCaptureFile(
			Map<String, String> model,
			HttpServletRequest request,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new S3bucketCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getS3bucketcapturefile() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getS3bucketcapturefile() + params;
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
// KSD V001.000 20230822 DS
//				messageKey = "C00215.E018";
// KSD V001.000 20230822 DE
// KSD V001.000 20230822 AS
				messageKey = "C00215.E016";
// KSD V001.000 20230822 AE
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
// KSD V001.000 20230822 DS
//			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<List<Map<String, Object>>>() {}));
//			if (responseModel.getResponseModel().size() == 0) {
//				// 該当ユーザなし
//				responseModel.getResult().setCode(2);
//			}
// KSD V001.000 20230822 DS

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E015"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E016"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E016"), -30, e));
		}
		return responseModel;
	}
	/**
	 * S3ファイル削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public S3bucketCommonResponseModel S3bucketDeleteFile(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new S3bucketCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getS3bucketdeletefile() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getS3bucketdeletefile() + params;
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
				messageKey = "C00215.E018";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E017"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E018"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E018"), -30, e));
		}
		return responseModel;
	}
	/**
	 * S3フォルダ作成
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public S3bucketCommonResponseModel S3bucketCreateFolder(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new S3bucketCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getS3bucketcreatefolder() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getS3bucketcreatefolder() + params;
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
				messageKey = "C00215.E021";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E020"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E021"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E021"), -30, e));
		}
		return responseModel;
	}
	/**
	 * S3フォルダ削除
	 * @param model リクエストパラメータ
	 * @param messageSource メッセージソース
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public S3bucketCommonResponseModel S3bucketDeleteFolder(
			Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new S3bucketCommonResponseModel();
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
			url = apiContext.getWso2CommonUrl() + apiContext.getS3bucketdeletefolder() + params;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getS3bucketdeletefolder() + params;
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
				messageKey = "C00215.E023";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E022"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E023"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("C00215.E023"), -30, e));
		}
		return responseModel;
	}

}
