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
public class PostTotalizerReportPdfResponseModel {
	public PostTotalizerReportPdfResponseModel() {
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
//	private PosReportPdfResponseModel responseModel;
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
