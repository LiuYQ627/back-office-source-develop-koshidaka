package com.ttss.prementenance.model;

import lombok.Data;

/**
* 商品分類階層設定更新 レスポンス データモデル.
*
* @author 
* @version 
*/
@Data
public class PostProductDivisionsResponseModel {

	public PostProductDivisionsResponseModel() {}

	/**
	 * 実行結果.
	 */
	private ApiCommonResponseModel result;
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

}
