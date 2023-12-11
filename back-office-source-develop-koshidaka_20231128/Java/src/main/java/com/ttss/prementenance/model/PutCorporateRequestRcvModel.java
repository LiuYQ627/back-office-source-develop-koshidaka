package com.ttss.prementenance.model;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
* 企業マスタ更新 リクエストボディ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutCorporateRequestRcvModel {

  /**
   * 企業情報.
   */
  @NotNull
  @Valid
  private List<CorporateInfoUpdateRequestModel> corporateInfos;

  /**
   * マスタ新規フラグ.
   */
  private boolean isMasterCreate;

  /**
   * 企業情報ゲッター.
   *
   * @return 企業情報
   */
  public List<CorporateInfoUpdateRequestModel> getCorporateInfos() {
    return corporateInfos;
  }

  /**
   * 企業情報セッター.
   *
   * @param corporateInfos 企業情報
   */
  public void setCorporateInfos(List<CorporateInfoUpdateRequestModel> corporateInfos) {
    this.corporateInfos = corporateInfos;
  }
  
  /**
   * マスタ新規フラグゲッター.
   *
   * @return 全検索フラグ
   */
  public boolean getIsMasterCreate() {
    return isMasterCreate;
  }

  /**
   * マスタ新規フラグセッター.
   *
   * @param isMasterCreate マスタ新規フラグ
   */
  public void setIsMasterCreate(boolean isMasterCreate) {
    this.isMasterCreate = isMasterCreate;
  }
}
