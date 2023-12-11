package com.ttss.prementenance.model;

import lombok.Data;

/**
 * Devicesデバイス情報照会リクエストボディ データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostTotalizerReportRequestBodyModel {
	public PostTotalizerReportRequestBodyModel() {
	}

	/**
	 * リクエストモデル
	 */
	private PostPosReportRequestModel keys = new PostPosReportRequestModel();

	/**
	 * リクエストモデルゲッター
	 *
	 * @return リクエストモデル
	 */
	public PostPosReportRequestModel getKeys() {
		return keys;
	}

	/**
	 * リクエストモデルセッター
	 *
	 * @param keys リクエストモデル
	 */
	public void setRequestModel(PostPosReportRequestModel keys) {
		this.keys = keys;
	}

}
