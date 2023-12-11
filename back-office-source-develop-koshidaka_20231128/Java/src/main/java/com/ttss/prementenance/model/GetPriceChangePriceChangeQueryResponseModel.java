package com.ttss.prementenance.model;

import java.util.List;


import lombok.Data;

/**
 * 売価変更No一覧取得レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPriceChangePriceChangeQueryResponseModel {
	public GetPriceChangePriceChangeQueryResponseModel() {}

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
	private List<PricelistsCommonModel> responseModel;
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public List<PricelistsCommonModel> getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(List<PricelistsCommonModel> responseModel) {
		this.responseModel = responseModel;
	}

}

