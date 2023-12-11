package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザ情報問い合わせレスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class AuthorizationUsersQueryResponseModel {
	public AuthorizationUsersQueryResponseModel() {}

	/**
	 * nodeRoles
	 */
	private List<AuthorizationRoleModel> nodeRoles;
	/**
	 * nodeRolesゲッター
	 *
	 * @return nodeRoles
	 */
	public List<AuthorizationRoleModel> getNodeRoles() {
		return nodeRoles;
	}
	/**
	 * nodeRolesセッター
	 *
	 * @param nodeRoles nodeRoles
	 */
	public void setNodeRoles(List<AuthorizationRoleModel> nodeRoles) {
		this.nodeRoles = nodeRoles;
	}

	/**
	 * userRecord
	 */
	private AuthorizationCommonModel userRecord = new AuthorizationCommonModel();
	/**
	 * userRecordゲッター
	 *
	 * @return userRecord
	 */
	public AuthorizationCommonModel getUserRecord() {
		return userRecord;
	}
	/**
	 * userRecordセッター
	 *
	 * @param userRecord userRecord
	 */
	public void setUserRecord(AuthorizationCommonModel userRecord) {
		this.userRecord = userRecord;
	}

}

