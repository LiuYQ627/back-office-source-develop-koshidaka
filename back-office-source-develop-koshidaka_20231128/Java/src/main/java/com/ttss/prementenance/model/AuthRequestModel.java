package com.ttss.prementenance.model;

/**
* ユーザ権限取得 リクエスト データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
public class AuthRequestModel {

  /**
   * WindowsId.
   */
  private String windowsId;

  /**
   * WindowsIdゲッター.
   * 
   * @return windowsId
   */
  public String getWindowsId() {
    return windowsId;
  }

  /**
   * WindowsIdセッター.
   * 
   * @param windowsId WindowsId
   */
  public void setWindowsId(String windowsId) {
    this.windowsId = windowsId;
  }
}
