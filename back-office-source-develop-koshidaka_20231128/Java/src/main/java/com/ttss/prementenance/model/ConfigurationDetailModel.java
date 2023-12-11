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
public class ConfigurationDetailModel {
	public ConfigurationDetailModel() {
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
	 * version.
	 */
	private String lastModifiedUserId;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}

	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}
	
	/**
	 * version.
	 */
	private String parentName;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public String getParentName() {
		return parentName;
	}

	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
	/**
	 * version.
	 */
	private Map<String, Object> displayName;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public Map<String, Object> getDisplayName() {
		return displayName;
	}
	
	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setDisplayName(Map<String, Object> displayName) {
		this.displayName = displayName;
	}
	
	/**
	 * version.
	 */
	private String name;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public String getName() {
		return name;
	}

	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * configurationSetting.
	 */
	private Map<String, Object> configurations;

	/**
	 * configurationSettingゲッター.
	 *
	 * @return configurationSetting
	 */
	public Map<String, Object> getConfigurations() {
		return configurations;
	}

	/**
	 * configurationSettingセッター.
	 *
	 * @param configurationSetting
	 */
	public void setConfigurations(Map<String, Object> configurations) {
		this.configurations = configurations;
	}

	
}
