package com.ttss.prementenance.model;

import com.ttss.prementenance.utils.validation.ByteSize;

import lombok.Data;

/**
 * 売価変更名称更新リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutPriceChangePriceChangeNameSetRequestModel {
	public PutPriceChangePriceChangeNameSetRequestModel() {}

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
	 * 売価変更名称
	 */
	@ByteSize(min = 1, max = 30, fullWidthMin = 1, fullWidthMax = 15, encoding = "Shift-JIS")
	private String priceChangeName;
	/**
	 * 売価変更名称ゲッター
	 *
	 * @return 売価変更名称
	 */
	public String getPriceChangeName() {
		return priceChangeName;
	}
	/**
	 * 売価変更名称セッター
	 *
	 * @param priceChangeName 売価変更名称
	 */
	public void setPriceChangeName(String priceChangeName) {
		this.priceChangeName = priceChangeName;
	}

}

