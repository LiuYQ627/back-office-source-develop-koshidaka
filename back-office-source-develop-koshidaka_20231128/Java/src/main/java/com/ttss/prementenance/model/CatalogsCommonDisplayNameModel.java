package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通DisplayName データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonDisplayNameModel {
	public CatalogsCommonDisplayNameModel() {}

	/**
	 * 表示名称
	 */
	@JsonProperty("default")
	private String defaultValue;
	/**
	 * 表示名称ゲッター
	 *
	 * @return 表示名称
	 */
	@JsonProperty("default")
	public String getDefaultValue() {
		return defaultValue;
	}
	/**
	 * 表示名称セッター
	 *
	 * @param defaultValue 表示名称
	 */
	@JsonProperty("default")
	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	/**
	 * 漢字名称
	 */
	private String kanji;
	/**
	 * 漢字名称ゲッター
	 *
	 * @return 漢字名称
	 */
	public String getKanji() {
		return kanji;
	}
	/**
	 * 漢字名称セッター
	 *
	 * @param kanji 漢字名称
	 */
	public void setKanji(String kanji) {
		this.kanji = kanji;
	}

	/**
	 * カナ名称
	 */
	private String kana;
	/**
	 * カナ名称ゲッター
	 *
	 * @return カナ名称
	 */
	public String getKana() {
		return kana;
	}
	/**
	 * カナ名称セッター
	 *
	 * @param kana カナ名称
	 */
	public void setKana(String kana) {
		this.kana = kana;
	}

	/**
	 * レシート印字名称
	 */
	private String receipt;
	/**
	 * レシート印字名称ゲッター
	 *
	 * @return レシート印字名称
	 */
	public String getReceipt() {
		return receipt;
	}
	/**
	 * レシート印字名称セッター
	 *
	 * @param receipt レシート印字名称
	 */
	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}

	/**
	 * 客面表示名称
	 */
	private String customerSideDisplay;
	/**
	 * 客面表示名称ゲッター
	 *
	 * @return 客面表示名称
	 */
	public String getCustomerSideDisplay() {
		return customerSideDisplay;
	}
	/**
	 * 客面表示名称セッター
	 *
	 * @param customerSideDisplay 客面表示名称
	 */
	public void setCustomerSideDisplay(String customerSideDisplay) {
		this.customerSideDisplay = customerSideDisplay;
	}

}

