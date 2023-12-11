package com.ttss.prementenance.response;

import java.util.List;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

public class ReceiptListResponse {
	public ReceiptListResponse() {}

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
	
	private List<Map<String, Object>> responseModel;
	public List<Map<String, Object>> getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(List<Map<String, Object>> responseModel) {
		this.responseModel = responseModel;
	}
}
