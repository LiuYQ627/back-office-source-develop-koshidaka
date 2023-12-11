package com.ttss.prementenance.model;

import java.util.List;

/**
* ユーザデータ情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
public class PasswordLockUserListModel {
	public PasswordLockUserListModel() {
	}

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

	/**
	 * レスポンス本体
	 */
	private List<PasswordLockUserModel> userInfos;

	/**
	 * @return レスポンス本体のgetter.
	 */
	public List<PasswordLockUserModel> getUserInfos() {
		return userInfos;
	}

	/**
	 * @param レスポンス本体のsetter.
	 */
	public void setUserInfos(List<PasswordLockUserModel> userInfos) {
		this.userInfos = userInfos;
	}

}
