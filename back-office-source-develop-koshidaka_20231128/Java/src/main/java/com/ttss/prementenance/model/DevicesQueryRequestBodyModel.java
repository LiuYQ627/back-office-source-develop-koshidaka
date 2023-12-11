package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DevicesQueryRequestBodyModel {
	public DevicesQueryRequestBodyModel() {}

	/**
	 * keys
	 */
	private DevicesQueryKyesRequestModel keys = new DevicesQueryKyesRequestModel();
	/**
	 * keysゲッター
	 *
	 * @return keys
	 */
	public DevicesQueryKyesRequestModel getKeys() {
		return keys;
	}
	/**
	 * keysセッター
	 *
	 * @param keys keys
	 */
	public void setKeys(DevicesQueryKyesRequestModel keys) {
		this.keys = keys;
	}

}

