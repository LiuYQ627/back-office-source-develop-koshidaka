package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品構成のリンク階層を取得するAPIサービスのリクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class GetCatalogsGroupsHierarchyRequestModel {
	public GetCatalogsGroupsHierarchyRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsGroupsHierarchyRequestModel requestModel = new CatalogsGroupsHierarchyRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsGroupsHierarchyRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsGroupsHierarchyRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

