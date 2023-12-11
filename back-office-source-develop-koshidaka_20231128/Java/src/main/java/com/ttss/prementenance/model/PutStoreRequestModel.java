package com.ttss.prementenance.model;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
* 店舗マスタ更新 リクエストボディ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutStoreRequestModel {

  /**
   * 店舗情報.
   */
  @NotNull
  @Valid
  private List<StoreInfoUpdateRequestModel> stores;

  /**
   * 店舗情報ゲッター.
   * 
   * @return 店舗情報
   */
  public List<StoreInfoUpdateRequestModel> getStores() {
    return stores;
  }

  /**
   * 店舗情報セッター.
   * 
   * @param stores 店舗情報
   */
  public void setStores(List<StoreInfoUpdateRequestModel> stores) {
    this.stores = stores;
  }

}
