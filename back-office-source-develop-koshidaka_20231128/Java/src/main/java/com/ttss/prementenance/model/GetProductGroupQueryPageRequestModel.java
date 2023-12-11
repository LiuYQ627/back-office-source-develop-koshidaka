package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;
import lombok.Data;

/**
 * 商品構成マスタページ検索 リクエストパラメータ データモデル.
 * @author
 * @version 1.0.0
 */
@Data
public class GetProductGroupQueryPageRequestModel {

	public GetProductGroupQueryPageRequestModel() {
		setOrderBy("productId");
		setAscending(false);
		setBatchSize(100L);
	}

	/**
	 * 店舗カタログ名.
	 */
	@NotEmpty
	private String catalogName;
	/**
	 * 店舗カタログ名ゲッター.
	 *
	 * @return 店舗カタログ名
	 */
	public String getCatalogName() {
		return catalogName;
	}
	/**
	 * 店舗カタログ名セッター.
	 *
	 * @param catalogName 店舗カタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	/**
	 * 分類No.
	 */
	@Range(min=1, max=8)
	private Long productClassificationNumber;
	/**
	 * 分類No.ゲッター.
	 *
	 * @return 分類No.
	 */
	public Long getProductClassificationNumber() {
		return productClassificationNumber;
	}
	/**
	 * 分類No.セッター.
	 *
	 * @param productClassificationNumber 分類No.
	 */
	public void setProductClassificationNumber(Long productClassificationNumber) {
		this.productClassificationNumber = productClassificationNumber;
	}

	/**
	 * 検索の開始位置.
	 */
	@NotNull
	private Long startIndex;
	/**
	 * 検索の開始位置.ゲッター.
	 *
	 * @return 検索の開始位置.
	 */
	public Long getStartIndex() {
		return startIndex;
	}
	/**
	 * 検索の開始位置.セッター.
	 *
	 * @param startIndex 検索の開始位置.
	 */
	public void setStartIndex(Long startIndex) {
		this.startIndex = startIndex;
	}

	/**
	 * orderBy.
	 */
	private String orderBy;
	/**
	 * orderByゲッター.
	 *
	 * @return orderBy
	 */
	public String getOrderBy() {
		return orderBy;
	}
	/**
	 * orderByセッター.
	 *
	 * @param orderBy 店舗カタログ名
	 */
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	/**
	 * ascending.
	 */
	private boolean ascending;
	/**
	 * ascendingゲッター.
	 *
	 * @return ascending
	 */
	public boolean getAscending() {
		return ascending;
	}
	/**
	 * ascendingセッター.
	 *
	 * @param ascending
	 */
	public void setAscending(boolean ascending) {
		this.ascending = ascending;
	}

	/**
	 * batchSize.
	 */
	private Long batchSize;
	/**
	 * batchSizeゲッター.
	 *
	 * @return batchSize
	 */
	public Long getBatchSize() {
		return batchSize;
	}
	/**
	 * batchSizeセッター.
	 *
	 * @param batchSize
	 */
	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}

}
