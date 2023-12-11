package com.ttss.prementenance.model;

import lombok.Data;

/**
* 担当店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class ChargeStoreCdModel {
	public ChargeStoreCdModel() {
	}

	/**
	 * 担当店舗コード.
	 */
	private String chargeStoreCd;

	/**
	 * 担当店舗コードゲッター.
	 *
	 * @return 担当店舗コード
	 */
	public String getChargeStoreCd() {
		return chargeStoreCd;
	}

	/**
	 * 担当店舗コードセッター.
	 *
	 * @param chargeStoreCd 担当店舗コード
	 */
	public void setChargeStoreCd(String chargeStoreCd) {
		this.chargeStoreCd = chargeStoreCd;
	}
}
