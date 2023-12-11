package com.ttss.prementenance.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
* 拡張リスト情報 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsPriceExtendsModel {
  public ConfigurationsPriceExtendsModel() {}

  /**
   * 拡張
   */
  @JsonIgnore
  @JsonProperty("extends")
  private Boolean priceExtends;

  /**
   * 拡張ゲッター.
   *
   * @return グループ
   */
  public Boolean getExtends() {
    return priceExtends;
  }

  /**
   * 拡張セッター.
   *
   * @param priceExtends 拡張
   */
  public void setExtends(Boolean priceExtends) {
    this.priceExtends = priceExtends;
  }


  /**
   * リスト
   */
  private List<ConfigurationsPriceExtendsDetailModel> list;

  /**
   * リストゲッター.
   *
   * @return リスト
   */
  public List<ConfigurationsPriceExtendsDetailModel> getList() {
    return list;
  }

  /**
   * リストセッター.
   *
   * @param list サブグループ
   */
  public void setList(List<ConfigurationsPriceExtendsDetailModel> list) {
    this.list = list;
  }

}
