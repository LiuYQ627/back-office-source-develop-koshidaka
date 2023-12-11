package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
* 店舗マスタ検索 レスポンス データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class GetStoreResponseModel {

  public GetStoreResponseModel() {}

  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result;
  /**
   * 店舗情報.
   */
  private List<StoreInfoModel> storeInfos;

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
   * 店舗情報ゲッター.
   * @return 店舗情報
   */
  public List<StoreInfoModel> getStoreInfos() {
    return storeInfos;
  }

  /**
   * 店舗情報セッター.
   * @param storeInfos 店舗情報
   */
  public void setStoreInfos(List<StoreInfoModel> storeInfos) {
    this.storeInfos = storeInfos;
  }

}
