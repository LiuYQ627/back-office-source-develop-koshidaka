package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル名称 レスポンス データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetHelpPdfNameResponseModel {

  public GetHelpPdfNameResponseModel() {}
  

  /**
   * PDFファイル名称.
   */
  private String helpPdfFileName;
  
  /**
   * PDFファイル名称ゲッター.
   * 
   * @return PDFファイル名称
   */
  public String getHelpPdfFileName() {
    return helpPdfFileName;
  }
  
  /**
   * PDFファイル名称セッター.
   * 
   * @param helpPdfFileName PDFファイル名称
   */
  public void setHelpPdfFileName(String helpPdfFileName) {
    this.helpPdfFileName = helpPdfFileName;
  }

}
