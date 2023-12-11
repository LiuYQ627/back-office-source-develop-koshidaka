package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;

/**
 * 商品マスタ取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetProductMasterProductSearchRequestModel {
	public GetProductMasterProductSearchRequestModel() {}

	/**
	 * nodeId
	 */
	@NotEmpty
	private String nodeId;
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

	/**
	 * itemId
	 */
    // @NotEmpty
    @Size(min = 1, max = 14)
	private String itemId;
	/**
	 * itemIdゲッター
	 *
	 * @return itemId
	 */
	public String getItemId() {
		return itemId;
	}
	/**
	 * itemIdセッター
	 *
	 * @param itemId itemId
	 */
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

}

