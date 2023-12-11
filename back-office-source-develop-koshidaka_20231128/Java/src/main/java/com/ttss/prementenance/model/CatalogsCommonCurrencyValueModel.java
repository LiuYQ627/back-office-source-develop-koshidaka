package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通CurrencyValue データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonCurrencyValueModel {
	public CatalogsCommonCurrencyValueModel() {}

	/**
	 * currencyCode
	 */
	private String currencyCode;
	/**
	 * currencyCodeゲッター
	 *
	 * @return currencyCode
	 */
	public String getCurrencyCode() {
		return currencyCode;
	}
	/**
	 * currencyCodeセッター
	 *
	 * @param currencyCode currencyCode
	 */
	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	/**
	 * value
	 */
	private Integer value;
	/**
	 * valueゲッター
	 *
	 * @return value
	 */
	public Integer getValue() {
		return value;
	}
	/**
	 * valueセッター
	 *
	 * @param value value
	 */
	public void setValue(Integer value) {
		this.value = value;
	}

}

