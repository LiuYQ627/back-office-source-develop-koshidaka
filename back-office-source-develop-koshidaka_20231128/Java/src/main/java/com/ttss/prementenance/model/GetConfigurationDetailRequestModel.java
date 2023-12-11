package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetConfigurationDetailRequestModel {

	public GetConfigurationDetailRequestModel() {
	}

	/**
	 * 店舗ID.
	 */
	private String nodeId;

	/**
	 * 店舗IDゲッター.
	 * 
	 * @return 店舗コードコード
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * 店舗IDセッター.
	 * 
	 * @param storeCd 店舗コード
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
}
