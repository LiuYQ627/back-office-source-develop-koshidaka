package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Pricelists共通ChangePlan データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class PricelistsCommonChangePlanModel {
	public PricelistsCommonChangePlanModel() {}

	/**
	 * 実行計画バージョン
	 */
	private Integer referenceVersion;
	/**
	 * 実行計画バージョンゲッター
	 *
	 * @return 実行計画バージョン
	 */
	public Integer getReferenceVersion() {
		return referenceVersion;
	}
	/**
	 * 実行計画バージョンセッター
	 *
	 * @param referenceVersion 実行計画バージョン
	 */
	public void setReferenceVersion(Integer referenceVersion) {
		this.referenceVersion = referenceVersion;
	}

	/**
	 * 削除フラグ
	 */
	private Boolean deleted;
	/**
	 * 削除フラグゲッター
	 *
	 * @return 削除フラグ
	 */
	public Boolean getDeleted() {
		return deleted;
	}
	/**
	 * 削除フラグセッター
	 *
	 * @param deleted 削除フラグ
	 */
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	/**
	 * referenceId
	 */
	private String referenceId;
	/**
	 * referenceIdゲッター
	 *
	 * @return referenceId
	 */
	public String getReferenceId() {
		return referenceId;
	}
	/**
	 * referenceIdセッター
	 *
	 * @param referenceId referenceId
	 */
	public void setReferenceId(String referenceId) {
		this.referenceId = referenceId;
	}

	/**
	 * 実行計画名称
	 */
	private String name;
	/**
	 * 実行計画名称ゲッター
	 *
	 * @return 実行計画名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 実行計画名称セッター
	 *
	 * @param name 実行計画名称
	 */
	public void setName(String name) {
		this.name = name;
	}

}

