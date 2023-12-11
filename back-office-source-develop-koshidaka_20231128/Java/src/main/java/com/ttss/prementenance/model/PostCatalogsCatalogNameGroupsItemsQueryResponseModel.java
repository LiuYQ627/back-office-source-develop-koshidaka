package com.ttss.prementenance.model;

import java.util.List;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * 商品構成コード条件抽出APIサービスのレスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostCatalogsCatalogNameGroupsItemsQueryResponseModel {
	public PostCatalogsCatalogNameGroupsItemsQueryResponseModel() {}

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
	private List<CatalogsCommonProductGroupModel> responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public List<CatalogsCommonProductGroupModel> getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(List<CatalogsCommonProductGroupModel> responseModel) {
		this.responseModel = responseModel;
	}

}
