package com.ttss.prementenance.model;

import lombok.Data;

/**
 * ユーザマスタ更新 レスポンス データモデル.
 * @author TSS 早川 剛生
 * @version 1.0.0
 */
@Data
public class PutUserResponseModel {

  public PutUserResponseModel() {}

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
