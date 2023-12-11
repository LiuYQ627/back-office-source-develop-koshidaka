package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 売価変更期間更新リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutPriceChangePriceChangeDateSetRequestModel {
	public PutPriceChangePriceChangeDateSetRequestModel() {}

	/**
	 * 店舗コード(21)
	 */
	private String nodeId;
	/**
	 * 店舗コード(21)ゲッター
	 *
	 * @return 店舗コード(21)
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * 店舗コード(21)セッター
	 *
	 * @param nodeId 店舗コード(21)
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 実行計画名
	 */
	private String changePlanName;
	/**
	 * 実行計画名ゲッター
	 *
	 * @return 実行計画名
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 実行計画名セッター
	 *
	 * @param changePlanName 実行計画名
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * 売価変更No(10)
	 */
	private String priceChangeNo;
	/**
	 * 売価変更No(10)ゲッター
	 *
	 * @return 売価変更No(10)
	 */
	public String getPriceChangeNo() {
		return priceChangeNo;
	}
	/**
	 * 売価変更No(10)セッター
	 *
	 * @param priceChangeNo 売価変更No(10)
	 */
	public void setPriceChangeNo(String priceChangeNo) {
		this.priceChangeNo = priceChangeNo;
	}

	/**
	 * 売価変更開始日
	 */
	private String startDate;
	/**
	 * 売価変更開始日ゲッター
	 *
	 * @return 売価変更開始日
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * 売価変更開始日セッター
	 *
	 * @param startDate 売価変更開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 売価変更終了日
	 */
	private String endDate;
	/**
	 * 売価変更終了日ゲッター
	 *
	 * @return 売価変更終了日
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * 売価変更終了日セッター
	 *
	 * @param endDate 売価変更終了日
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}

