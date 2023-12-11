package com.ttss.prementenance.model;


import lombok.Data;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230314 litie(Neusoft)     G002.00.0  issue課題#1649を対応します.
 */

/**
 * 電子ジャーナル保存結果レスポンスモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EJournalSaveResponseModel {
	public EJournalSaveResponseModel() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	/**
	 * 実行結果ゲッター
	 *
	 * @return 実行結果
	 */
	public ApiCommonResponseModel getResult() {
		return result;
	}
	/**
	 * 実行結果セッター
	 *
	 * @param result 実行結果
	 */
	public void setResult(ApiCommonResponseModel result) {
		this.result = result;
	}
	
	/**
	 * レスポンスモデル
	 */
	private String responseModel = new String();
	/**
	 * レスポンスモデルゲッター
	 *
	 * @return レスポンスモデル
	 */
	public String getResponseModel() {
		return responseModel;
	}
	/**
	 * レスポンスモデルセッター
	 *
	 * @param responseModel レスポンスモデル
	 */
	public void setResponseModel(String responseModel) {
		this.responseModel = responseModel;
	}
}

