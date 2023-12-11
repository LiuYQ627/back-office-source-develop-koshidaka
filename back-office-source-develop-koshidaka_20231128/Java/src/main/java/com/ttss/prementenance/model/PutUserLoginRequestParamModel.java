package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

/**
* ログインAPI リクエストパラメータ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutUserLoginRequestParamModel {

  public PutUserLoginRequestParamModel() {}

  /**
   * 企業コード.
   */
  @NotEmpty
  @Size(min = 1, max = 15)
  @Pattern(regexp = "^[0-9]*$", message = "{validation.Pattern.Num.message}")
  private String businessUnitCdStr;

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
