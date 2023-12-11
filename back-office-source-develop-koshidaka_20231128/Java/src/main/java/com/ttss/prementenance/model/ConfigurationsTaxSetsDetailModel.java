// KSD V001.000 AS 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * TAX_SETS データモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsTaxSetsDetailModel {
    public ConfigurationsTaxSetsDetailModel() {}

	// order -------------------------------------------//
	/**
	 * order
	 */
	private Integer order;

	/**
	 * orderゲッター.
	 *
	 * @return order
	 */
	public Integer getOrder() {
		return order;
	}

	/**
	 * orderセッター
	 *
	 * @param order order
	 */
	public void setOrder(Integer order) {
		this.order = order;
	}
	// order -------------------------------------------//

	// value -------------------------------------------//
	/**
	 * value
	 */
	private String value;

	/**
	 * valueゲッター.
	 *
	 * @return value
	 */
	public String getValue() {
		return value;
	}

	/**
	 * リスト名セッター.
	 *
	 * @param group リスト名
	 */
	public void setValue(String value) {
		this.value = value;
	}
	// value -------------------------------------------//

}
// KSD V001.000 AE 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
