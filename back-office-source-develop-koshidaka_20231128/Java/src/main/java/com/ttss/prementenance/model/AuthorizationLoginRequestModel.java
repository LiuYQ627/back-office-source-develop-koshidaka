package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationログインリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationLoginRequestModel {
	public AuthorizationLoginRequestModel() {}

	/**
	 * username
	 */
	private String username;
	/**
	 * usernameゲッター
	 *
	 * @return username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * usernameセッター
	 *
	 * @param username username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * password
	 */
	private String password;
	/**
	 * passwordゲッター
	 *
	 * @return password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * passwordセッター
	 *
	 * @param password password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * newPassword
	 */
	private String newPassword;
	/**
	 * newPasswordゲッター
	 *
	 * @return newPassword
	 */
	public String getNewPassword() {
		return newPassword;
	}
	/**
	 * newPasswordセッター
	 *
	 * @param newPassword newPassword
	 */
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	/**
	 * nodeId
	 */
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
	 * changeplanName
	 */
	private String changeplanName;
	/**
	 * changeplanNameゲッター
	 *
	 * @return changeplanName
	 */
	public String getChangeplanName() {
		return changeplanName;
	}
	/**
	 * changeplanNameセッター
	 *
	 * @param changeplanName changeplanName
	 */
	public void setChangeplanName(String changeplanName) {
		this.changeplanName = changeplanName;
	}

	/**
	 * ksb
	 */
	private String ksb;
	/**
	 * ksbゲッター
	 *
	 * @return ksb
	 */
	public String getKsb() {
		return ksb;
	}
	/**
	 * ksbセッター
	 *
	 * @param ksb ksb
	 */
	public void setKsb(String ksb) {
		this.ksb = ksb;
	}

}

