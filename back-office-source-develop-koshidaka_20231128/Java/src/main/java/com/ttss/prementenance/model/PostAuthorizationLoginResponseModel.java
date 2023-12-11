package com.ttss.prementenance.model;


//KSD V001.000 AS
import java.util.Map;
//KSD V001.000 AE
import lombok.Data;

/**
 * Authorizationログインレスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostAuthorizationLoginResponseModel {
	public PostAuthorizationLoginResponseModel() {}

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
	 * ELERAのToken
	 */
	private String ELERAToken;
	/**
	 * ELERAのTokenゲッター
	 *
	 * @return ELERAのToken
	 */
	public String getELERAToken() {
		return ELERAToken;
	}
	/**
	 * ELERAのTokenセッター
	 *
	 * @param ELERAToken ELERAのToken
	 */
	public void setELERAToken(String ELERAToken) {
		this.ELERAToken = ELERAToken;
	}

	//KSD V001.000 AS
	private Map<String, Object> responseModel;
	//KSD V001.000 AE

}

