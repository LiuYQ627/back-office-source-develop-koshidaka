package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetReservationDateQueryRequestParamModel {
	public GetReservationDateQueryRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private GetReservationDateRequestModel requestModel = new GetReservationDateRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public GetReservationDateRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(GetReservationDateRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

