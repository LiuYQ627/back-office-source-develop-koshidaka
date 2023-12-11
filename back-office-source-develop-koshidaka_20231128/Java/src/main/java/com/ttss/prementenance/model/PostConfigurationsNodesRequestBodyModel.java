package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Configurationsノード設定リクエストボディモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostConfigurationsNodesRequestBodyModel {
	public PostConfigurationsNodesRequestBodyModel() {}

	/**
	 * リクエストモデル
	 */
	private ConfigurationsModel requestModel = new ConfigurationsModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public ConfigurationsModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(ConfigurationsModel requestModel) {
		this.requestModel = requestModel;
	}

}

