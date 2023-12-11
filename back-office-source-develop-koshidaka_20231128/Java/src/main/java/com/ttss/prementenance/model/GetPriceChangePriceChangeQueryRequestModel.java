package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 売価変更No一覧取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPriceChangePriceChangeQueryRequestModel {
	public GetPriceChangePriceChangeQueryRequestModel() {}

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

}

