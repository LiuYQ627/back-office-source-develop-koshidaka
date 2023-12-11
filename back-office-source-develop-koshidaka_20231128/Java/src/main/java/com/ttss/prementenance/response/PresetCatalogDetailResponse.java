package com.ttss.prementenance.response;

import com.ttss.prementenance.data.PlanningModel;
import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

@Data
public class PresetCatalogDetailResponse {
	public PresetCatalogDetailResponse() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	/**
	 * 実行結果ゲッター
	 *
	 * @return 実行結果
	 */
	public ApiCommonResponseModel getResult() {
		return result;
	}
	/**
	 * 実行結果セッター
	 *
	 * @param result 実行結果
	 */
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}
	
	private PlanningModel responseModel;
	public PlanningModel getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(PlanningModel responseModel) {
		this.responseModel = responseModel;
	}
}
