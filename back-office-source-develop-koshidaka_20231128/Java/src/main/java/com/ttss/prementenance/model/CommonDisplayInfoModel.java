package com.ttss.prementenance.model;

import lombok.Data;

/**
* 共通表示情報 データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class CommonDisplayInfoModel {
  public CommonDisplayInfoModel() {}

  /**
   * クライアント種別.
   */
  private short displayClientType;
  /**
   * 表示シーン.
   */
  private String displayScene;
  /**
   * 表示キー.
   */
  private String displayKey;
  /**
   * 表示メッセージ.
   */
  private String displayMessage;

  /**
   * クライアント種別ゲッター.
   *
   * @return クライアント種別
   */
  public short getDisplayClientType() {
    return displayClientType;
  }

  /**
   * クライアント種別セッター.
   *
   * @param displayClientType クライアント種別
   */
  public void setDisplayClientType(short displayClientType) {
    this.displayClientType = displayClientType;
  }
    
  /**
   * 表示シーンゲッター.
   *
   * @return 表示シーン
   */
  public String getDisplayScene() {
    return displayScene;
  }

  /**
   * 表示シーンセッター.
   *
   * @param displayScene 表示シーン
   */
  public void setDisplayScene(String displayScene) {
    this.displayScene = displayScene;
  }

  /**
   * 表示キーゲッター.
   *
   * @return 表示キー
   */
  public String getDisplayKey() {
    return displayKey;
  }

  /**
   * 表示キーセッター.
   *
   * @param displayKey 表示キー
   */
  public void setDisplayKey(String displayKey) {
    this.displayKey = displayKey;
  }
    
  /**
   * 表示メッセージゲッター.
   *
   * @return 表示メッセージ
   */
  public String getDisplayMessage() {
    return displayMessage;
  }

  /**
   * 表示メッセージセッター.
   *
   * @param displayMessage 表示メッセージ
   */
  public void setDisplayMessage(String displayMessage) {
    this.displayMessage = displayMessage;
  }
}
