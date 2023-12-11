package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * 売価変更No一覧取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostPosReportRequestModel {
	public PostPosReportRequestModel() {
	}

	/**
	 * ユーザー
	 */
	private String user;

	/**
	* ユーザーゲッター
	*
	* @return ユーザー
	*/
	public String getUser() {
		return user;
	}

	/**
	 * ユーザーセッター
	 *
	 * @param user ユーザー
	 */
	public void setUser(String user) {
		this.user = user;
	}

	/**
	 * 対象レポート
	 */
	private String reportName;

	/**
	* 対象レポートゲッター
	*
	* @return 対象レポート
	*/
	public String getReportName() {
		return reportName;
	}

	/**
	 * 対象レポートセッター
	 *
	 * @param reportName 対象レポート
	 */
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

	/**
	 * レポートフォーマット
	 */
	private String reportFormat;

	/**
	* レポートフォーマットゲッター
	*
	* @return レポートフォーマット
	*/
	public String getReportFormat() {
		return reportFormat;
	}

	/**
	 * レポートフォーマットセッター
	 *
	 * @param reportFormat レポートフォーマット
	 */
	public void setReportFormat(String reportFormat) {
		this.reportFormat= reportFormat;
	}

	/**
	 * 店舗コード(21)
	 */
	private List<String> storeName;

	/**
	 * 店舗コード(21)ゲッター
	 *
	 * @return 店舗コード(21)
	 */
	public List<String> getStoreName() {
		return storeName;
	}

	/**
	 * 店舗コード(21)セッター
	 *
	 * @param storeName 店舗コード(21)
	 */
	public void setStoreName(List<String> storeName) {
		this.storeName = storeName;
	}

	/**
	 * レジ番号
	 */
	private List<String> endpointId;

	/**
	 * レジ番号ゲッター
	 *
	 * @return レジ番号
	 */
	public List<String> getEndpointId() {
		return endpointId;
	}

	/**
	 * レジ番号セッター
	 *
	 * @param endpointId レジ番号
	 */
	public void setEndpointId(List<String> endpointId) {
		this.endpointId = endpointId;
	}

	/**
	 * 期間
	 */
	private DurationModel duration;

	/**
	 * 期間ゲッター
	 *
	 * @return 期間
	 */
	public DurationModel getDuration() {
		return duration;
	}

	/**
	 * 期間セッター
	 *
	 * @param duration 期間
	 */
	public void setDuration(DurationModel duration) {
		this.duration = duration;
	}

	// AS #1544,#1546
	// ０データ印字する／しない
	private boolean includeZeroData;
	// 印字NO：０を印字する／しない
	private boolean printNoCheckFlg;

	public void setIncludeZeroData(boolean includeZeroData) {
		this.includeZeroData =  includeZeroData;
	}

	public boolean getIncludeZeroData() {
		// TODO 自動生成されたメソッド・スタブ
		return includeZeroData;
	}

	public void setPrintNoCheckFlg(boolean printNoCheckFlg) {
		this.printNoCheckFlg =  printNoCheckFlg;
	}

	public boolean getPrintNoCheckFlg() {
		// TODO 自動生成されたメソッド・スタブ
		return printNoCheckFlg;
	}
	// AE #1544,#1546
}
