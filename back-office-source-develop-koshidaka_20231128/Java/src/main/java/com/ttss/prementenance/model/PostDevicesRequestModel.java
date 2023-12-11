package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報更新リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostDevicesRequestModel {
	public PostDevicesRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private DevicesCommonModel requestModel = new DevicesCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public DevicesCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(DevicesCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

