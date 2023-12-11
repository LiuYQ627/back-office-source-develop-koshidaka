package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * 共通エリアデフォルト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CommonDefaultModel {
	public CommonDefaultModel() {}

	/**
	 * default
	 */
	@JsonProperty("default")
	private String defaultValue;
	/**
	 * defaultゲッター
	 *
	 * @return default
	 */
	@JsonProperty("default")
	public String getDefaultValue() {
		return defaultValue;
	}
	/**
	 * defaultセッター
	 *
	 * @param defaultValue default
	 */
	@JsonProperty("default")
	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

}

