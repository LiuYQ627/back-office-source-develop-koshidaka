package com.ttss.prementenance.request;

import lombok.Data;

@Data
public class ConfigurationNodeRequest {
	public ConfigurationNodeRequest() {}
	
	private String nodeId;
	public String getNodeId() {
		return nodeId;
	}
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
}
