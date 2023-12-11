package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelist更新リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostPricelistsPriceListNameRequestParamModel {
	public PostPricelistsPriceListNameRequestParamModel() {}

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

