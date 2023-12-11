package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 商品情報データモデル.
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class SaleReturnLineItemModel {
  private long itemId;
  
  @JsonProperty("POSItemID1")
  private String posItemId1;
  
  @JsonProperty("POSItemID2")
  private String posItemId2;
  
  @JsonProperty("ExtendedAmount")
  private Integer extendedAmount;

  @JsonProperty("RegularUnitPrice")
  private Integer regularUnitPrice;
  
  @JsonProperty("RegularUnitPriceQuantity")
  private Integer regularUnitPriceQuantity;
  
  private String name;
  private boolean mixAndMatch;
  private boolean ageVerification;
  private boolean noMaster;
  private boolean zeroPrice;
  private boolean code128;
  
  /**
   * 商品コード取得.
   * @return itemId
   */
  public long getItemId() {
    return itemId;
  }
  
  /**
   * 商品コード設定.
   * @param itemId セットする itemId
   */
  public void setItemId(long itemId) {
    this.itemId = itemId;
  }
  
  /**
   * スキャンバーコード1取得.
   * @return pOSItemID1
   */
  public String getPosItemId1() {
    return posItemId1;
  }
  
  /**
   * スキャンバーコード1設定.
   * @param posItemId1 セットする posItemId1
   */
  public void setPosItemId1(String posItemId1) {
    this.posItemId1 = posItemId1;
  }
  
  /**
   * スキャンバーコード2取得.
   * @return pOSItemID2
   */
  public String getPosItemId2() {
    return posItemId2;
  }
  
  /**
   * スキャンバーコード2設定.
   * @param posItemId2 セットする posItemId2
   */
  public void setPosItemId2(String posItemId2) {
    this.posItemId2 = posItemId2;
  }
  
  /**
   * 金額（点数×単価）取得.
   * @return extendedAmount
   */
  public Integer getExtendedAmount() {
    return extendedAmount;
  }
  
  /**
   * 金額（点数×単価）設定.
   * @param extendedAmount セットする extendedAmount
   */
  public void setExtendedAmount(Integer extendedAmount) {
    this.extendedAmount = extendedAmount;
  }
  
  /**
   * 単価取得.
   * @return regularUnitPrice
   */
  public Integer getRegularUnitPrice() {
    return regularUnitPrice;
  }
  
  /**
   * 単価設定.
   * @param regularUnitPrice セットする regularUnitPrice
   */
  public void setRegularUnitPrice(Integer regularUnitPrice) {
    this.regularUnitPrice = regularUnitPrice;
  }
  
  /**
   * 点数取得.
   * @return regularUnitPriceQuantity
   */
  public Integer getRegularUnitPriceQuantity() {
    return regularUnitPriceQuantity;
  }
  
  /**
   * 点数設定.
   * @param regularUnitPriceQuantity セットする regularUnitPriceQuantity
   */
  public void setRegularUnitPriceQuantity(Integer regularUnitPriceQuantity) {
    this.regularUnitPriceQuantity = regularUnitPriceQuantity;
  }
  
  /**
   * 商品名称取得.
   * @return name
   */
  public String getName() {
    return name;
  }
  
  /**
   * 商品名称設定.
   * @param name セットする name
   */
  public void setName(String name) {
    this.name = name;
  }
  
  /**
   * M&M商品区分取得.
   * @return mixAndMatch
   */
  public boolean isMixAndMatch() {
    return mixAndMatch;
  }
  
  /**
   * M&M商品区分設定.
   * @param mixAndMatch セットする mixAndMatch
   */
  public void setMixAndMatch(boolean mixAndMatch) {
    this.mixAndMatch = mixAndMatch;
  }
  
  /**
   * 年齢確認商品区分取得.
   * @return ageVerification
   */
  public boolean isAgeVerification() {
    return ageVerification;
  }
  
  /**
   * 年齢確認商品区分設定.
   * @param ageVerification セットする ageVerification
   */
  public void setAgeVerification(boolean ageVerification) {
    this.ageVerification = ageVerification;
  }
  
  /**
   * マスタ無商品区分取得.
   * @return noMaster
   */
  public boolean isNoMaster() {
    return noMaster;
  }
  
  /**
   * マスタ無商品区分設定.
   * @param noMaster セットする noMaster
   */
  public void setNoMaster(boolean noMaster) {
    this.noMaster = noMaster;
  }
  
  /**
   * ０円単価商品区分取得.
   * @return zeroPrice
   */
  public boolean isZeroPrice() {
    return zeroPrice;
  }
  
  /**
   * ０円単価商品区分設定.
   * @param zeroPrice セットする zeroPrice
   */
  public void setZeroPrice(boolean zeroPrice) {
    this.zeroPrice = zeroPrice;
  }
  
  /**
   * code128商品区分取得.
   * @return code128
   */
  public boolean isCode128() {
    return code128;
  }
  
  /**
   * code128商品区分設定.
   * @param code128 セットする code128
   */
  public void setCode128(boolean code128) {
    this.code128 = code128;
  }
  

}
