package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelist全商品一覧取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPricelistsItemsRequestModel {
	public GetPricelistsItemsRequestModel() {}

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

