// KSD V001.000 20231027 AS
package com.ttss.prementenance.service;

import java.net.ConnectException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.request.FailureReasonRequest;
import com.ttss.prementenance.response.FailureReasonResponse;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
 * 故障理由
 *
 * @author 
 * @version 1.0.
 */
@Service
public class FailureReasonService {

	@Autowired
	public HttpSession session;

	public FailureReasonService() {
	}

	@Value("${api.failure_reason_update}")
	private String failureReasonUpdate;

	/**
	 * 故障理由更新API
	 *
	 * @param FailureReasonRequest リクエストモデル
	 * @return 更新APIの実行結果
	 */
	public FailureReasonResponse updateFailureReason(FailureReasonRequest requestBodyModel, 
			MessageSource messageSource, ApiContext apiContext, String accessToken,
            String ELERAToken, String userId, String passWord) {
		
		var responseModel = new FailureReasonResponse();
		var messageResourceUtil = new MessageSourceUtil(messageSource);
		
		try {	
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
			String params = mapper.writeValueAsString(requestBodyModel);
			
			var url = apiContext.getWso2CommonUrl() + failureReasonUpdate;
			
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
				default:
					responseModel.getResult().setCode(response.getResponse().statusCode());
					messageKey = "F00004.E004";
					responseModel.getResult()
						.setErrorMessageMap(messageResourceUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
					return responseModel;
			}
			responseModel.setResponseModel(null);
		
		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F00004.E003"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F00004.E004"), -20, e));
		} catch (Exception e) {
			responseModel.setResult(ApiUtil
				.createExceptionResponseModel(messageResourceUtil.getMessage("F00004.E004"), -30, e));
		}
		return responseModel;
	}
}
// KSD V001.000 20231027 AE

