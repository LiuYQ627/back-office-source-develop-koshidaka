package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelist追加リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostPricelistsRequestModel {
	public PostPricelistsRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private PricelistsCommonModel requestModel = new PricelistsCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public PricelistsCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(PricelistsCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

