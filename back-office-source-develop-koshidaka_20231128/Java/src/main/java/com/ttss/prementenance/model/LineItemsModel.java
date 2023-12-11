package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 登録明細データモデル.
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class LineItemsModel {
  
  @JsonProperty("LineItemSequenceNumber")
  private Integer lineItemSequenceNumber;
  
  private boolean voidFlag;
  
  private boolean change;
  
  @JsonProperty("SaleReturnLineItem")
  private SaleReturnLineItemModel saleReturnLineItem;
  
  @JsonProperty("TaxLineItem")
  private TaxLineItemModel taxLineItem;
  
  private boolean highlight;
  
  private int attention;

  /**
   * 商品明細の取消区分取得.
   * @return voidFlag
   */
  public boolean isVoidFlag() {
    return voidFlag;
  }

  /**
   * 商品明細の取消区分設定.
   * @param voidFlag セットする voidFlag
   */
  public void setVoidFlag(boolean voidFlag) {
    this.voidFlag = voidFlag;
  }

  /**
   * 変更対象フラグ取得.
   * @return change
   */
  public boolean isChange() {
    return change;
  }

  /**
   * 変更対象フラグ設定.
   * @param change セットする change
   */
  public void setChange(boolean change) {
    this.change = change;
  }

  /**
   * シーケンスNo取得.
   * @return lineItemSequenceNumber
   */
  public Integer getLineItemSequenceNumber() {
    return lineItemSequenceNumber;
  }

  /**
   * シーケンスNo設定.
   * @param lineItemSequenceNumber セットする lineItemSequenceNumber
   */
  public void setLineItemSequenceNumber(Integer lineItemSequenceNumber) {
    this.lineItemSequenceNumber = lineItemSequenceNumber;
  }

  /**
   * ハイライトフラグの設定.
   * @return highlight
   */
  public boolean isHighlight() {
    return highlight;
  }

  /**
   * ハイライトグラグの取得.
   * @param highlight セットする highlight
   */
  public void setHighlight(boolean highlight) {
    this.highlight = highlight;
  }

  /**
   * アテンションマークの設定.
   * @return attention
   */
  public int getAttention() {
    return attention;
  }

  /**
   * アテンションマークの取得.
   * @param attention セットする attention
   */
  public void setAttention(int attention) {
    this.attention = attention;
  }
}
