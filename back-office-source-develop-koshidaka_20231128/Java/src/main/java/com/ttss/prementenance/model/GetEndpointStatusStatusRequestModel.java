package com.ttss.prementenance.model;


import lombok.Data;

/**
 * endpoint-statusエンドポイント状態の照会リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetEndpointStatusStatusRequestModel {
	public GetEndpointStatusStatusRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private EndpointStatusStatusRequestModel requestModel = new EndpointStatusStatusRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public EndpointStatusStatusRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(EndpointStatusStatusRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

