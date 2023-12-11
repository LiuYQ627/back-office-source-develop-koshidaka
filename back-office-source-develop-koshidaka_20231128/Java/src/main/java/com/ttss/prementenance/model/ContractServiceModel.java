package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
* 契約サービス情報 データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class ContractServiceModel {
  public ContractServiceModel() {}

  /**
   * 契約サービス親コード.
   */
  private String contractServiceParentCd;
  /**
   * 店舗コードリスト.
   */
  private List<StoreCdModel> storeCds;

  /**
   * 契約サービス親コードゲッター.
   *
   * @return 契約サービス親コード
   */
  public String getContractServiceParentCd() {
    return contractServiceParentCd;
  }

  /**
   * 契約サービス親コードセッター.
   *
   * @param contractServiceParentCd 契約サービス親コード
   */
  public void setContractServiceParentCd(String contractServiceParentCd) {
    this.contractServiceParentCd = contractServiceParentCd;
  }

  /**
   * 店舗コードリストゲッター.
   *
   * @return 店舗コードリスト
   */
  public List<StoreCdModel> getStoreCds() {
    return storeCds;
  }

  /**
   * 店舗コードリストセッター.
   *
   * @param storeCds 店舗コードリスト
   */
  public void setStoreCds(List<StoreCdModel> storeCds) {
    this.storeCds = storeCds;
  }
}
