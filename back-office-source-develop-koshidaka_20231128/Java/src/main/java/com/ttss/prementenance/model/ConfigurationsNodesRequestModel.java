package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * Configurationsリクエストモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsNodesRequestModel {
	public ConfigurationsNodesRequestModel() {}

	/**
	 * 変更計画名
	 */
	private String changePlanName;
	/**
	 * 変更計画名ゲッター
	 *
	 * @return 変更計画名
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 変更計画名セッター
	 *
	 * @param changePlanName 変更計画名
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * ノード名
	 */
	private String nodeNames;
	/**
	 * ノード名ゲッター
	 *
	 * @return ノード名
	 */
	public String getNodeNames() {
		return nodeNames;
	}
	/**
	 * ノード名セッター
	 *
	 * @param nodeNames ノード名
	 */
	public void setNodeNames(String nodeNames) {
		this.nodeNames = nodeNames;
	}

	/**
	 * 返す結果のタイプ
	 */
	private String filter;
	/**
	 * 返す結果のタイプゲッター
	 *
	 * @return 返す結果のタイプ
	 */
	public String getFilter() {
		return filter;
	}
	/**
	 * 返す結果のタイプセッター
	 *
	 * @param filter 返す結果のタイプ
	 */
	public void setFilter(String filter) {
		this.filter = filter;
	}

	/**
	 * フェッチレコード数
	 */
	private Integer batchSize;
	/**
	 * フェッチレコード数ゲッター
	 *
	 * @return フェッチレコード数
	 */
	public Integer getBatchSize() {
		return batchSize;
	}
	/**
	 * フェッチレコード数セッター
	 *
	 * @param batchSize フェッチレコード数
	 */
	public void setBatchSize(Integer batchSize) {
		this.batchSize = batchSize;
	}

	/**
	 * フィールド除外
	 */
	private Boolean excludeFields;
	/**
	 * フィールド除外ゲッター
	 *
	 * @return フィールド除外
	 */
	public Boolean getExcludeFields() {
		return excludeFields;
	}
	/**
	 * フィールド除外セッター
	 *
	 * @param excludeFields フィールド除外
	 */
	public void setExcludeFields(Boolean excludeFields) {
		this.excludeFields = excludeFields;
	}

	/**
	 * 変更計画から移行
	 */
	private Boolean fallthrough;
	/**
	 * 変更計画から移行ゲッター
	 *
	 * @return 変更計画から移行
	 */
	public Boolean getFallthrough() {
		return fallthrough;
	}
	/**
	 * 変更計画から移行セッター
	 *
	 * @param fallthrough 変更計画から移行
	 */
	public void setFallthrough(Boolean fallthrough) {
		this.fallthrough = fallthrough;
	}

}

