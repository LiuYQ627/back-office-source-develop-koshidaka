package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品構成をページングで表示するAPIのリクエストパラメータ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class CatalogsGroupsCatalogNameItemsRequestModel {
	public CatalogsGroupsCatalogNameItemsRequestModel() {
		setOrderBy("productId");
		setAscending(false);
		setBatchSize(100L);
	}

	/**
	 * 店舗のカタログ名
	 */
	private String catalogName;
	/**
	 * 店舗のカタログ名ゲッター
	 *
	 * @return catalogName
	 */
	public String getCatalogName() {
		return catalogName;
	}
	/**
	 * 店舗のカタログ名セッター
	 *
	 * @param catalogName 店舗のカタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	/**
	 * 分類No.
	 */
	private Long productClassificationNumber;
	/**
	 * 分類No.ゲッター
	 *
	 * @return productClassificationNumber
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
	 * orderBy
	 */
	private String orderBy;
	/**
	 * orderByゲッター
	 *
	 * @return orderBy
	 */
	public String getOrderBy() {
		return orderBy;
	}
	/**
	 * orderByセッター
	 *
	 * @param orderBy orderBy
	 */
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	/**
	 * ascending
	 */
	private Boolean ascending;
	/**
	 * ascendingゲッター
	 *
	 * @return ascending
	 */
	public Boolean getAscending() {
		return ascending;
	}
	/**
	 * ascendingセッター
	 *
	 * @param ascending ascending
	 */
	public void setAscending(Boolean ascending) {
		this.ascending = ascending;
	}

	/**
	 * startIndex
	 */
	private Long startIndex;
	/**
	 * startIndexゲッター
	 *
	 * @return startIndex
	 */
	public Long getStartIndex() {
		return startIndex;
	}
	/**
	 * startIndexセッター
	 *
	 * @param startIndex startIndex
	 */
	public void setStartIndex(Long startIndex) {
		this.startIndex = startIndex;
	}

	/**
	 * batchSize
	 */
	private Long batchSize;
	/**
	 * batchSizeゲッター
	 *
	 * @return batchSize
	 */
	public Long getBatchSize() {
		return batchSize;
	}
	/**
	 * batchSizeセッター
	 *
	 * @param batchSize batchSize
	 */
	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}

}

