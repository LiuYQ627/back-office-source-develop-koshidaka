package com.ttss.prementenance.model;


import lombok.Data;

/**
 * pricelistレコード更新リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostPricelistsRecordPriceListRecordIdRequestBodyModel {
	public PostPricelistsRecordPriceListRecordIdRequestBodyModel() {}

	/**
	 * リクエストモデル
	 */
	private PricelistsRecordCommonModel requestModel = new PricelistsRecordCommonModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public PricelistsRecordCommonModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(PricelistsRecordCommonModel requestModel) {
		this.requestModel = requestModel;
	}

}

