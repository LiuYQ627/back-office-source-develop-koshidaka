package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザ情報取得リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthorizationUsersRetrieveRequestModel {
	public AuthorizationUsersRetrieveRequestModel() {
	}

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
	 * validatePassword
	 */
	private Boolean validatePassword;

	/**
	 * validatePasswordゲッター
	 *
	 * @return validatePassword
	 */
	public Boolean getValidatePassword() {
		return validatePassword;
	}

	/**
	 * validatePasswordセッター
	 *
	 * @param validatePassword validatePassword
	 */
	public void setValidatePassword(Boolean validatePassword) {
		this.validatePassword = validatePassword;
	}

	private Integer passwordErrorCount;

}
