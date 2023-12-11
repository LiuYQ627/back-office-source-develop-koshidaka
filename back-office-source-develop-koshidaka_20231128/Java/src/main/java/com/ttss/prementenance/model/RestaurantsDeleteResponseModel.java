//KSD V001.000 20230928 AS
package com.ttss.prementenance.model;

import java.util.Map;

import lombok.Data;

/**
 * コシダカ　Restaurants共通レスポンスモデル.
 * 応答:"jsonBody": [{..},{..}]の形
 */
@Data
public class RestaurantsDeleteResponseModel {
	public RestaurantsDeleteResponseModel() {}

	//共通レスポンスモデル.
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	public ApiCommonResponseModel getResult() {
		return result;
	}
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}
	
	//コシダカ　共通レスポンスモデル
	private Map<String, Object> responseModel;
	public Map<String, Object> getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(Map<String, Object> responseModel) {
		this.responseModel = responseModel;
	}
}
//KSD V001.000 20230928 AE

