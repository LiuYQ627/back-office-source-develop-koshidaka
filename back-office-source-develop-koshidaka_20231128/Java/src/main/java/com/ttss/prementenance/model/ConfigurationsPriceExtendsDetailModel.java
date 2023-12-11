package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 金額情報詳細 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsPriceExtendsDetailModel {
  public ConfigurationsPriceExtendsDetailModel() {}

  /**
   * リスト名
   */
  private String priceListName;

  /**
   * リスト名ゲッター.
   *
   * @return リスト名
   */
  public String getPriceListName() {
    return priceListName;
  }

  /**
   * リスト名セッター.
   *
   * @param group リスト名
   */
  public void setPriceListName(String priceListName) {
    this.priceListName = priceListName;
  }


  /**
   * 数量グループ.
   */
  private Integer order;

  /**
   * 数量ゲッター.
   *
   * @return 数量
   */
  public Integer getOrder() {
    return order;
  }

  /**
   * 数量セッター.
   *
   * @param order 数量
   */
  public void setOrder(Integer order) {
    this.order = order;
  }

}
