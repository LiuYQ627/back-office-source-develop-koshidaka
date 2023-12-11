package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * 売価変更No取得レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PriceChangeResponseModel {
	public PriceChangeResponseModel() {}

	/**
	 * 実行計画名
	 */
	private String changePlanName;
	/**
	 * 実行計画名ゲッター
	 *
	 * @return 実行計画名
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 実行計画名セッター
	 *
	 * @param changePlanName 実行計画名
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * version
	 */
	private Integer changePlanVersion;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Integer getChangePlanVersion() {
		return changePlanVersion;
	}
	/**
	 * versionセッター
	 *
	 * @param changePlanVersion version
	 */
	public void setChangePlanVersion(Integer changePlanVersion) {
		this.changePlanVersion = changePlanVersion;
	}

	/**
	 * pricelist共通
	 */
	private PricelistsCommonModel priceLists = new PricelistsCommonModel();
	/**
	 * pricelist共通ゲッター
	 *
	 * @return pricelist共通
	 */
	public PricelistsCommonModel getPriceLists() {
		return priceLists;
	}
	/**
	 * pricelist共通セッター
	 *
	 * @param priceLists pricelist共通
	 */
	public void setPriceLists(PricelistsCommonModel priceLists) {
		this.priceLists = priceLists;
	}

	/**
	 * 商品一覧
	 */
	private List<PriceChangeProductResponseModel> productLists;
	/**
	 * 商品一覧ゲッター
	 *
	 * @return 商品一覧
	 */
	public List<PriceChangeProductResponseModel> getProductLists() {
		return productLists;
	}
	/**
	 * 商品一覧セッター
	 *
	 * @param productLists 商品一覧
	 */
	public void setProductLists(List<PriceChangeProductResponseModel> productLists) {
		this.productLists = productLists;
	}

}

