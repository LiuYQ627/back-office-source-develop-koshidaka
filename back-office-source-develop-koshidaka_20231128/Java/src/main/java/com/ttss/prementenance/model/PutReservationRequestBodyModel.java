package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutReservationRequestBodyModel {
	public PutReservationRequestBodyModel() {}

	/**
	 * requestModel
	 */
	private ReservationDetailModel requestModel = new ReservationDetailModel();
	/**
	 * requestModelゲッター
	 *
	 * @return requestModel
	 */
	public ReservationDetailModel getRequestModel() {
		return requestModel;
	}
	/**
	 * requestModelセッター
	 *
	 * @param keys keys
	 */
	public void setRequestModel(ReservationDetailModel requestModel) {
		this.requestModel = requestModel;
	}

}

