package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Restaurants情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class RestaurantsQueryRequestParamModel {
	public RestaurantsQueryRequestParamModel() {}

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
	private Integer startIndex;
	/**
	 * startIndexゲッター
	 *
	 * @return startIndex
	 */
	public Integer getStartIndex() {
		return startIndex;
	}
	/**
	 * startIndexセッター
	 *
	 * @param startIndex startIndex
	 */
	public void setStartIndex(Integer startIndex) {
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

