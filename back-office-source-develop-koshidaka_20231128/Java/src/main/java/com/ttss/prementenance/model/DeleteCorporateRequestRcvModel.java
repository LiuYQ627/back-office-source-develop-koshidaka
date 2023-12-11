package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 企業マスタ削除 リクエストパラメータ データモデル.
 *
 * @author TSS 早川　剛生
 * @version 1.0.0
 */
@Data
public class DeleteCorporateRequestRcvModel {

  public DeleteCorporateRequestRcvModel() {}

  /**
   * 企業コード.
   */
  @NotEmpty
  private String businessUnitCd;

  /**
   * 変更計画バージョン.
   */
  private Integer referenceVersion;

  /**
   * 変更計画名称.
   */
  private String changePlanName;
  
  /**
   * 企業コードゲッター.
   *
   * @return 企業コード
   */
  public String getBusinessUnitCd() {
    return businessUnitCd;
  }

  /**
   * 企業コードセッター.
   *
   * @param businessUnitCd 企業コード
   */
  public void setBusinessUnitCd(String businessUnitCd) {
    this.businessUnitCd = businessUnitCd;
  }
  
  /**
   * 変更計画バージョンゲッター.
   *
   * @return 変更計画バージョン
   */
  public Integer getReferenceVersion() {
    return referenceVersion;
  }
  
  /**
   * 変更計画バージョンセッター.
   *
   * @param referenceVersion 変更計画バージョン
   */
  public void setReferenceVersion(Integer referenceVersion) {
    this.referenceVersion = referenceVersion;
  }

  /**
   * 変更計画名称ゲッター.
   *
   * @return 変更計画名称
   */
  public String getChangePlanName() {
    return changePlanName;
  }
  
  /**
   * 変更計画名称セッター.
   *
   * @param changePlanName 変更計画名称
   */
  public void setChangePlanName(String changePlanName) {
    this.changePlanName = changePlanName;
  }

}
