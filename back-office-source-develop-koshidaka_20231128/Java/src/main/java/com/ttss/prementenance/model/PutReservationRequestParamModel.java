package com.ttss.prementenance.model;

import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutReservationRequestParamModel {
	public PutReservationRequestParamModel() {
	}

	/**
	 * requestModel
	 */
	private PutReservationRequestModel requestModel = new PutReservationRequestModel();

	/**
	 * requestModelゲッター
	 *
	 * @return requestModel
	 */
	public PutReservationRequestModel getRequestModel() {
		return requestModel;
	}

	/**
	 * requestModelセッター
	 *
	 * @param keys keys
	 */
	public void setRequestModel(PutReservationRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}
