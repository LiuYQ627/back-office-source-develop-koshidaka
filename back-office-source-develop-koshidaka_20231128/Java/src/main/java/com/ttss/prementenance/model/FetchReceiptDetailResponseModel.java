package com.ttss.prementenance.model;


import java.util.Map;

import lombok.Data;

/**
 * 電子ジャーナル検索結果レスポンスモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class FetchReceiptDetailResponseModel {
	public FetchReceiptDetailResponseModel() {}

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

	/**
	 * レスポンスモデル
	 */
	private Map<String, Object> responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public Map<String, Object> getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(Map<String, Object> responseModel) {
		this.responseModel = responseModel;
	}
}

