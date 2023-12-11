package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * 売上トランデータモデル.
 * @author TSS 廣田 敏明
 * @version 1.0.0
 *
 */
public class RetailTransactionModel {
  @JsonProperty("locationID")
  private Integer locationId;
  private String customerId;
  @JsonProperty("loyaltyAccountID")
  private String loyaltyAccountId;
  private TotalModel total;
  private List<LineItemsModel> lineItems;
  
  /**
   * 店舗ID取得.
   * @return locationID
   */
  public Integer getLocationId() {
    return locationId;
  }
  
  /**
   * 店舗ID設定.
   * @param locationId セットする locationId
   */
  public void setLocationId(Integer locationId) {
    this.locationId = locationId;
  }
  
  /**
   * 顧客ID取得.
   * @return customerId
   */
  public String getCustomerId() {
    return customerId;
  }
  
  /**
   * 顧客ID設定.
   * @param customerId セットする customerId
   */
  public void setCustomerId(String customerId) {
    this.customerId = customerId;
  }
  
  /**
   * 会員番号取得.
   * @return loyaltyAccountID
   */
  public String getLoyaltyAccountId() {
    return loyaltyAccountId;
  }
  
  /**
   * 会員番号設定.
   * @param loyaltyAccountId セットする loyaltyAccountId
   */
  public void setLoyaltyAccountId(String loyaltyAccountId) {
    this.loyaltyAccountId = loyaltyAccountId;
  }
  
  /**
   * 売上合計取得.
   * @return total
   */
  public TotalModel getTotal() {
    return total;
  }
  
  /**
   * 売上合計設定.
   * @param total セットする total
   */
  public void setTotal(TotalModel total) {
    this.total = total;
  }
  
  /**
   * 商品リスト取得.
   * @return lineItems
   */
  public List<LineItemsModel> getLineItems() {
    return lineItems;
  }
  
  /**
   * 商品リスト設定.
   * @param lineItems セットする lineItems
   */
  public void setLineItems(List<LineItemsModel> lineItems) {
    this.lineItems = lineItems;
  }
}
