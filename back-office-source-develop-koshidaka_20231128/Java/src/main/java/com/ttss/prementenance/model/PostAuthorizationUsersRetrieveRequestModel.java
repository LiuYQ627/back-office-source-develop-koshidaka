package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザ情報取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersRetrieveRequestModel {
	public PostAuthorizationUsersRetrieveRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationUsersRetrieveRequestModel requestModel = new AuthorizationUsersRetrieveRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationUsersRetrieveRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationUsersRetrieveRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

