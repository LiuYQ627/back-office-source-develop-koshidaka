package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Configurationsノード設定レスポンスモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostConfigurationsNodesResponseModel {
	public PostConfigurationsNodesResponseModel() {}

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
	private ConfigurationsModel responseModel = new ConfigurationsModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public ConfigurationsModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(ConfigurationsModel responseModel) {
		this.responseModel = responseModel;
	}

}

