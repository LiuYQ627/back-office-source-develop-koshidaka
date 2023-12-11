package com.ttss.prementenance.model;

import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
* API 共通レスポンスモデル.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/
@Data
public class ApiCommonResponseModel {
  public ApiCommonResponseModel() {}

  /**
   * マイクロサービス番号.
   */
  private Integer ms;
  /**
   * API番号.
   */
  private Integer api;
  /**
   * 応答コード.
   */
  private Integer code;

  /**
   * エラーメッセージ.
   */
  @JsonIgnore
  private MultiValueMap<String, String> errorMessageMap;

  /**
   * マイクロサービス番号ゲッター.
   * 
   * @return マイクロサービス番号
   */
  public Integer getMs() {
    return ms;
  }

  /**
   * マイクロサービス番号セッター.
   * 
   * @param ms マイクロサービス番号
   */
  public void setMs(Integer ms) {
    this.ms = ms;
  }

  /**
   * API番号ゲッター.
   * 
   * @return API番号
   */
  public Integer getApi() {
    return api;
  }

  /**
   * API番号セッター.
   * 
   * @param api API番号
   */
  public void setApi(Integer api) {
    this.api = api;
  }

  /**
   * 応答コードゲッター.
   * 
   * @return 応答コード
   */
  public Integer getCode() {
    return code;
  }

  /**
   * 応答コードセッター.
   * 
   * @param code 応答コード
   */
  public void setCode(Integer code) {
    this.code = code;
  }

  /**
   * エラーメッセージゲッター.
   * 
   * @return エラーメッセージ
   */
  @JsonProperty
  public MultiValueMap<String, String> getErrorMessageMap() {
    return errorMessageMap;
  }

  /**
   * エラーメッセージセッター.
   * 
   * @param errorMessageMap エラーメッセージ.
   */
  @JsonIgnore
  public void setErrorMessageMap(MultiValueMap<String, String> errorMessageMap) {
    this.errorMessageMap = errorMessageMap;
  }

  /**
   * エラーメッセージ追加.
   * 
   * @param errorMessageMap エラーメッセージ.
   */
  @JsonIgnore
  public void addErrorMessageMap(MultiValueMap<String, String> errorMessageMap) {
    this.errorMessageMap.addAll(errorMessageMap);
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
