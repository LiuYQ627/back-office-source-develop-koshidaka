package com.ttss.prementenance.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* POSオーダー価格 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsPosOrderModel {
  public ConfigurationsPosOrderModel() {}

  /**
   * 文字.
   */
  private String name;

  /**
   * 文字ゲッター.
   *
   * @return 文字
   */
  public String getName() {
    return name;
  }

  /**
   * 文字セッター.
   *
   * @param default クライアント種別
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * 値.
   */
  private List<ConfigurationsPosOrderColumnModel> value;

  /**
   * 値ゲッター.
   *
   * @return 値
   */
  public List<ConfigurationsPosOrderColumnModel> getValue() {
    return value;
  }

  /**
   * 値セッター.
   *
   * @param value 値
   */
  public void setValue(List<ConfigurationsPosOrderColumnModel> value) {
    this.value = value;
  }
}
