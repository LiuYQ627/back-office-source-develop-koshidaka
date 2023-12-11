package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * 店舗価格情報取得レスポンス データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetPricelistsNodeNodeIdItemsSkuIdResponseModel {
	public GetPricelistsNodeNodeIdItemsSkuIdResponseModel() {
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

	private List<PricelistsRecordCommonModel> responseModelList;

}
