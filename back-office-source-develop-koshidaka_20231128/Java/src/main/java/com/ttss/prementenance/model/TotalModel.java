package com.ttss.prementenance.model;

/**
 * 売上合計データモデル.
 * 
 * @author 1170523
 * @version 1.0.0
 *
 */
public class TotalModel {
  private Integer amount;
  private Integer unitCount;
  
  /**
   * 合計金額取得.
   * @return amount
   */
  public Integer getAmount() {
    return amount;
  }
  
  /**
   * 合計金額設定.
   * @param amount セットする amount
   */
  public void setAmount(Integer amount) {
    this.amount = amount;
  }
  
  /**
   * 合計点数取得.
   * @return unitCount
   */
  public Integer getUnitCount() {
    return unitCount;
  }
  
  /**
   * 合計点数設定.
   * @param unitCount セットする unitCount
   */
  public void setUnitCount(Integer unitCount) {
    this.unitCount = unitCount;
  }
}
