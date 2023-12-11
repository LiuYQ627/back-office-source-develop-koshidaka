package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * pricelist共通 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class PricelistsCommonModel {
	public PricelistsCommonModel() {}

	/**
	 * 売価変更No：企業コード(15)＋店舗(6)＋売価変更No(10)
	 */
	private String name;
	/**
	 * 売価変更No：企業コード(15)＋店舗(6)＋売価変更No(10)ゲッター
	 *
	 * @return 売価変更No：企業コード(15)＋店舗(6)＋売価変更No(10)
	 */
	public String getName() {
		return name;
	}
	/**
	 * 売価変更No：企業コード(15)＋店舗(6)＋売価変更No(10)セッター
	 *
	 * @param name 売価変更No：企業コード(15)＋店舗(6)＋売価変更No(10)
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 売価変更名称
	 */
	private String displayName;
	/**
	 * 売価変更名称ゲッター
	 *
	 * @return 売価変更名称
	 */
	public String getDisplayName() {
		return displayName;
	}
	/**
	 * 売価変更名称セッター
	 *
	 * @param displayName 売価変更名称
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	/**
	 * 適用開始日
	 */
	private String startDate;
	/**
	 * 適用開始日ゲッター
	 *
	 * @return 適用開始日
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * 適用開始日セッター
	 *
	 * @param startDate 適用開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 適用終了日
	 */
	private String endDate;
	/**
	 * 適用終了日ゲッター
	 *
	 * @return 適用終了日
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * 適用終了日セッター
	 *
	 * @param endDate 適用終了日
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * 有効フラグ
	 */
	private Boolean active;
	/**
	 * 有効フラグゲッター
	 *
	 * @return 有効フラグ
	 */
	public Boolean getActive() {
		return active;
	}
	/**
	 * 有効フラグセッター
	 *
	 * @param active 有効フラグ
	 */
	public void setActive(Boolean active) {
		this.active = active;
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
	 * 実行計画
	 */
	private PricelistsCommonChangePlanModel changePlan = new PricelistsCommonChangePlanModel();
	/**
	 * 実行計画ゲッター
	 *
	 * @return 実行計画
	 */
	public PricelistsCommonChangePlanModel getChangePlan() {
		return changePlan;
	}
	/**
	 * 実行計画セッター
	 *
	 * @param changePlan 実行計画
	 */
	public void setChangePlan(PricelistsCommonChangePlanModel changePlan) {
		this.changePlan = changePlan;
	}

	/**
	 * 作成日時
	 */
	private String createTimestamp;
	/**
	 * 作成日時ゲッター
	 *
	 * @return 作成日時
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}
	/**
	 * 作成日時セッター
	 *
	 * @param createTimestamp 作成日時
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * 最終更新日時
	 */
	private String lastModifiedTimestamp;
	/**
	 * 最終更新日時ゲッター
	 *
	 * @return 最終更新日時
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}
	/**
	 * 最終更新日時セッター
	 *
	 * @param lastModifiedTimestamp 最終更新日時
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * 最終更新ユーザID
	 */
	private String lastModifiedUserId;
	/**
	 * 最終更新ユーザIDゲッター
	 *
	 * @return 最終更新ユーザID
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}
	/**
	 * 最終更新ユーザIDセッター
	 *
	 * @param lastModifiedUserId 最終更新ユーザID
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * version
	 */
	private Integer version;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Integer getVersion() {
		return version;
	}
	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Integer version) {
		this.version = version;
	}

}

