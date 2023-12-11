package com.ttss.prementenance.model;


import lombok.Data;

/**
 * endpoint-statusエンドポイント状態の照会レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetEndpointStatusStatusResponseModel {
	public GetEndpointStatusStatusResponseModel() {}

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
	private EndpointStatusStatusResponseModel responseModel = new EndpointStatusStatusResponseModel();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public EndpointStatusStatusResponseModel getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(EndpointStatusStatusResponseModel responseModel) {
		this.responseModel = responseModel;
	}

}

