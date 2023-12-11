package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル レスポンス データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetHelpPdfResponseModel {

  public GetHelpPdfResponseModel() {}
  
  /**
   * 実行結果.
   */
  private ApiCommonResponseModel result;

  /**
   * PDFファイルパス.
   */
  private String preSigneUrl;
  
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
  
  /**
   * PDFファイルパスゲッター.
   * 
   * @return PDFファイル名
   */
  public String getPreSigneUrl() {
    return preSigneUrl;
  }
  
  /**
   * PDFファイルパスセッター.
   * 
   * @param preSigneUrl PDFファイルパス
   */
  public void setPreSigneUrl(String preSigneUrl) {
    this.preSigneUrl = preSigneUrl;
  }

}
