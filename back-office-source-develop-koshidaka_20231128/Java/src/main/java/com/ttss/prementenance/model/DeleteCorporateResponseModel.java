package com.ttss.prementenance.model;

import lombok.Data;

/**
* 企業マスタ削除 レスポンス データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class DeleteCorporateResponseModel {

  public DeleteCorporateResponseModel() {}

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
