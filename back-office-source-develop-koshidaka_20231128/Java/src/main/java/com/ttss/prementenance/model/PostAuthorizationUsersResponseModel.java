package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Authorizationユーザ情報更新レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersResponseModel {
	public PostAuthorizationUsersResponseModel() {}

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
	private AuthorizationCommonModel responseModel = new AuthorizationCommonModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public AuthorizationCommonModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(AuthorizationCommonModel responseModel) {
		this.responseModel = responseModel;
	}

}

