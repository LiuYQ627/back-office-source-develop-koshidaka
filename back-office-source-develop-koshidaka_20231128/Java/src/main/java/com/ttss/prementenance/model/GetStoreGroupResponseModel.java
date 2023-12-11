package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
* 機能概要：店舗グループマスタ検索 レスポンス データモデル.
* 
* @author TSS 小山田 峻登
* @version 1.0.0
*/
@Data
public class GetStoreGroupResponseModel {

  public GetStoreGroupResponseModel() {}

  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result;

  /**
   * 店舗グループ情報.
   */
  private List<StoreGrpupModel> storeGroupInfos;

  /**
   * 実行結果ゲッター.
   * 
   * @return 実行結果
   */
  public ApiCommonResponseModel getResult() {
    return result;
  }

  /**
   * 実行結果セッター.
   * 
   * @param result 実行結果
   */
  public void setResult(ApiCommonResponseModel result) {
    this.result = result;
  }

  /**
   * 店舗グループ情報ゲッター.
   * 
   * @return 店舗グループ情報
   */
  public List<StoreGrpupModel> getStoreGroupInfos() {
    return storeGroupInfos;
  }

  /**
   * 店舗グループセッター.
   * 
   * @param storeGroupInfos 店舗グループ情報
   */
  public void setStoreGroupInfos(List<StoreGrpupModel> storeGroupInfos) {
    this.storeGroupInfos = storeGroupInfos;
  }

}
