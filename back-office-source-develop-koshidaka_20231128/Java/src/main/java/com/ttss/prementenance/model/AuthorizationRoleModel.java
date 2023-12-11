package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorization共通ロール情報 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationRoleModel {
	public AuthorizationRoleModel() {}

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

