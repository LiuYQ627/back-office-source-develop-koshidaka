package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetHelpPdfRequestModel {

  public GetHelpPdfRequestModel() {}
  
  /**
   * コンストラクタ.
   * 
   *  @param helpPdfSearchName ヘルプ用PDFファイル検索名
   */
  public GetHelpPdfRequestModel(String helpPdfSearchName) {
    this.helpPdfSearchName = helpPdfSearchName;
  }

  /**
   * ヘルプ用PDFファイル検索名.
   */
  private String helpPdfSearchName;
  
  /**
   * ヘルプ用PDFファイル検索名ゲッター.
   * 
   * @return ヘルプ用PDFファイル検索名
   */
  public String getHelpPdfSearchName() {
    return helpPdfSearchName;
  }
  
  /**
   * ヘルプ用PDFファイル検索名セッター.
   * 
   * @param helpPdfSearchName ヘルプ用PDFファイル検索名
   */
  public void setHelpPdfSearchName(String helpPdfSearchName) {
    this.helpPdfSearchName = helpPdfSearchName;
  }
}
