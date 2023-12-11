package com.ttss.prementenance.model;


import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EJournalSearchQueryRequestBodyModel {
	public EJournalSearchQueryRequestBodyModel() {}

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

