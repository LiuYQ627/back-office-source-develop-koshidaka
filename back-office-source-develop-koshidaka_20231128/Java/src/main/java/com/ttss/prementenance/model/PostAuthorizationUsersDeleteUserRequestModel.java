package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザ情報削除リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersDeleteUserRequestModel {
	public PostAuthorizationUsersDeleteUserRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationUsersDeleteUserRequestModel requestModel = new AuthorizationUsersDeleteUserRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationUsersDeleteUserRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationUsersDeleteUserRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

