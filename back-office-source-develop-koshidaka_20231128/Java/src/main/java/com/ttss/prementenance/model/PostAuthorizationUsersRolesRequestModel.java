package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザロール設定リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersRolesRequestModel {
	public PostAuthorizationUsersRolesRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationRoleModel requestModel = new AuthorizationRoleModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationRoleModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationRoleModel requestModel) {
		this.requestModel = requestModel;
	}

}

