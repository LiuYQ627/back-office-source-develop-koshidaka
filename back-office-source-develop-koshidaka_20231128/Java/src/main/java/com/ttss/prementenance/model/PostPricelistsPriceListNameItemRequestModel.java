package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelist商品追加リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostPricelistsPriceListNameItemRequestModel {
	public PostPricelistsPriceListNameItemRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private PricelistsRecordCommonModel requestModel = new PricelistsRecordCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public PricelistsRecordCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(PricelistsRecordCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

