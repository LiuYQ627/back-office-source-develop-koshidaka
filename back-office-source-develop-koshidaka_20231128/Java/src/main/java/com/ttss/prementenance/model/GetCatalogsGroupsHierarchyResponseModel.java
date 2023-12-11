package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 商品構成のリンク階層を取得するAPIサービスのレスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetCatalogsGroupsHierarchyResponseModel {
	public GetCatalogsGroupsHierarchyResponseModel() {}

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
	private CatalogsGroupsHierarchyResponseModel responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public CatalogsGroupsHierarchyResponseModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(CatalogsGroupsHierarchyResponseModel responseModel) {
		this.responseModel = responseModel;
	}

}

