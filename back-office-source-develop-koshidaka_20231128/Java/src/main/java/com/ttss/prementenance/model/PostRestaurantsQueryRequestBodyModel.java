package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Restaurants情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostRestaurantsQueryRequestBodyModel {
	public PostRestaurantsQueryRequestBodyModel() {}

//KSD V001.000 20230810 DS
//	/**
//	 * リクエストモデル
//	 */
//	private RestaurantsQueryRequestBodyModel requestModel = new RestaurantsQueryRequestBodyModel();
//	/**
//	 * リクエストモデルゲッター
//	 *
//	 * @return リクエストモデル
//	 */
//	public RestaurantsQueryRequestBodyModel getRequestModel() {
//		return requestModel;
//	}
//	/**
//	 * リクエストモデルセッター
//	 *
//	 * @param requestModel リクエストモデル
//	 */
//	public void setRequestModel(RestaurantsQueryRequestBodyModel requestModel) {
//		this.requestModel = requestModel;
//	}
//KSD V001.000 20230810 DE
//KSD V001.000 20230810 AS
	private RestaurantsQueryKyesRequestModel requestModel = new RestaurantsQueryKyesRequestModel();
	public RestaurantsQueryKyesRequestModel getRequestModel() {
		return requestModel;
	}
	public void setRequestModel(RestaurantsQueryKyesRequestModel requestModel) {
		this.requestModel = requestModel;
	}
//KSD V001.000 20230810 AE

}

