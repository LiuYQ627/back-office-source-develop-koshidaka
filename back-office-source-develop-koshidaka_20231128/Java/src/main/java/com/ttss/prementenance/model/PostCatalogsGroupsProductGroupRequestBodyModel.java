package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品構成更新リクエストボディ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostCatalogsGroupsProductGroupRequestBodyModel {
	public PostCatalogsGroupsProductGroupRequestBodyModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsCommonProductGroupModel requestModel = new CatalogsCommonProductGroupModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsCommonProductGroupModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsCommonProductGroupModel requestModel) {
		this.requestModel = requestModel;
	}

}

