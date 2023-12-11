package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 店舗価格情報取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetPricelistsNodeNodeIdItemsSkuIdRequestModel {
	public GetPricelistsNodeNodeIdItemsSkuIdRequestModel() {}

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

