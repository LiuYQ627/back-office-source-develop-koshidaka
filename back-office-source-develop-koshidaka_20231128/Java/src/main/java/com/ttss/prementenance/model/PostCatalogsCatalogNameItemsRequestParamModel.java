package com.ttss.prementenance.model;


import lombok.Data;

/**
 * カタログアイテム登録リクエストパラメーター データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostCatalogsCatalogNameItemsRequestParamModel {
	public PostCatalogsCatalogNameItemsRequestParamModel() {}

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

