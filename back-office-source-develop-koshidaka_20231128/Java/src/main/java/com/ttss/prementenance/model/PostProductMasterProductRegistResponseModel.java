package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品マスタ更新レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostProductMasterProductRegistResponseModel {
	public PostProductMasterProductRegistResponseModel() {}

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
