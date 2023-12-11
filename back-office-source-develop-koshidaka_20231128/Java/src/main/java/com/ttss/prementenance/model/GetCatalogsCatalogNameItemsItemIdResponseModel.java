package com.ttss.prementenance.model;


import lombok.Data;

/**
 * アイテム情報取得レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetCatalogsCatalogNameItemsItemIdResponseModel {
	public GetCatalogsCatalogNameItemsItemIdResponseModel() {}

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
	private CatalogsCommonModel responseModel = new CatalogsCommonModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public CatalogsCommonModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(CatalogsCommonModel responseModel) {
		this.responseModel = responseModel;
	}

}

