package com.ttss.prementenance.model;

import javax.validation.constraints.Size;

import lombok.Data;

/**
 * 端末管理マスタ取得 リクエストパラメータ データモデル.
 * @author TSS 可知 徹生
 * @version 1.0.0
 */

@Data
public class GetTerminalManagementRequestModel {

  public GetTerminalManagementRequestModel() {}

  /**
   * 店舗コード.
   */
  private String storeCd;

  /**
   * 端末ID.
   */
  @Size(min = 4, max = 4, message = "{validation.Size.custom.fixed_length.message}")
  private String clientId;

  /**
   * 店舗コードゲッター.
   * 
   * @return 店舗コードコード
   */
  public String getStoreCd() {
    return storeCd;
  }

  /**
   * 店舗コードセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setStoreCd(String storeCd) {
    this.storeCd = storeCd;
  }

  /**
   * 端末IDゲッター.
   * 
   * @return 端末IDコード
   */
  public String getClientId() {
    return clientId;
  }

  /**
   * 端末IDセッター.
   * 
   * @param clientId 端末ID
   */
  public void setClientId(String clientId) {
    this.clientId = clientId;
  }
}
