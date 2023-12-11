package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelist更新取消リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DeletePricelistsRequestModel {
	public DeletePricelistsRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private PricelistsCommonRequestModel requestModel = new PricelistsCommonRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public PricelistsCommonRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(PricelistsCommonRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

