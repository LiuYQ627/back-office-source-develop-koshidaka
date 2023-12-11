package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 売価変更名称更新レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutPriceChangePriceChangeNameSetResponseModel {
	public PutPriceChangePriceChangeNameSetResponseModel() {}

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

}

