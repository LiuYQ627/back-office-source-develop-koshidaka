package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 売価変更備考更新リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutPriceChangePriceChangeNoteSetRequestModel {
	public PutPriceChangePriceChangeNoteSetRequestModel() {}

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
	 * 売価変更備考
	 */
	private String priceChangeNote;
	/**
	 * 売価変更備考ゲッター
	 *
	 * @return 売価変更備考
	 */
	public String getPriceChangeNote() {
		return priceChangeNote;
	}
	/**
	 * 売価変更備考セッター
	 *
	 * @param priceChangeNote 売価変更備考
	 */
	public void setPriceChangeNote(String priceChangeNote) {
		this.priceChangeNote = priceChangeNote;
	}

}

