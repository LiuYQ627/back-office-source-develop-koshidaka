package com.ttss.prementenance.model;

import java.util.Map;
import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PutConfigurationRequestModel {
	public PutConfigurationRequestModel() {
	}

	/**
	 * nodeId.
	 */
	private String nodeId;

	/**
	 * nodeIdゲッター.
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * nodeIdセッター.
	 *
	 * @param nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * mode.
	 */
	private Integer mode;

	/**
	 * modeゲッター.
	 *
	 * @return mode
	 */
	public Integer getMode() {
		return mode;
	}

	/**
	 * modeセッター.
	 *
	 * @param mode
	 */
	public void setMode(Integer mode) {
		this.mode = mode;
	}

	/**
	 * configuration.
	 */
	private Map<String, Object> configuration;

	/**
	 * configurationゲッター.
	 *
	 * @return nodeId
	 */
	public Map<String, Object> getConfiguration() {
		return configuration;
	}

	/**
	 * configurationセッター.
	 *
	 * @param configuration
	 */
	public void setConfiguration(Map<String, Object> configuration) {
		this.configuration = configuration;
	}

	/**
	 * type.
	 */
	private String type;

	/**
	 * typeゲッター.
	 *
	 * @return type
	 */
	public String getType() {
		return type;
	}

	/**
	 * typeセッター.
	 *
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * executionDate.
	 */
	private String executionDate;

	/**
	 * executionDateゲッター.
	 *
	 * @return executionDate
	 */
	public String getExecutionDate() {
		return executionDate;
	}

	/**
	 * executionDateセッター.
	 *
	 * @param executionDate
	 */
	public void setExecutionDate(String executionDate) {
		this.executionDate = executionDate;
	}
}
