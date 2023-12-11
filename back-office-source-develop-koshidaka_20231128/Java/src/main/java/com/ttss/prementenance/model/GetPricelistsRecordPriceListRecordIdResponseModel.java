package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelistレコード取得レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPricelistsRecordPriceListRecordIdResponseModel {
	public GetPricelistsRecordPriceListRecordIdResponseModel() {}

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
	private PricelistsRecordCommonModel responseModel = new PricelistsRecordCommonModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public PricelistsRecordCommonModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(PricelistsRecordCommonModel responseModel) {
		this.responseModel = responseModel;
	}

}

