package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザ情報更新リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersRequestModel {
	public PostAuthorizationUsersRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationCommonModel requestModel = new AuthorizationCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

