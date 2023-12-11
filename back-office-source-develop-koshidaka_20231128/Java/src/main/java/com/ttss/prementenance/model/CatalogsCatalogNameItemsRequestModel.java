package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * カタログアイテムリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCatalogNameItemsRequestModel {
	public CatalogsCatalogNameItemsRequestModel() {}

	/**
	 * skuId
	 */
	private String skuId;
	/**
	 * skuIdゲッター
	 *
	 * @return skuId
	 */
	public String getSkuId() {
		return skuId;
	}
	/**
	 * skuIdセッター
	 *
	 * @param skuId skuId
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	/**
	 * sparse
	 */
	private Boolean sparse;
	/**
	 * sparseゲッター
	 *
	 * @return sparse
	 */
	public Boolean getSparse() {
		return sparse;
	}
	/**
	 * sparseセッター
	 *
	 * @param sparse sparse
	 */
	public void setSparse(Boolean sparse) {
		this.sparse = sparse;
	}

	/**
	 * changePlanName
	 */
	private String changePlanName;
	/**
	 * changePlanNameゲッター
	 *
	 * @return changePlanName
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * changePlanNameセッター
	 *
	 * @param changePlanName changePlanName
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * groupName
	 */
	private String groupName;
	/**
	 * groupNameゲッター
	 *
	 * @return groupName
	 */
	public String getGroupName() {
		return groupName;
	}
	/**
	 * groupNameセッター
	 *
	 * @param groupName groupName
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/**
	 * filter
	 */
	private String filter;
	/**
	 * filterゲッター
	 *
	 * @return filter
	 */
	public String getFilter() {
		return filter;
	}
	/**
	 * filterセッター
	 *
	 * @param filter filter
	 */
	public void setFilter(String filter) {
		this.filter = filter;
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

	/**
	 * catalogGroup
	 */
	private String catalogGroup;
	/**
	 * catalogGroupゲッター
	 *
	 * @return catalogGroup
	 */
	public String getCatalogGroup() {
		return catalogGroup;
	}
	/**
	 * catalogGroupセッター
	 *
	 * @param catalogGroup catalogGroup
	 */
	public void setCatalogGroup(String catalogGroup) {
		this.catalogGroup = catalogGroup;
	}

}

