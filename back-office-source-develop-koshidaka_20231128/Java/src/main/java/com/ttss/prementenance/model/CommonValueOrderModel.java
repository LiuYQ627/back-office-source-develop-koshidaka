package com.ttss.prementenance.model;

import lombok.Data;

/**
* 共通エリア情報 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
public class CommonValueOrderModel {
  public CommonValueOrderModel() {}

  /**
   * オーダー.
   */
  private Integer order;

  /**
   * オーダーゲッター.
   *
   * @return オーダー
   */
  public Integer getOrder() {
    return order;
  }

  /**
   * オーダーセッター.
   *
   * @param order オーダー
   */
  public void setOrder(Integer order) {
    this.order = order;
  }

  
  /**
   * 文字列値
   */
  private String value;

  /**
   * 文字列値ゲッター.
   *
   * @return 文字列値
   */
  public String getValue() {
    return value;
  }

  /**
   * 文字列値セッター.
   *
   * @param value 文字列値
   */
  public void setValue(String value) {
    this.value = value;
  }


}
