package com.ttss.prementenance.model;


import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * Devices共通 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class DevicesCommonModel {
	public DevicesCommonModel() {}

	/**
	 * createTimestamp
	 */
	private String createTimestamp;
	/**
	 * createTimestampゲッター
	 *
	 * @return createTimestamp
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}
	/**
	 * createTimestampセッター
	 *
	 * @param createTimestamp createTimestamp
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * lastModifiedTimestamp
	 */
	private String lastModifiedTimestamp;
	/**
	 * lastModifiedTimestampゲッター
	 *
	 * @return lastModifiedTimestamp
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}
	/**
	 * lastModifiedTimestampセッター
	 *
	 * @param lastModifiedTimestamp lastModifiedTimestamp
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * version
	 */
	private Long version;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Long getVersion() {
		return version;
	}
	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	/**
	 * lastModifiedUserId
	 */
	private String lastModifiedUserId;
	/**
	 * lastModifiedUserIdゲッター
	 *
	 * @return lastModifiedUserId
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}
	/**
	 * lastModifiedUserIdセッター
	 *
	 * @param lastModifiedUserId lastModifiedUserId
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * 端末名称
	 */
	private String name;
	/**
	 * 端末名称ゲッター
	 *
	 * @return 端末名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 端末名称セッター
	 *
	 * @param name 端末名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 店舗ノード
	 */
	private String nodeId;
	/**
	 * 店舗ノードゲッター
	 *
	 * @return 店舗ノード
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * 店舗ノードセッター
	 *
	 * @param nodeId 店舗ノード
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * activeChangePlanName
	 */
	private String activeChangePlanName;
	/**
	 * activeChangePlanNameゲッター
	 *
	 * @return activeChangePlanName
	 */
	public String getActiveChangePlanName() {
		return activeChangePlanName;
	}
	/**
	 * activeChangePlanNameセッター
	 *
	 * @param activeChangePlanName activeChangePlanName
	 */
	public void setActiveChangePlanName(String activeChangePlanName) {
		this.activeChangePlanName = activeChangePlanName;
	}

	/**
	 * terminalType
	 */
	private String terminalType;
	/**
	 * terminalTypeゲッター
	 *
	 * @return terminalType
	 */
	public String getTerminalType() {
		return terminalType;
	}
	/**
	 * terminalTypeセッター
	 *
	 * @param terminalType terminalType
	 */
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}

	/**
	 * uiTheme
	 */
	private String uiTheme;
	/**
	 * uiThemeゲッター
	 *
	 * @return uiTheme
	 */
	public String getUiTheme() {
		return uiTheme;
	}
	/**
	 * uiThemeセッター
	 *
	 * @param uiTheme uiTheme
	 */
	public void setUiTheme(String uiTheme) {
		this.uiTheme = uiTheme;
	}

	/**
	 * locale
	 */
	private String locale;
	/**
	 * localeゲッター
	 *
	 * @return locale
	 */
	public String getLocale() {
		return locale;
	}
	/**
	 * localeセッター
	 *
	 * @param locale locale
	 */
	public void setLocale(String locale) {
		this.locale = locale;
	}

	/**
	 * レジ番号
	 */
	private String endpointId;
	/**
	 * レジ番号ゲッター
	 *
	 * @return レジ番号
	 */
	public String getEndpointId() {
		return endpointId;
	}
	/**
	 * レジ番号セッター
	 *
	 * @param endpointId レジ番号
	 */
	public void setEndpointId(String endpointId) {
		this.endpointId = endpointId;
	}

	/**
	 * serialNumber
	 */
	private String serialNumber;
	/**
	 * serialNumberゲッター
	 *
	 * @return serialNumber
	 */
	public String getSerialNumber() {
		return serialNumber;
	}
	/**
	 * serialNumberセッター
	 *
	 * @param serialNumber serialNumber
	 */
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	/**
	 * depositRefundMode
	 */
	private Boolean depositRefundMode;
	/**
	 * depositRefundModeゲッター
	 *
	 * @return depositRefundMode
	 */
	public Boolean getDepositRefundMode() {
		return depositRefundMode;
	}
	/**
	 * depositRefundModeセッター
	 *
	 * @param depositRefundMode depositRefundMode
	 */
	public void setDepositRefundMode(Boolean depositRefundMode) {
		this.depositRefundMode = depositRefundMode;
	}

	/**
	 * deviceName
	 */
	private String deviceName;
	/**
	 * deviceNameゲッター
	 *
	 * @return deviceName
	 */
	public String getDeviceName() {
		return deviceName;
	}
	/**
	 * deviceNameセッター
	 *
	 * @param deviceName deviceName
	 */
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	/**
	 * storeCode
	 */
	private String storeCode;
	/**
	 * storeCodeゲッター
	 *
	 * @return storeCode
	 */
	public String getStoreCode() {
		return storeCode;
	}
	/**
	 * storeCodeセッター
	 *
	 * @param storeCode storeCode
	 */
	public void setStoreCode(String storeCode) {
		this.storeCode = storeCode;
	}

	// KSD V001.000 AS
	/**
	 * 金種設定
	 */
	private Map<String, Object> moneyTypeSettings;
	// KSD V001.000 AE

}

