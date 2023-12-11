package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザ情報問い合わせリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationUsersQueryRequestModel {
	public AuthorizationUsersQueryRequestModel() {}

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
	 * roles
	 */
	private List<String> roles;
	/**
	 * rolesゲッター
	 *
	 * @return roles
	 */
	public List<String> getRoles() {
		return roles;
	}
	/**
	 * rolesセッター
	 *
	 * @param roles roles
	 */
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	/**
	 * nodes
	 */
	private List<String> nodes;
	/**
	 * nodesゲッター
	 *
	 * @return nodes
	 */
	public List<String> getNodes() {
		return nodes;
	}
	/**
	 * nodesセッター
	 *
	 * @param nodes nodes
	 */
	public void setNodes(List<String> nodes) {
		this.nodes = nodes;
	}

}

