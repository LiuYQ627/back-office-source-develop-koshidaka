package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * pricelistsRecord共通 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PricelistsRecordCommonModel {
	public PricelistsRecordCommonModel() {
	}

	/**
	 * changePlan
	 */
	private PricelistsCommonChangePlanModel changePlan = new PricelistsCommonChangePlanModel();

	/**
	 * changePlanゲッター
	 *
	 * @return changePlan
	 */
	public PricelistsCommonChangePlanModel getChangePlan() {
		return changePlan;
	}

	/**
	 * changePlanセッター
	 *
	 * @param changePlan changePlan
	 */
	public void setChangePlan(PricelistsCommonChangePlanModel changePlan) {
		this.changePlan = changePlan;
	}

	/**
	 * tiers
	 */
	private List<PricelistsCommonTiersModel> tiers;

	/**
	 * tiersゲッター
	 *
	 * @return tiers
	 */
	public List<PricelistsCommonTiersModel> getTiers() {
		return tiers;
	}

	/**
	 * tiersセッター
	 *
	 * @param tiers tiers
	 */
	public void setTiers(List<PricelistsCommonTiersModel> tiers) {
		this.tiers = tiers;
	}

	/**
	 * 販売停止区分
	 */
	private Boolean active;

	/**
	 * 販売停止区分ゲッター
	 *
	 * @return 販売停止区分
	 */
	public Boolean getActive() {
		return active;
	}

	/**
	 * 販売停止区分セッター
	 *
	 * @param active 販売停止区分
	 */
	public void setActive(Boolean active) {
		this.active = active;
	}

	/**
	 * id
	 */
	private String id;

	/**
	 * idゲッター
	 *
	 * @return id
	 */
	public String getId() {
		return id;
	}

	/**
	 * idセッター
	 *
	 * @param id id
	 */
	public void setId(String id) {
		this.id = id;
	}

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
	 * priceListの識別子
	 */
	private String priceList;

	/**
	 * priceListの識別子ゲッター
	 *
	 * @return priceListの識別子
	 */
	public String getPriceList() {
		return priceList;
	}

	/**
	 * priceListの識別子セッター
	 *
	 * @param priceList priceListの識別子
	 */
	public void setPriceList(String priceList) {
		this.priceList = priceList;
	}

	/**
	 * 売単価
	 */
	private Integer price;

	/**
	 * 売単価ゲッター
	 *
	 * @return 売単価
	 */
	public Integer getPrice() {
		return price;
	}

	/**
	 * 売単価セッター
	 *
	 * @param price 売単価
	 */
	public void setPrice(Integer price) {
		this.price = price;
	}

	/**
	 * UOM
	 */
	@JsonProperty("UOM")
	private String UOM;

	/**
	 * UOMゲッター
	 *
	 * @return UOM
	 */
	@JsonProperty("UOM")
	public String getUOM() {
		return UOM;
	}

	/**
	 * UOMセッター
	 *
	 * @param UOM UOM
	 */
	@JsonProperty("UOM")
	public void setUOM(String UOM) {
		this.UOM = UOM;
	}

	/**
	 * 販売開始日
	 */
	private String startDate;

	/**
	 * 販売開始日ゲッター
	 *
	 * @return 販売開始日
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * 販売開始日セッター
	 *
	 * @param startDate 販売開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 販売終了日
	 */
	private String endDate;

	/**
	 * 販売終了日ゲッター
	 *
	 * @return 販売終了日
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * 販売終了日セッター
	 *
	 * @param endDate 販売終了日
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * 通貨
	 */
	private String currencyCode;

	/**
	 * 通貨ゲッター
	 *
	 * @return 通貨
	 */
	public String getCurrencyCode() {
		return currencyCode;
	}

	/**
	 * 通貨セッター
	 *
	 * @param currencyCode 通貨
	 */
	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	/**
	 * version
	 */
	private Long version;

	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	/**
	 * createTimestamp
	 */
	private String createTimestamp;

	/**
	 * createTimestampゲッター
	 *
	 * @return createTimestamp
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}

	/**
	 * createTimestampセッター
	 *
	 * @param createTimestamp createTimestamp
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * lastModifiedTimestamp
	 */
	private String lastModifiedTimestamp;

	/**
	 * lastModifiedTimestampゲッター
	 *
	 * @return lastModifiedTimestamp
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}

	/**
	 * lastModifiedTimestampセッター
	 *
	 * @param lastModifiedTimestamp lastModifiedTimestamp
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * lastModifiedUserId
	 */
	private String lastModifiedUserId;

	/**
	 * lastModifiedUserIdゲッター
	 *
	 * @return lastModifiedUserId
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}

	/**
	 * lastModifiedUserIdセッター
	 *
	 * @param lastModifiedUserId lastModifiedUserId
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * 原単価
	 */
	private Integer unitPrice;

	/**
	 * 定価単価
	 */
	private Integer manufacturerPrice;

	/**
	 * アイテム値割引区分
	 */
	private Integer pricedownType;

	/**
	 * アイテム売変区分
	 */
	private Integer priceChangeType;

	private String priceId;

}
