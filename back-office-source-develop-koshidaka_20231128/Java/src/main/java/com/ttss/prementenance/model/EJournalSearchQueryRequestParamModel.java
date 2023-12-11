package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストパラメータ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EJournalSearchQueryRequestParamModel {
	public EJournalSearchQueryRequestParamModel() {}

	/**
	 * リクエストモデル
	 */
	private GetEJournalSearchRequestModel requestModel = new GetEJournalSearchRequestModel();
	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public GetEJournalSearchRequestModel getRequestModel() {
		return requestModel;
	}
	/**
	 * リクエストモデルセッター
	 *
	 * @param requestModel リクエストモデル
	 */
	public void setRequestModel(GetEJournalSearchRequestModel requestModel) {
		this.requestModel = requestModel;
	}

}

