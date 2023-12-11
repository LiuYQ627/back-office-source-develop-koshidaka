package com.ttss.prementenance.model;

import lombok.Data;

/**
* 店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class StoreCdModel {
  public StoreCdModel() {}

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
