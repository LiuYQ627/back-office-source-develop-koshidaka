package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報削除レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DeleteDevicesResponseModel {
	public DeleteDevicesResponseModel() {}

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
	private DevicesCommonModel responseModel = new DevicesCommonModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public DevicesCommonModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(DevicesCommonModel responseModel) {
		this.responseModel = responseModel;
	}

}

