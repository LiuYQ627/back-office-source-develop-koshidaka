package com.ttss.prementenance.model;

import lombok.Data;

/**
 * Rentals情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class RentalsQueryRequestBodyModel {
	public RentalsQueryRequestBodyModel() {}

	/**
	 * keys
	 */
	private RentalsQueryKyesRequestModel keys = new RentalsQueryKyesRequestModel();
	/**
	 * keysゲッター
	 *
	 * @return keys
	 */
	public RentalsQueryKyesRequestModel getKeys() {
		return keys;
	}
	/**
	 * keysセッター
	 *
	 * @param keys keys
	 */
	public void setKeys(RentalsQueryKyesRequestModel keys) {
		this.keys = keys;
	}

}

