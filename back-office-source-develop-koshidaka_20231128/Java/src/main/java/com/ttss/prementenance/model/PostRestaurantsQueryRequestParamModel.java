package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Restaurants情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostRestaurantsQueryRequestParamModel {
	public PostRestaurantsQueryRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private RestaurantsQueryRequestParamModel requestModel = new RestaurantsQueryRequestParamModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public RestaurantsQueryRequestParamModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(RestaurantsQueryRequestParamModel requestModel) {
		this.requestModel = requestModel;
	}

}

