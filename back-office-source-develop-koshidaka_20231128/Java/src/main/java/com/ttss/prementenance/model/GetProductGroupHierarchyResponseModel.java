package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * 商品構成マスタリンク階層取得 レスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetProductGroupHierarchyResponseModel {
	public GetProductGroupHierarchyResponseModel() {}

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

