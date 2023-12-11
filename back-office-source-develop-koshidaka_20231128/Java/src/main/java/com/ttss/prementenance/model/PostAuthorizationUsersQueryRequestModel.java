package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザ情報問い合わせリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersQueryRequestModel {
	public PostAuthorizationUsersQueryRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationUsersQueryRequestModel requestModel = new AuthorizationUsersQueryRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationUsersQueryRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationUsersQueryRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

