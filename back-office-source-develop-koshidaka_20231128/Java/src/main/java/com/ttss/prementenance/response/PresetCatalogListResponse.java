package com.ttss.prementenance.response;

import java.util.List;

import com.ttss.prementenance.data.PlanningModel;
import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

@Data
public class PresetCatalogListResponse {
	public PresetCatalogListResponse() {}

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
	
	private List<PlanningModel>responseModel;
	public List<PlanningModel> getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(List<PlanningModel> responseModel) {
		this.responseModel = responseModel;
	}
}

