package com.ttss.prementenance.model;

import java.net.http.HttpResponse;

import lombok.Data;

/**
 * MSへのアクセス用レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class HttpResponseExtentionModel {
	public HttpResponseExtentionModel() {}

	/**
	 * 実行結果
	 */
	private HttpResponse<String> response;
	/**
	 * 実行結果ゲッター
	 *
	 * @return 実行結果
	 */
	public HttpResponse<String> getResponse() {
		return response;
	}
	/**
	 * 実行結果セッター
	 *
	 * @param result 実行結果
	 */
	public void setResponse(HttpResponse<String> response) {
		this.response = response;
	}
	
  /**
   * WSO2のToken
   */
  private String WSO2Token;
  /**
   * WSO2のTokenゲッター
   *
   * @return ELERAのToken
   */
  public String getWSO2Token() {
	return WSO2Token;
  }
  /**
   * WSO2のTokenセッター
   *
   * @param WSO2Token WSO2のToken
   */
  public void setWSO2Token(String WSO2Token) {
	this.WSO2Token = WSO2Token;
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
}

