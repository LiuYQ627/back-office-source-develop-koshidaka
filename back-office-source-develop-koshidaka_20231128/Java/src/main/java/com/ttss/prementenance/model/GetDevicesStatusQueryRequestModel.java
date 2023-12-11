package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 端末状態取得リクエストモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetDevicesStatusQueryRequestModel {
	public GetDevicesStatusQueryRequestModel() {}

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

}

