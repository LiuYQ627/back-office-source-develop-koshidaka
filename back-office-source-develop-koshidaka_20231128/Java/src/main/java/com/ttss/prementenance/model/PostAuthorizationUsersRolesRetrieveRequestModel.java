package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザロール取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersRolesRetrieveRequestModel {
	public PostAuthorizationUsersRolesRetrieveRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationUsersRolesRetrieveRequestModel requestModel = new AuthorizationUsersRolesRetrieveRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationUsersRolesRetrieveRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationUsersRolesRetrieveRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

