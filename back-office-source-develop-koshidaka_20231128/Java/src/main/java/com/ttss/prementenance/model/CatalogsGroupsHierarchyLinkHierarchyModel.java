package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 商品構成のリンク階層を取得するAPIサービスのリンクデータ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class CatalogsGroupsHierarchyLinkHierarchyModel {
	public CatalogsGroupsHierarchyLinkHierarchyModel() {}

	/**
	 * displayName
	 */
	private CatalogsCommonDisplayNameModel displayName = new CatalogsCommonDisplayNameModel();
	/**
	 * displayNameゲッター
	 *
	 * @return displayName
	 */
	public CatalogsCommonDisplayNameModel getDisplayName() {
		return displayName;
	}
	/**
	 * displayNameセッター
	 *
	 * @param displayName displayName
	 */
	public void setDisplayName(CatalogsCommonDisplayNameModel displayName) {
		this.displayName = displayName;
	}

	/**
	 * グループ名
	 */
	private String name;
	/**
	 * グループ名ゲッター
	 *
	 * @return グループ名
	 */
	public String getName() {
		return name;
	}
	/**
	 * グループ名セッター
	 *
	 * @param name グループ名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 分類No.
	 */
	private Long productClassificationNumber;
	/**
	 * 分類No.ゲッター
	 *
	 * @return 分類No.
	 */
	public Long getProductClassificationNumber() {
		return productClassificationNumber;
	}
	/**
	 * 分類No.セッター
	 *
	 * @param productClassificationNumber 分類No.
	 */
	public void setProductClassificationNumber(Long productClassificationNumber) {
		this.productClassificationNumber = productClassificationNumber;
	}

	/**
	 * 商品構成コード
	 */
	private String productId;
	/**
	 * 商品構成コードゲッター
	 *
	 * @return 商品構成コード
	 */
	public String getProductId() {
		return productId;
	}
	/**
	 * 商品構成コードセッター
	 *
	 * @param productId 商品構成コード
	 */
	public void setProductId(String productId) {
		this.productId = productId;
	}

	/**
	 * 商品コード
	 */
	private String skuId;
	/**
	 * 商品コードゲッター
	 *
	 * @return 商品コード
	 */
	public String getSkuId() {
		return skuId;
	}
	/**
	 * 商品コードセッター
	 *
	 * @param skuId 商品コード
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

}
