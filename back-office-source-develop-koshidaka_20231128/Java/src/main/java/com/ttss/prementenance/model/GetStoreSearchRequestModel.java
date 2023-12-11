package com.ttss.prementenance.model;

import lombok.Data;

/**
* 機能概要：店舗マスタ検索(共通デザイン) リクエストパラメータ データモデル.
* 
* @author TSS 小山田 峻登
* @version 1.0.0
*/
@Data
public class GetStoreSearchRequestModel {

  public GetStoreSearchRequestModel() {}

  /**
   * コンストラクタ.
   * 
   * @param isAllStoreMaster 全店舗取得フラグ
   */
  public GetStoreSearchRequestModel(Boolean isAllStoreMaster) {
    this.isAllStoreMaster = isAllStoreMaster;
  }

  /**
   * 全店舗取得フラグ.
   */
  private Boolean isAllStoreMaster;

  /**
   * 全店舗取得フラグゲッター.
   * 
   * @return 全店舗取得フラグ
   */
  public Boolean getIsAllStoreMaster() {
    return isAllStoreMaster;
  }

  /**
   * 全店舗取得フラグセッター.
   * 
   * @param isAllStoreMaster 全店舗取得フラグ
   */
  public void setIsAllStoreMaster(Boolean isAllStoreMaster) {
    this.isAllStoreMaster = isAllStoreMaster;
  }
}
