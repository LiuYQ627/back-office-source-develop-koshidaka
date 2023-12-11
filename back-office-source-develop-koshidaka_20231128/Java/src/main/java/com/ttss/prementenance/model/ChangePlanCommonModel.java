package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * 変更計画共通 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class ChangePlanCommonModel {
	public ChangePlanCommonModel() {}

	/**
	 * バージョン
	 */
	private Integer version;
	/**
	 * バージョンゲッター
	 *
	 * @return バージョン
	 */
	public Integer getVersion() {
		return version;
	}
	/**
	 * バージョンセッター
	 *
	 * @param version バージョン
	 */
	public void setVersion(Integer version) {
		this.version = version;
	}

	/**
	 * 実行計画処理結果
	 */
	private List<ChangePlanResultCommonModel> results;
	/**
	 * 実行計画処理結果ゲッター
	 *
	 * @return 実行計画処理結果
	 */
	public List<ChangePlanResultCommonModel> getResults() {
		return results;
	}
	/**
	 * 実行計画処理結果セッター
	 *
	 * @param results 実行計画処理結果
	 */
	public void setResults(List<ChangePlanResultCommonModel> results) {
		this.results = results;
	}

	/**
	 * 変更計画ステータス
	 */
	private String status;
	/**
	 * 変更計画ステータスゲッター
	 *
	 * @return 変更計画ステータス
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * 変更計画ステータスセッター
	 *
	 * @param status 変更計画ステータス
	 */
	public void setStatus(String status) {
		this.status = status;
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
	 * 更新日時
	 */
	private String lastModifiedTimestamp;
	/**
	 * 更新日時ゲッター
	 *
	 * @return 更新日時
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}
	/**
	 * 更新日時セッター
	 *
	 * @param lastModifiedTimestamp 更新日時
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * 変更計画名称
	 */
	private String name;
	/**
	 * 変更計画名称ゲッター
	 *
	 * @return 変更計画名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 変更計画名称セッター
	 *
	 * @param name 変更計画名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 実行する変更計画名称
	 */
	private String changePlanName;
	/**
	 * 実行する変更計画名称ゲッター
	 *
	 * @return 実行する変更計画名称
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 実行する変更計画名称セッター
	 *
	 * @param changePlanName 実行する変更計画名称
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * フリーテキスト
	 */
	private String notes;
	/**
	 * フリーテキストゲッター
	 *
	 * @return フリーテキスト
	 */
	public String getNotes() {
		return notes;
	}
	/**
	 * フリーテキストセッター
	 *
	 * @param notes フリーテキスト
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}

	/**
	 * 実行完了時間
	 */
	private String executionDateTime;
	/**
	 * 実行完了時間ゲッター
	 *
	 * @return 実行完了時間
	 */
	public String getExecutionDateTime() {
		return executionDateTime;
	}
	/**
	 * 実行完了時間セッター
	 *
	 * @param executionDateTime 実行完了時間
	 */
	public void setExecutionDateTime(String executionDateTime) {
		this.executionDateTime = executionDateTime;
	}

}

