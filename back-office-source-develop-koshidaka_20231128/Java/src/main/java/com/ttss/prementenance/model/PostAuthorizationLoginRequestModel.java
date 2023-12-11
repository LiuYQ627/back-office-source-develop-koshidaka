package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationログインリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationLoginRequestModel {
	public PostAuthorizationLoginRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private AuthorizationLoginRequestModel requestModel = new AuthorizationLoginRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public AuthorizationLoginRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(AuthorizationLoginRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

