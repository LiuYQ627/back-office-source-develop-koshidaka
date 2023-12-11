package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Rentals情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostRentalsQueryRequestParamModel {
	public PostRentalsQueryRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private RentalsQueryRequestParamModel requestModel = new RentalsQueryRequestParamModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public RentalsQueryRequestParamModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(RentalsQueryRequestParamModel requestModel) {
		this.requestModel = requestModel;
	}

}

