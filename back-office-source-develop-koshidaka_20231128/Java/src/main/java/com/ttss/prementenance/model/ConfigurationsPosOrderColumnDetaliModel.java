package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * POSオーダー価格項目 データモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsPosOrderColumnDetaliModel {
	public ConfigurationsPosOrderColumnDetaliModel() {}

	/**
	 * name
	 */
	private String name;
	/**
	 * nameゲッター
	 *
	 * @return name
	 */
	public String getName() {
		return name;
	}
	/**
	 * nameセッター
	 *
	 * @param name name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * rate
	 */
	private String rate;
	/**
	 * rateゲッター
	 *
	 * @return rate
	 */
	public String getRate() {
		return rate;
	}
	/**
	 * rateセッター
	 *
	 * @param rate rate
	 */
	public void setRate(String rate) {
		this.rate = rate;
	}

	/**
	 * type
	 */
	private String type;
	/**
	 * typeゲッター
	 *
	 * @return type
	 */
	public String getType() {
		return type;
	}
	/**
	 * typeセッター
	 *
	 * @param type type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * rateType
	 */
	private String rateType;
	/**
	 * rateTypeゲッター
	 *
	 * @return rateType
	 */
	public String getRateType() {
		return rateType;
	}
	/**
	 * rateTypeセッター
	 *
	 * @param rateType rateType
	 */
	public void setRateType(String rateType) {
		this.rateType = rateType;
	}

	/**
	 * indicator
	 */
	private String indicator;
	/**
	 * indicatorゲッター
	 *
	 * @return indicator
	 */
	public String getIndicator() {
		return indicator;
	}
	/**
	 * indicatorセッター
	 *
	 * @param indicator indicator
	 */
	public void setIndicator(String indicator) {
		this.indicator = indicator;
	}

	/**
	 * jurisdictionType
	 */
	private String jurisdictionType;
	/**
	 * jurisdictionTypeゲッター
	 *
	 * @return jurisdictionType
	 */
	public String getJurisdictionType() {
		return jurisdictionType;
	}
	/**
	 * jurisdictionTypeセッター
	 *
	 * @param jurisdictionType jurisdictionType
	 */
	public void setJurisdictionType(String jurisdictionType) {
		this.jurisdictionType = jurisdictionType;
	}

	/**
	 * originalTaxSource
	 */
	private String originalTaxSource;
	/**
	 * originalTaxSourceゲッター
	 *
	 * @return originalTaxSource
	 */
	public String getOriginalTaxSource() {
		return originalTaxSource;
	}
	/**
	 * originalTaxSourceセッター
	 *
	 * @param originalTaxSource originalTaxSource
	 */
	public void setOriginalTaxSource(String originalTaxSource) {
		this.originalTaxSource = originalTaxSource;
	}

	/**
	 * offline
	 */
	private Boolean offline;
	/**
	 * offlineゲッター
	 *
	 * @return offline
	 */
	public Boolean getOffline() {
		return offline;
	}
	/**
	 * offlineセッター
	 *
	 * @param offline offline
	 */
	public void setOffline(Boolean offline) {
		this.offline = offline;
	}

	/**
	 * roundingMode
	 */
	private String roundingMode;
	/**
	 * roundingModeゲッター
	 *
	 * @return roundingMode
	 */
	public String getRoundingMode() {
		return roundingMode;
	}
	/**
	 * roundingModeセッター
	 *
	 * @param roundingMode roundingMode
	 */
	public void setRoundingMode(String roundingMode) {
		this.roundingMode = roundingMode;
	}

}

