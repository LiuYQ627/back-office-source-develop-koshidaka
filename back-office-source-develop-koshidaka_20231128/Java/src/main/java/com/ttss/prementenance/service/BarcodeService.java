package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.data.BarcodeAnalysisModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.request.BarcodeAnalysisRequest;
import com.ttss.prementenance.response.BarcodeAnalysisResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

@Service
public class BarcodeService {

	@Autowired
	public BarcodeService() {}

	@Autowired
	public HttpSession session;

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
	public BarcodeAnalysisResponse barcodeAnalysis(
			BarcodeAnalysisRequest requestModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new BarcodeAnalysisResponse();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// カタログアイテム登録をリクエスト
		try {
			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
//			String json = mapper.writeValueAsString(requestModel.getParameter());
//			var params = ApiUtil.createRequestParamWhenGet(requestModel.getParameter().toString());
			var params = requestModel.getParameter().toString();
			
			// URLの生成
			var url = apiContext.getWso2CommonUrl() + "barcode-analysis/analyze";

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", params,
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
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00108.E026";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			// レスポンス変換（JSON -> Javaオブジェクト）
			
			JSONObject resBody = new JSONObject(response.getResponse().body());
			JSONObject resultBody = resBody.getJSONObject("result");
			
			if (resultBody.getString("code").equals("SUCCESS")) {
				responseModel.getResult().setCode(0);
			} else {
				responseModel.getResult().setCode(-100);
			}
			responseModel.setAnalysisList(mapper.readValue(resBody.get("AnalysisList").toString(), new TypeReference<List<BarcodeAnalysisModel>>(){}));

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

}
