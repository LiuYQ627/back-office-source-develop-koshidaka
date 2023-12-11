package com.ttss.prementenance.model;

import lombok.Data;

@Data
public class GetTaxRatesResponseModel {
	public GetTaxRatesResponseModel() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();

	/**
	 * リクエストモデル
	 */
	private ConfigurationsPosOrderColumnModel responseModel = new ConfigurationsPosOrderColumnModel();
}
