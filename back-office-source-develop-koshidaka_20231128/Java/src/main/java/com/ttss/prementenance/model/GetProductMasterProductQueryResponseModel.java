package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * 商品マスタ検索レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetProductMasterProductQueryResponseModel {
	public GetProductMasterProductQueryResponseModel() {}

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
	private List<ProductMasterProductResponseModel> responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public List<ProductMasterProductResponseModel> getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(List<ProductMasterProductResponseModel> responseModel) {
		this.responseModel = responseModel;
	}

}

