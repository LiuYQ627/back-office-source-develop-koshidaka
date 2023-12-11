package com.ttss.prementenance.model;

import lombok.Data;

/**
* 共通APIレスポンスモデル (Error).
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/

@Data
public class ApiCommonErrorResponseModel {

  public ApiCommonErrorResponseModel() {}

  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result;

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

}
