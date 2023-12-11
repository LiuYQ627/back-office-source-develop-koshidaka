package com.ttss.prementenance.service;

import java.net.ConnectException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.EndpointStatusStatusResponseModel;
import com.ttss.prementenance.model.GetEndpointStatusStatusRequestModel;
import com.ttss.prementenance.model.GetEndpointStatusStatusResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* デバイス情報取得API.
*
* @author 
* @version 1.0.0
*/
@Service
public class EndpointStatusService {

	@Autowired
	public EndpointStatusService() {}

	@Autowired
	public HttpSession session;

	/**
	 * エンドポイント状態の照会.
	 *
	 * @param requestParamModel リクエストパラメータ
	 * @param requestBodyModel リクエストボディ
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @return API応答＋エラーメッセージ
	 * 2021.12.01
	 */
	public GetEndpointStatusStatusResponseModel getEndpointStatus(
			GetEndpointStatusStatusRequestModel requestParamModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new GetEndpointStatusStatusResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// デバイス情報取得をリクエスト
		try {
            // リクエストパラメータ設定(Object→文字列)
            var params = ApiUtil.createRequestParamWhenGet(requestParamModel.getRequestModel());

			// URLの生成
			// deviceIdを設定
			var url = apiContext.getWso2CommonUrl() + apiContext.getEndpointstatusstatus();

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
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "F00107.E002";
				responseModel.getResult()
					.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
							response.getResponse().body(), args));
				return responseModel;
			}
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			// レスポンス変換（JSON -> Javaオブジェクト）
			responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), EndpointStatusStatusResponseModel.class));

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E001"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourseUtil.getMessage("F00107.E002"), -30, e));
		}
		return responseModel;
	}

}
