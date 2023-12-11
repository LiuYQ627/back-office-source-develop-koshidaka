package com.ttss.prementenance.model;

import lombok.Data;

/**
* パスワード更新API リクエストパラメータ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutPwUpdateRequestParamModel {

  public PutPwUpdateRequestParamModel() {}

  /**
   * 企業コード.
   */
  private String businessUnitCdStr;
  
  /**
   * ユーザID.
   */
  private String userId;

  /**
   * ユーザIDゲッター.
   * 
   * @return ユーザID
   */
  public String getUserId() {
    return userId;
  }

  /**
   * ユーザIDセッター.
   * 
   * @param userId ユーザID
   */
  public void setUserId(String userId) {
    this.userId = userId;
  }

  /**
   * 企業コードゲッター.
   * 
   * @return 企業コード
   */
  public String getBusinessUnitCdStr() {
    return businessUnitCdStr;
  }

  /**
   * 企業コードセッター.
   * 
   * @param businessUnitCdStr 企業コード
   */
  public void setBusinessUnitCdStr(String businessUnitCdStr) {
    this.businessUnitCdStr = businessUnitCdStr;
  }
}
