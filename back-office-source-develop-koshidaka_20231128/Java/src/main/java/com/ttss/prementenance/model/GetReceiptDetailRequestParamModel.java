package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetReceiptDetailRequestParamModel {

	public GetReceiptDetailRequestParamModel() {
	}
	

	/**
	 * リクエストモデル
	 */
	private GetReceiptDetailRequestParamModel requestModel = new GetReceiptDetailRequestParamModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public GetReceiptDetailRequestParamModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(GetReceiptDetailRequestParamModel requestModel) {
		this.requestModel = requestModel;
	}
}
