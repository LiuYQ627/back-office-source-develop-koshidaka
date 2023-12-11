package com.ttss.prementenance.model;

import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * コシダカ　S3bucket共通レスポンスモデル.
 * 応答:"jsonBody": [{..},{..}]の形
 */
@Data
public class S3bucketCommonResponseModel {
	public S3bucketCommonResponseModel() {}

	//共通レスポンスモデル.
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	public ApiCommonResponseModel getResult() {
		return result;
	}
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}
	
	//コシダカ　共通レスポンスモデル
	private List<Map<String, Object>> responseModel;
	public List<Map<String, Object>> getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(List<Map<String, Object>> responseModel) {
		this.responseModel = responseModel;
	}
}
