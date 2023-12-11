package com.ttss.prementenance.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
* ログインAPI リクエストボディ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutUserLoginRequestBodyModel {

  public PutUserLoginRequestBodyModel() {}

  /**
   * ログイン情報.
   */
  @NotNull
  @Valid
  private LoginInfoModel loginInfo;

  /**
   * ログイン情報ゲッター.
   * 
   * @return ログイン情報
   */
  public LoginInfoModel getLoginInfo() {
    return loginInfo;
  }

  /**
   * ログイン情報セッター.
   * 
   * @param loginInfo ログイン情報
   */
  public void setLoginInfo(LoginInfoModel loginInfo) {
    this.loginInfo = loginInfo;
  }

}
