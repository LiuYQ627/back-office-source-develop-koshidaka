package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通PaymentExclusions データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonPaymentExclusionsModel {
	public CatalogsCommonPaymentExclusionsModel() {}

	/**
	 * paymentTypeGroup
	 */
	private String paymentTypeGroup;
	/**
	 * paymentTypeGroupゲッター
	 *
	 * @return paymentTypeGroup
	 */
	public String getPaymentTypeGroup() {
		return paymentTypeGroup;
	}
	/**
	 * paymentTypeGroupセッター
	 *
	 * @param paymentTypeGroup paymentTypeGroup
	 */
	public void setPaymentTypeGroup(String paymentTypeGroup) {
		this.paymentTypeGroup = paymentTypeGroup;
	}

	/**
	 * amount
	 */
	private CatalogsCommonAmountModel amount = new CatalogsCommonAmountModel();
	/**
	 * amountゲッター
	 *
	 * @return amount
	 */
	public CatalogsCommonAmountModel getAmount() {
		return amount;
	}
	/**
	 * amountセッター
	 *
	 * @param amount amount
	 */
	public void setAmount(CatalogsCommonAmountModel amount) {
		this.amount = amount;
	}

}

