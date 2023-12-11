package com.ttss.prementenance.model;

import lombok.Data;

/**
* 部門の一覧取得 リクエストパラメータ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class GetDepartmentsRequestModel {

  public GetDepartmentsRequestModel() {}

  /**
   * 店舗コード.
   */
  private int storeCd;

  /**
   * 店舗コードゲッター.
   * 
   * @return 店舗コード
   */
  public int getStoreCd() {
    return storeCd;
  }

  /**
   * 店舗コードセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setStoreCd(int storeCd) {
    this.storeCd = storeCd;
  }
}
