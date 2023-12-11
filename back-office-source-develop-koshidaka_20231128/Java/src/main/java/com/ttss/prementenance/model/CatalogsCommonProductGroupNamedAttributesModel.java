package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通商品構成マスタnamedAttributes データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonProductGroupNamedAttributesModel {
	public CatalogsCommonProductGroupNamedAttributesModel() {}

	/**
	 * POS売上税区分
	 */
	private List<String> productTaxCodes;
	/**
	 * POS売上税区分ゲッター
	 *
	 * @return POS売上税区分
	 */
	public List<String> getProductTaxCodes() {
		return productTaxCodes;
	}
	/**
	 * POS売上税区分セッター
	 *
	 * @param productTaxCodes POS売上税区分
	 */
	public void setProductTaxCodes(List<String> productTaxCodes) {
		this.productTaxCodes = productTaxCodes;
	}

	/**
	 * 商品区分
	 */
	private Long productClassification;
	/**
	 * 商品区分ゲッター
	 *
	 * @return 商品区分
	 */
	public Long getProductClassification() {
		return productClassification;
	}
	/**
	 * 商品区分セッター
	 *
	 * @param productClassification 商品区分
	 */
	public void setProductClassification(Long productClassification) {
		this.productClassification = productClassification;
	}

	/**
	 * 年齢確認商品(対象:20)
	 */
	private Long ageToBuy;
	/**
	 * 年齢確認商品(対象:20)ゲッター
	 *
	 * @return 年齢確認商品(対象:20)
	 */
	public Long getAgeToBuy() {
		return ageToBuy;
	}
	/**
	 * 年齢確認商品(対象:20)セッター
	 *
	 * @param ageToBuy 年齢確認商品(対象:20)
	 */
	public void setAgeToBuy(Long ageToBuy) {
		this.ageToBuy = ageToBuy;
	}

	/**
	 * アイテム値割引区分
	 */
	private Boolean discountable;
	/**
	 * アイテム値割引ゲッター
	 *
	 * @return アイテム値割引
	 */
	public Boolean getDiscountable() {
		return discountable;
	}
	/**
	 * アイテム値割引セッター
	 *
	 * @param discountable アイテム値割引
	 */
	public void setDiscountable(Boolean discountable) {
		this.discountable = discountable;
	}

	/**
	 * アイテム売変区分
	 */
	private Boolean priceChangeOperation;
	/**
	 * アイテム売変区分ゲッター
	 *
	 * @return アイテム売変区分
	 */
	public Boolean getPriceChangeOperation() {
		return priceChangeOperation;
	}
	/**
	 * アイテム売変区分セッター
	 *
	 * @param priceChangeOperation アイテム売変区分
	 */
	public void setPriceChangeOperation(Boolean priceChangeOperation) {
		this.priceChangeOperation = priceChangeOperation;
	}

	/**
	 * 小計値引割引対象
	 */
	private Boolean subTotalDiscountable;
	/**
	 * 小計値引割引対象ゲッター
	 *
	 * @return 小計値引割引対象
	 */
	public Boolean getSubTotalDiscountable() {
		return subTotalDiscountable;
	}
	/**
	 * 小計値引割引対象セッター
	 *
	 * @param subTotalDiscountable 小計値引割引対象
	 */
	public void setSubTotalDiscountable(Boolean subTotalDiscountable) {
		this.subTotalDiscountable = subTotalDiscountable;
	}

	/**
	 * 決済種別
	 */
	private CatalogsCommonPaymentRestrictionsModel paymentRestrictions = new CatalogsCommonPaymentRestrictionsModel();

	/**
	 * 決済種別ゲッター
	 *
	 * @return 決済種別
	 */
	public CatalogsCommonPaymentRestrictionsModel getPaymentRestrictions() {
		return paymentRestrictions;
	}

	/**
	 * 決済種別セッター
	 *
	 * @param paymentRestrictions 決済種別
	 */
	public void setPaymentRestrictions(CatalogsCommonPaymentRestrictionsModel paymentRestrictions) {
		this.paymentRestrictions = paymentRestrictions;
	}

	/**
	 * 免税区分
	 */
	private Long dutyFreeClassification;
	/**
	 * 免税区分ゲッター
	 *
	 * @return 免税区分
	 */
	public Long getDutyFreeClassification() {
		return dutyFreeClassification;
	}
	/**
	 * 免税区分セッター
	 *
	 * @param dutyFreeClassification 免税区分
	 */
	public void setDutyFreeClassification(Long dutyFreeClassification) {
		this.dutyFreeClassification = dutyFreeClassification;
	}

	/**
	 * 販売停止区分
	 */
	private Boolean notForSale;
	/**
	 * 販売停止区分ゲッター
	 *
	 * @return 販売停止区分
	 */
	public Boolean getNotForSale() {
		return notForSale;
	}
	/**
	 * 販売停止区分セッター
	 *
	 * @param notForSale 販売停止区分
	 */
	public void setNotForSale(Boolean notForSale) {
		this.notForSale = notForSale;
	}

	/**
	 * 金額強制入力
	 */
	private Boolean priceRequired;
	/**
	 * 金額強制入力ゲッター
	 *
	 * @return 金額強制入力
	 */
	public Boolean getPriceRequired() {
		return priceRequired;
	}
	/**
	 * 金額強制入力セッター
	 *
	 * @param priceRequired 金額強制入力
	 */
	public void setPriceRequired(Boolean priceRequired) {
		this.priceRequired = priceRequired;
	}

}

