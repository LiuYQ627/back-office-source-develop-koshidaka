package com.ttss.prementenance.model;


import lombok.Data;

/**
 * カタログアイテム一覧取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetCatalogsCatalogNameItemsRequestModel {
	public GetCatalogsCatalogNameItemsRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsCatalogNameItemsRequestModel requestModel = new CatalogsCatalogNameItemsRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsCatalogNameItemsRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsCatalogNameItemsRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

