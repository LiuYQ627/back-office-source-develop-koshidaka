package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストKyes データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DevicesQueryKyesRequestModel {
	public DevicesQueryKyesRequestModel() {}

	/**
	 * name
	 */
	private List<String> name;
	/**
	 * nameゲッター
	 *
	 * @return name
	 */
	public List<String> getName() {
		return name;
	}
	/**
	 * nameセッター
	 *
	 * @param name name
	 */
	public void setName(List<String> name) {
		this.name = name;
	}

	/**
	 * nodeId
	 */
	private List<String> nodeId;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public List<String> getNodeId() {
		return nodeId;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeId(List<String> nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * activeChangePlanName
	 */
	private List<String> activeChangePlanName;
	/**
	 * activeChangePlanNameゲッター
	 *
	 * @return activeChangePlanName
	 */
	public List<String> getActiveChangePlanName() {
		return activeChangePlanName;
	}
	/**
	 * activeChangePlanNameセッター
	 *
	 * @param activeChangePlanName activeChangePlanName
	 */
	public void setActiveChangePlanName(List<String> activeChangePlanName) {
		this.activeChangePlanName = activeChangePlanName;
	}

	/**
	 * terminalType
	 */
	private List<String> terminalType;
	/**
	 * terminalTypeゲッター
	 *
	 * @return terminalType
	 */
	public List<String> getTerminalType() {
		return terminalType;
	}
	/**
	 * terminalTypeセッター
	 *
	 * @param terminalType terminalType
	 */
	public void setTerminalType(List<String> terminalType) {
		this.terminalType = terminalType;
	}

	/**
	 * uiTheme
	 */
	private List<String> uiTheme;
	/**
	 * uiThemeゲッター
	 *
	 * @return uiTheme
	 */
	public List<String> getUiTheme() {
		return uiTheme;
	}
	/**
	 * uiThemeセッター
	 *
	 * @param uiTheme uiTheme
	 */
	public void setUiTheme(List<String> uiTheme) {
		this.uiTheme = uiTheme;
	}

	/**
	 * locale
	 */
	private List<String> locale;
	/**
	 * localeゲッター
	 *
	 * @return locale
	 */
	public List<String> getLocale() {
		return locale;
	}
	/**
	 * localeセッター
	 *
	 * @param locale locale
	 */
	public void setLocale(List<String> locale) {
		this.locale = locale;
	}

	/**
	 * endpointId
	 */
	private List<String> endpointId;
	/**
	 * endpointIdゲッター
	 *
	 * @return endpointId
	 */
	public List<String> getEndpointId() {
		return endpointId;
	}
	/**
	 * endpointIdセッター
	 *
	 * @param endpointId endpointId
	 */
	public void setEndpointId(List<String> endpointId) {
		this.endpointId = endpointId;
	}

}

