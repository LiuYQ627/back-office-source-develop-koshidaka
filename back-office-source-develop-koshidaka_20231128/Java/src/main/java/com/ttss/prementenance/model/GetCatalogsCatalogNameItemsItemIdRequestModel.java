package com.ttss.prementenance.model;


import lombok.Data;

/**
 * アイテム情報取得リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class GetCatalogsCatalogNameItemsItemIdRequestModel {
	public GetCatalogsCatalogNameItemsItemIdRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsCatalogNameItemsItemIdRequestModel requestModel = new CatalogsCatalogNameItemsItemIdRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsCatalogNameItemsItemIdRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsCatalogNameItemsItemIdRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

