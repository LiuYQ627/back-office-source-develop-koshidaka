package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * Authorizationユーザ情報問い合わせリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationUsersQueryResponseModel {
	public PostAuthorizationUsersQueryResponseModel() {}

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
	private List<AuthorizationUsersQueryResponseModel> responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public List<AuthorizationUsersQueryResponseModel> getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(List<AuthorizationUsersQueryResponseModel> responseModel) {
		this.responseModel = responseModel;
	}

}

