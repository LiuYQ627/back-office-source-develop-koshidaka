package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostDevicesQueryRequestBodyModel {
	public PostDevicesQueryRequestBodyModel() {}

	/**
	 * リクエストモデル
	 */
	private DevicesQueryRequestBodyModel requestModel = new DevicesQueryRequestBodyModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public DevicesQueryRequestBodyModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(DevicesQueryRequestBodyModel requestModel) {
		this.requestModel = requestModel;
	}

}

