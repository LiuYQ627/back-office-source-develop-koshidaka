package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
* WSO2ログイン レスポンス データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
public class Wso2AccessTokenModel {
  /**
   * アクセストークン.
   */
  @JsonProperty("access_token")
  private String accessToken;

  /**
   * トークンタイプ.
   */
  @JsonProperty("token_type")
  private String tokenType;

  /**
   * スコープ.
   */
  @JsonIgnore
  private String scope;

  /**
   * 有効期限.
   */
  @JsonProperty("expires_in")
  private String expiresIn;

  /**
   * アクセストークンゲッター.
   * 
   * @return アクセストークン
   */
  public String getAccessToken() {
    return accessToken;
  }

  /**
   * アクセストークンセッター.
   * 
   * @param accessToken アクセストークン
   */
  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  /**
   * トークンタイプゲッター.
   * 
   * @return tokenType トークンタイプ
   */
  public String getTokenType() {
    return tokenType;
  }

  /**
   * トークンタイプセッター.
   * 
   * @param tokenType トークンタイプ
   */
  public void setTokenType(String tokenType) {
    this.tokenType = tokenType;
  }

  /**
   * スコープゲッター.
   * 
   * @return scope スコープ
   */
  @JsonProperty
  public String getScope() {
    return scope;
  }

  /**
   * スコープセッター.
   * 
   * @param scope スコープ
   */
  @JsonIgnore
  public void setScope(String scope) {
    this.scope = scope;
  }

  /**
   * 有効期限ゲッター.
   * 
   * @return expires_in 有効期限
   */
  @JsonIgnore
  public String getExpiresIn() {
    return expiresIn;
  }

  /**
   * 有効期限セッター.
   * 
   * @param expiresIn 有効期限
   */
  @JsonIgnore
  public void setExpiresIn(String expiresIn) {
    this.expiresIn = expiresIn;
  }

}
