package com.ttss.prementenance.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * wso2のトークン取得用データの管理クラス.
 * 
 * @author toshiaki.hirota
 */
@ConfigurationProperties(prefix = "wso2")
public class OauthContext {

  // ホスト名
  private String hostname;

  // コンシューマキー
  private String consumerKey;

  // コンシューマシークレット
  private String consumerSecret;

  /**
   * ホスト名を取得.
   * 
   * @return hostname ホスト名
   */
  public String getHostname() {
    return hostname;
  }

  /**
   * ホスト名を設定.
   * 
   * @param hostname ホスト名
   */
  public void setHostname(String hostname) {
    this.hostname = hostname;
  }

  /**
   * コンシューマキーを取得.
   * 
   * @return consumerKey コンシューマキー
   */
  public String getConsumerKey() {
    return consumerKey;
  }

  /**
   * コンシューマキーを設定.
   * 
   * @param consumerKey コンシューマキー
   */
  public void setConsumerKey(String consumerKey) {
    this.consumerKey = consumerKey;
  }

  /**
   * コンシューマシークレットを取得.
   * 
   * @return consumerSecret コンシューマシークレット
   */
  public String getConsumerSecret() {
    return consumerSecret;
  }

  /**
   * コンシューマシークレットを設定.
   * 
   * @param consumerSecret コンシューマシークレット
   */
  public void setConsumerSecret(String consumerSecret) {
    this.consumerSecret = consumerSecret;
  }
}

