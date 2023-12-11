package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetConfigurationDetailQueryRequestParamModel {
	public GetConfigurationDetailQueryRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private GetConfigurationDetailRequestModel requestModel = new GetConfigurationDetailRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public GetConfigurationDetailRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(GetConfigurationDetailRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

