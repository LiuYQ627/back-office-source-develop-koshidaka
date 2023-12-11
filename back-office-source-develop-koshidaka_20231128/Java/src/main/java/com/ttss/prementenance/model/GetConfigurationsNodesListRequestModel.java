package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Configurationsノード取得リクエストモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetConfigurationsNodesListRequestModel {
	public GetConfigurationsNodesListRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private ConfigurationsNodesRequestModel requestModel = new ConfigurationsNodesRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public ConfigurationsNodesRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(ConfigurationsNodesRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

