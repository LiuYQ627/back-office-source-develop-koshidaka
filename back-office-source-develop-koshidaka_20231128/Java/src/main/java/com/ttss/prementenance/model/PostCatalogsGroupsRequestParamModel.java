package com.ttss.prementenance.model;


import lombok.Data;

/**
 * カタロググループ更新リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostCatalogsGroupsRequestParamModel {
	public PostCatalogsGroupsRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private CatalogsGroupRequestModel requestModel = new CatalogsGroupRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public CatalogsGroupRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(CatalogsGroupRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

