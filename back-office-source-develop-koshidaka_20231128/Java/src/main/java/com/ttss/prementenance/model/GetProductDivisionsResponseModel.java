// KSD V001.000 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * Configurationsストア設定取得レスポンスモデル データモデル.
 *
 * @author
 * @version 
 */
@Data
public class GetProductDivisionsResponseModel {
	public GetProductDivisionsResponseModel() {
	}

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
	private ConfigurationsProductDivisionsModel responseModel = new ConfigurationsProductDivisionsModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public ConfigurationsProductDivisionsModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(ConfigurationsProductDivisionsModel responseModel) {
		this.responseModel = responseModel;
	}
}
// KSD V001.000 AE
