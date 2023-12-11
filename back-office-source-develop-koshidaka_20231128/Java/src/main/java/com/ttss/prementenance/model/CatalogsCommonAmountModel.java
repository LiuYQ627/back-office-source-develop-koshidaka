package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通Amount データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonAmountModel {
	public CatalogsCommonAmountModel() {}

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
	 * currencyValue
	 */
	private CatalogsCommonCurrencyValueModel currencyValue = new CatalogsCommonCurrencyValueModel();
	/**
	 * currencyValueゲッター
	 *
	 * @return currencyValue
	 */
	public CatalogsCommonCurrencyValueModel getCurrencyValue() {
		return currencyValue;
	}
	/**
	 * currencyValueセッター
	 *
	 * @param currencyValue currencyValue
	 */
	public void setCurrencyValue(CatalogsCommonCurrencyValueModel currencyValue) {
		this.currencyValue = currencyValue;
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

