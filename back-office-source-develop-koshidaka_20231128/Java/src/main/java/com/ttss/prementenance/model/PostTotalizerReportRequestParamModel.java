package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostTotalizerReportRequestParamModel {
	public PostTotalizerReportRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private DevicesQueryRequestParamModel requestModel = new DevicesQueryRequestParamModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public DevicesQueryRequestParamModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(DevicesQueryRequestParamModel requestModel) {
		this.requestModel = requestModel;
	}

}

