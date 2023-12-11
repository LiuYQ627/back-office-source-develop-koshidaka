package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品構成をページングで表示するAPIサービスのリクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetCatalogsGroupsCatalogNameItemsRequestModel {
	public GetCatalogsGroupsCatalogNameItemsRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsGroupsCatalogNameItemsRequestModel requestModel = new CatalogsGroupsCatalogNameItemsRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsGroupsCatalogNameItemsRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsGroupsCatalogNameItemsRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

