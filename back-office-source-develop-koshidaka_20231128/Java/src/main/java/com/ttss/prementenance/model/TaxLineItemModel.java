package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 税情報データモデル.
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class TaxLineItemModel {
  /**
   * 税種別.
   */
  @JsonProperty("TaxKind")
  private Integer taxKind;
  /**
   * 税率.
   */
  @JsonProperty("TaxPercent")
  private Integer taxPercent;

  /**
   * 税種別取得.
   * @return taxKind
   */
  public Integer getTaxKind() {
    return taxKind;
  }
  
  /**
   * 税種別取得.
   * @param taxKind セットする taxKind
   */
  public void setTaxKind(Integer taxKind) {
    this.taxKind = taxKind;
  }
  
  /**
   * 税率取得.
   * @return taxPercent
   */
  public Integer getTaxPercent() {
    return taxPercent;
  }
  
  /**
   * 税率設定.
   * @param taxPercent セットする taxPercent
   */
  public void setTaxPercent(Integer taxPercent) {
    this.taxPercent = taxPercent;
  }


}
