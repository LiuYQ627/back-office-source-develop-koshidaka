package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 売価変更No取得レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPriceChangePriceChangeSearchResponseModel {
	public GetPriceChangePriceChangeSearchResponseModel() {}

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
	private PriceChangeResponseModel responseModel = new PriceChangeResponseModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public PriceChangeResponseModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(PriceChangeResponseModel responseModel) {
		this.responseModel = responseModel;
	}

}

