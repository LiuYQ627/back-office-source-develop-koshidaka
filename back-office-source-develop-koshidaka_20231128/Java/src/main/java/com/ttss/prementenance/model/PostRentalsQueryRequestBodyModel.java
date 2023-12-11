package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Rentals情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostRentalsQueryRequestBodyModel {
	public PostRentalsQueryRequestBodyModel() {}

//KSD V001.000 20230810 DS
//	/**
//	 * リクエストモデル
//	 */
//	private RentalsQueryRequestBodyModel requestModel = new RentalsQueryRequestBodyModel();
//	/**
//	 * リクエストモデルゲッター
//	 *
//	 * @return リクエストモデル
//	 */
//	public RentalsQueryRequestBodyModel getRequestModel() {
//		return requestModel;
//	}
//	/**
//	 * リクエストモデルセッター
//	 *
//	 * @param requestModel リクエストモデル
//	 */
//	public void setRequestModel(RentalsQueryRequestBodyModel requestModel) {
//		this.requestModel = requestModel;
//	}
//KSD V001.000 20230810 DE

//KSD V001.000 20230810 AS
	private RentalsQueryKyesRequestModel requestModel = new RentalsQueryKyesRequestModel();
	public RentalsQueryKyesRequestModel getRequestModel() {
		return requestModel;
	}
	public void setRequestModel(RentalsQueryKyesRequestModel requestModel) {
		this.requestModel = requestModel;
	}
//KSD V001.000 20230810 AE

}

