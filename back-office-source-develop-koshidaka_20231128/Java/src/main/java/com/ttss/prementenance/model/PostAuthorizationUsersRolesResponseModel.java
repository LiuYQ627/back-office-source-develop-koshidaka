package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザロール設定レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersRolesResponseModel {
	public PostAuthorizationUsersRolesResponseModel() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	/**
	 * 実行結果ゲッター
	 *
	 * @return 実行結果
	 */
	public ApiCommonResponseModel getResult() {
		return result;
	}
	/**
	 * 実行結果セッター
	 *
	 * @param result 実行結果
	 */
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}

	/**
	 * レスポンスモデル
	 */
	private AuthorizationRoleModel responseModel = new AuthorizationRoleModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public AuthorizationRoleModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(AuthorizationRoleModel responseModel) {
		this.responseModel = responseModel;
	}

}

