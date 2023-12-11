package com.ttss.prementenance.response;

import java.util.List;
import java.util.Map;

import com.ttss.prementenance.data.BarcodeAnalysisModel;
import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

@Data
public class BarcodeAnalysisResponse {
	public BarcodeAnalysisResponse() {}

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
	
	private List<BarcodeAnalysisModel> analysisList;

	private Map<String,Object> product;
	public List<BarcodeAnalysisModel> getAnalysisList() {
		return analysisList;
	}
	public void setAnalysisList(List<BarcodeAnalysisModel> analysisList) {
		this.analysisList = analysisList;
	}
}
