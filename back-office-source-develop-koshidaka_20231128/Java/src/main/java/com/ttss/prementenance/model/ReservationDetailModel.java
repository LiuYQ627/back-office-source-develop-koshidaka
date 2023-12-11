package com.ttss.prementenance.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationDetailModel {
	public ReservationDetailModel() {
	}

	/**
	 * version.
	 */
	private String version;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * id.
	 */
	private String id;

	/**
	 * idゲッター.
	 *
	 * @return id
	 */
	public String getId() {
		return id;
	}

	/**
	 * idセッター.
	 *
	 * @param id
	 */
	public void setId(String id) {
		this.id = id;
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
	 * configurationSetting.
	 */
	private Map<String, Object> configurationSetting;

	/**
	 * configurationSettingゲッター.
	 *
	 * @return configurationSetting
	 */
	public Map<String, Object> getConfigurationSetting() {
		return configurationSetting;
	}

	/**
	 * configurationSettingセッター.
	 *
	 * @param configurationSetting
	 */
	public void setConfigurationSetting(Map<String, Object> configurationSetting) {
		this.configurationSetting = configurationSetting;
	}

	/**
	 * configurationType.
	 */
	private String configurationType;

	/**
	 * configurationTypeゲッター.
	 *
	 * @return nodeId
	 */
	public String getConfigurationType() {
		return configurationType;
	}

	/**
	 * configurationTypeセッター.
	 *
	 * @param nodeId
	 */
	public void setConfigurationType(String configurationType) {
		this.configurationType = configurationType;
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
