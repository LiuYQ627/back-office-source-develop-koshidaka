package com.ttss.prementenance.model;


import lombok.Data;

/**
 * カタロググループ更新リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostCatalogsGroupsRequestBodyModel {
	public PostCatalogsGroupsRequestBodyModel() {}

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

