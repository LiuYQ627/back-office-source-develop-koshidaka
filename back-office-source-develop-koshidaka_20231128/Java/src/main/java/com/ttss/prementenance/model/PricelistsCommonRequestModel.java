package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * pricelist共通リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class PricelistsCommonRequestModel {
	public PricelistsCommonRequestModel() {}

	/**
	 * 昇順キー
	 */
	private String orderBy;
	/**
	 * 昇順キーゲッター
	 *
	 * @return 昇順キー
	 */
	public String getOrderBy() {
		return orderBy;
	}
	/**
	 * 昇順キーセッター
	 *
	 * @param orderBy 昇順キー
	 */
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	/**
	 * 昇順／降順
	 */
	private Boolean ascending;
	/**
	 * 昇順／降順ゲッター
	 *
	 * @return 昇順／降順
	 */
	public Boolean getAscending() {
		return ascending;
	}
	/**
	 * 昇順／降順セッター
	 *
	 * @param ascending 昇順／降順
	 */
	public void setAscending(Boolean ascending) {
		this.ascending = ascending;
	}

	/**
	 * 取得レコード位置
	 */
	private Long startIndex;
	/**
	 * 取得レコード位置ゲッター
	 *
	 * @return 取得レコード位置
	 */
	public Long getStartIndex() {
		return startIndex;
	}
	/**
	 * 取得レコード位置セッター
	 *
	 * @param startIndex 取得レコード位置
	 */
	public void setStartIndex(Long startIndex) {
		this.startIndex = startIndex;
	}

	/**
	 * 取得数
	 */
	private Long batchSize;
	/**
	 * 取得数ゲッター
	 *
	 * @return 取得数
	 */
	public Long getBatchSize() {
		return batchSize;
	}
	/**
	 * 取得数セッター
	 *
	 * @param batchSize 取得数
	 */
	public void setBatchSize(Long batchSize) {
		this.batchSize = batchSize;
	}

	/**
	 * 実行計画名称
	 */
	private String changePlanName;
	/**
	 * 実行計画名称ゲッター
	 *
	 * @return 実行計画名称
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 実行計画名称セッター
	 *
	 * @param changePlanName 実行計画名称
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * fallthrough
	 */
	private Boolean fallthrough;
	/**
	 * fallthroughゲッター
	 *
	 * @return fallthrough
	 */
	public Boolean getFallthrough() {
		return fallthrough;
	}
	/**
	 * fallthroughセッター
	 *
	 * @param fallthrough fallthrough
	 */
	public void setFallthrough(Boolean fallthrough) {
		this.fallthrough = fallthrough;
	}

	/**
	 * pricingGroup
	 */
	private String pricingGroup;
	/**
	 * pricingGroupゲッター
	 *
	 * @return pricingGroup
	 */
	public String getPricingGroup() {
		return pricingGroup;
	}
	/**
	 * pricingGroupセッター
	 *
	 * @param pricingGroup pricingGroup
	 */
	public void setPricingGroup(String pricingGroup) {
		this.pricingGroup = pricingGroup;
	}

	/**
	 * priceListの識別子
	 */
	private String priceListName;
	/**
	 * priceListの識別子ゲッター
	 *
	 * @return priceListの識別子
	 */
	public String getPriceListName() {
		return priceListName;
	}
	/**
	 * priceListの識別子セッター
	 *
	 * @param priceListName priceListの識別子
	 */
	public void setPriceListName(String priceListName) {
		this.priceListName = priceListName;
	}

	/**
	 * pricingGroupList
	 */
	private List<String> pricingGroupList;
	/**
	 * pricingGroupListゲッター
	 *
	 * @return pricingGroupList
	 */
	public List<String> getPricingGroupList() {
		return pricingGroupList;
	}
	/**
	 * pricingGroupListセッター
	 *
	 * @param pricingGroupList pricingGroupList
	 */
	public void setPricingGroupList(List<String> pricingGroupList) {
		this.pricingGroupList = pricingGroupList;
	}

	/**
	 * sku
	 */
	private String sku;
	/**
	 * skuゲッター
	 *
	 * @return sku
	 */
	public String getSku() {
		return sku;
	}
	/**
	 * skuセッター
	 *
	 * @param sku sku
	 */
	public void setSku(String sku) {
		this.sku = sku;
	}

	/**
	 * active
	 */
	private String active;
	/**
	 * activeゲッター
	 *
	 * @return active
	 */
	public String getActive() {
		return active;
	}
	/**
	 * activeセッター
	 *
	 * @param active active
	 */
	public void setActive(String active) {
		this.active = active;
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

}

