package com.ttss.prementenance.model;

import lombok.Data;

/**
* 店舗マスタ更新 レスポンス データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutReservationResponseModel {

	public PutReservationResponseModel() {
	}

	/**
	 * 実行結果.
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();

	/**
	 * 実行結果ゲッター.
	 * 
	 * @return 実行結果
	 */
	public ApiCommonResponseModel getResult() {
		return result;
	}

	/**
	 * 実行結果セッター.
	 * 
	 * @param result 実行結果
	 */
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}

	/**
	 * レスポンスモデル
	 */
	private ReservationDetailModel responseModel;

	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public ReservationDetailModel getResponseModel() {
		return responseModel;
	}

	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(ReservationDetailModel responseModel) {
		this.responseModel = responseModel;
	}
}
