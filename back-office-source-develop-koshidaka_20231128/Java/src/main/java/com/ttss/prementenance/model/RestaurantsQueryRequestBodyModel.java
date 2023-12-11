package com.ttss.prementenance.model;

import lombok.Data;

/**
 * Restaurants情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class RestaurantsQueryRequestBodyModel {
	public RestaurantsQueryRequestBodyModel() {}

	/**
	 * keys
	 */
	private RestaurantsQueryKyesRequestModel keys = new RestaurantsQueryKyesRequestModel();
	/**
	 * keysゲッター
	 *
	 * @return keys
	 */
	public RestaurantsQueryKyesRequestModel getKeys() {
		return keys;
	}
	/**
	 * keysセッター
	 *
	 * @param keys keys
	 */
	public void setKeys(RestaurantsQueryKyesRequestModel keys) {
		this.keys = keys;
	}

}

