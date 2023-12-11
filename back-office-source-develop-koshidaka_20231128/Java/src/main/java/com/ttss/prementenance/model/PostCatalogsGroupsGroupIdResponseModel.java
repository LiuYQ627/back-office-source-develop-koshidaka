package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品構成情報削除対象検索レスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostCatalogsGroupsGroupIdResponseModel {
public PostCatalogsGroupsGroupIdResponseModel() {}

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
	private CatalogsCommonProductGroupModel responseModel = new CatalogsCommonProductGroupModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public CatalogsCommonProductGroupModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(CatalogsCommonProductGroupModel responseModel) {
		this.responseModel = responseModel;
	}

}

