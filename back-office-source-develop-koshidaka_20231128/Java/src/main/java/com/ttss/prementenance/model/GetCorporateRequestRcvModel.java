package com.ttss.prementenance.model;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

/**
* 企業マスタ検索 リクエストパラメータ データモデル.
*
* @author TSS 早川　剛生
* @version 1.0.0
*/
@Data
public class GetCorporateRequestRcvModel {

  public GetCorporateRequestRcvModel() {}

  /**
   * コンストラクタ.
   *
   * @param allFlg 全検索フラグ
   */
  public GetCorporateRequestRcvModel(Integer allFlg) {
    this.allFlg = allFlg;
  }

  /**
   * 全検索フラグ.
   */
  @Range(min = 0, max = 1)
  private Integer allFlg;

  /**
   * 企業コード.
   */
  @Size(min = 15, max = 15, message = "{validation.Size.custom.fixed_length.message}")
  private String businessUnitCd;

  /**
   * 全検索フラグゲッター.
   *
   * @return 全検索フラグ
   */
  public Integer getAllFlg() {
    return allFlg;
  }

  /**
   * 全検索フラグセッター.
   *
   * @param allFlg 店全検索フラグ舗コード
   */
  public void setAllFlg(Integer allFlg) {
    this.allFlg = allFlg;
  }

  /**
   * 企業コードゲッター.
   *
   * @return 企業コード
   */
  public String makeBusinessUnitCd() {
    return businessUnitCd;
  }
  
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
}
