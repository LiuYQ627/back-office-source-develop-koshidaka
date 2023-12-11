package com.ttss.prementenance.model;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

/**
* 店舗マスタ検索 リクエストパラメータ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class GetStoreRequestRcvModel {

  public GetStoreRequestRcvModel() {}

  /**
   * 店舗コード(受信用文字列型).
   */
  @Size(min = 1, max = 6)
  @Pattern(regexp = "^[0-9]*$", message = "{validation.Pattern.custom.StoreCd.message}")
  private String storeCd;

  /**
   * 店舗コード(文字列).
   */
  @Size(max = 6, message = "{validation.Size.MaxDigitNumber.message}")
  @Pattern(regexp = "^[0-9]*$", message = "{validation.Pattern.custom.StoreCd.message}")
  private String storeCdStr;

  /**
   * 名称.
   */
  private String name;

  /**
   * 店舗コードゲッター.
   * 
   * @return 店舗コード
   */
  public String getStoreCd() {
    return storeCd;
  }

  /**
   * 店舗コードセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setStoreCd(String storeCd) {
    this.storeCd = storeCd;
  }

  /**
   * 店舗コード(文字列)ゲッター.
   * 
   * @return 店舗コード(文字列)
   */
  public String getStoreCdStr() {
    return storeCdStr;
  }

  /**
   * 店舗コード(文字列)セッター.
   * 
   * @param storeCdStr 店舗コード(文字列)
   */
  public void setStoreCdStr(String storeCdStr) {
    this.storeCdStr = storeCdStr;
  }

  /**
   * 名称ゲッター.
   * 
   * @return 名称
   */
  public String getName() {
    return name;
  }

  /**
   * 名称セッター.
   * 
   * @param name 名称
   */
  public void setName(String name) {
    this.name = name;
  }
}
