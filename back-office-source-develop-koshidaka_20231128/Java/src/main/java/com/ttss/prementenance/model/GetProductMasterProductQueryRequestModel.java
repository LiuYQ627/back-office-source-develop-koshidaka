package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 商品マスタ検索リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetProductMasterProductQueryRequestModel {
	public GetProductMasterProductQueryRequestModel() {}

	/**
	 * nodeId
	 */
	@NotEmpty
	private String nodeId;

	private String searchParams;

	private int itemListLimit;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

}

