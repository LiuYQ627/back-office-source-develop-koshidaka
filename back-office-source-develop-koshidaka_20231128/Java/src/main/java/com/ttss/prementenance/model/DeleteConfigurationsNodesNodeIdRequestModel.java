package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Configurations変更計画ノード削除リクエストモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DeleteConfigurationsNodesNodeIdRequestModel {
	public DeleteConfigurationsNodesNodeIdRequestModel() {}

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

