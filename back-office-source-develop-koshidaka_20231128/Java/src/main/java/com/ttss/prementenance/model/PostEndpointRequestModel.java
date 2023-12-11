package com.ttss.prementenance.model;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 端末状態取得リクエストモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostEndpointRequestModel {
	public PostEndpointRequestModel() {}

	/**
	 * nodeId
	 */
	@NotEmpty
	private List<String> nodeIds;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public List<String> getNodeIds() {
		return nodeIds;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeIds(List<String> nodeIds) {
		this.nodeIds = nodeIds;
	}

}

