package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザロール取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationUsersRolesRetrieveRequestModel {
	public AuthorizationUsersRolesRetrieveRequestModel() {}

	/**
	 * userId
	 */
	private String userId;
	/**
	 * userIdゲッター
	 *
	 * @return userId
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * userIdセッター
	 *
	 * @param userId userId
	 */
	public void setUserId(String userId) {
		this.userId = userId;
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
	 * homeStore
	 */
	private Boolean homeStore;
	/**
	 * homeStoreゲッター
	 *
	 * @return homeStore
	 */
	public Boolean getHomeStore() {
		return homeStore;
	}
	/**
	 * homeStoreセッター
	 *
	 * @param homeStore homeStore
	 */
	public void setHomeStore(Boolean homeStore) {
		this.homeStore = homeStore;
	}

}

