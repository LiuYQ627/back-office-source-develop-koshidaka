package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * pricelist共通Tiersモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class PricelistsCommonTiersModel {
	public PricelistsCommonTiersModel() {}

	/**
	 * price
	 */
	private Integer price;
	/**
	 * priceゲッター
	 *
	 * @return price
	 */
	public Integer getPrice() {
		return price;
	}
	/**
	 * priceセッター
	 *
	 * @param price price
	 */
	public void setPrice(Integer price) {
		this.price = price;
	}

	/**
	 * quantity
	 */
	private Integer quantity;
	/**
	 * quantityゲッター
	 *
	 * @return quantity
	 */
	public Integer getQuantity() {
		return quantity;
	}
	/**
	 * quantityセッター
	 *
	 * @param quantity quantity
	 */
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

}

