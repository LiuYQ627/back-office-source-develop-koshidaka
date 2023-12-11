package com.ttss.prementenance.model;

/**
* 機能概要：店舗グループマスタ検索 レスポンス 店舗グループ データモデル.
* 
* @author TSS 小山田 峻登
* @version 1.0.0
*/

public class StoreGrpupModel {
  public StoreGrpupModel() {}
  
  /**
   * 店舗グループ番号.
   */
  private short storeGroupNo;
  /**
   * 店舗グループ値.
   */
  private short storeGroupValue;
  /**
   * 店舗グループ値（文字列）.
   */
  private String storeGroupValueStr;
  /**
   * 店舗グループ名称.
   */
  private String storeGroupName;

  /**
   * 店舗グループ番号ゲッター.
   * 
   * @return 店舗グループ番号
   */
  public short getStoreGroupNo() {
    return storeGroupNo;
  }

  /**
   * 店舗グループ番号セッター.
   * 
   * @param storeGroupNo 店舗グループ番号
   */
  public void setStoreGroupNo(short storeGroupNo) {
    this.storeGroupNo = storeGroupNo;
  }

  /**
   * 店舗グループ値ゲッター.
   * 
   * @return 店舗グループ値
   */
  public short getStoreGroupValue() {
    return storeGroupValue;
  }

  /**
   * 店舗グループ値セッター.
   * 
   * @param storeGroupValue 店舗グループ値
   */
  public void setStoreGroupValue(short storeGroupValue) {
    this.storeGroupValue = storeGroupValue;
  }

  /**
   * 店舗グループ値（文字列）ゲッター.
   * 
   * @return 店舗グループ値（文字列）
   */
  public String getStoreGroupValueStr() {
    return storeGroupValueStr;
  }

  /**
   * 店舗グループ値（文字列）セッター.
   * 
   * @param storeGroupValueStr 店舗グループ値（文字列）
   */
  public void setStoreGroupValueStr(String storeGroupValueStr) {
    this.storeGroupValueStr = storeGroupValueStr;
  }

  /**
   * 店舗グループ値（文字列）ゲッター.
   * 
   * @return 店舗グループ値（文字列）
   */
  public String getStoreGroupName() {
    return storeGroupName;
  }

  public void setStoreGroupName(String storeGroupName) {
    this.storeGroupName = storeGroupName;
  }
}
