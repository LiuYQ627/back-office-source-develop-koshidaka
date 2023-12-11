package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザ情報削除リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationUsersDeleteUserRequestModel {
	public AuthorizationUsersDeleteUserRequestModel() {}

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

}

