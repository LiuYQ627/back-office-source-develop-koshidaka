package com.ttss.prementenance.model;


import lombok.Data;

/**
 * カタログアイテム登録リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostCatalogsCatalogNameItemsRequestBodyModel {
	public PostCatalogsCatalogNameItemsRequestBodyModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsCommonModel requestModel = new CatalogsCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

