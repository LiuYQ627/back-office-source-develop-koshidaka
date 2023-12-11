package com.ttss.prementenance.model;

import java.util.Map;

import lombok.Data;

/**
 * Devicesデバイス情報照会レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostTotalizerReportResponseModel {
	public PostTotalizerReportResponseModel() {
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

// KSD V001.000 DS
//	/**
//	 * レスポンスモデル
//	 */
//	private List<PosReportAggregateDataModel> responseModel;
//	//private List<PosReportResponseModel> responseModel;
//
//	/**
//	 * レスポンスモデルゲッター
//	 *
//	 * @return レスポンスモデル
//	 */
//	public List<PosReportAggregateDataModel> getResponseModel() {
//	//public List<PosReportResponseModel> getResponseModel() {
//		return responseModel;
//	}
//
//	/**
//	 * レスポンスモデルセッター
//	 *
//	 * @param responseModel レスポンスモデル
//	 */
//	public void setResponseModel(PosReportResponseModel responseModel) {
//	 //this.responseModel = Collections.<PosReportItemModel> emptyList();
//	 this.responseModel = responseModel.getAggregateData();
//	}
// KSD V001.000 DE
// KSD V001.000 AS
	/**
	 * レスポンスモデル
	 */
	private Map<String, Object> responseModel;
	public Map<String, Object> getResponseModel() {
		return responseModel;
	}
	public void setResponseModel(Map<String, Object> responseModel) {
		this.responseModel = responseModel;
	}
// KSD V001.000 AES
}
