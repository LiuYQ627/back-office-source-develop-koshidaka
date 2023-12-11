package com.ttss.prementenance.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
* パスワード更新API リクエストボディ データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PutPwUpdateRequestBodyModel {

  public PutPwUpdateRequestBodyModel() {}

  /**
   * パスワード情報.
   */
  @NotNull
  @Valid
  private PassInfoModel passInfo;

  /**
   * パスワード情報ゲッター.
   * 
   * @return パスワード情報
   */
  public PassInfoModel getPassInfo() {
    return passInfo;
  }

  /**
   * パスワード情報セッター.
   * 
   * @param passInfo パスワード情報
   */
  public void setPassInfo(PassInfoModel passInfo) {
    this.passInfo = passInfo;
  }

}
