package com.ttss.prementenance.model;

/**
 * ヘルプ用PDFファイル名マッピング データモデル.
 *
 * @author TSS 向谷地　那望
 * @version 1.0.0
 */
public class HelpPdfFileNameMappingModel {
  public HelpPdfFileNameMappingModel() {
  }

  /**
   * 画面ID名.
   */
  private String helpPdfSearchName;

  /**
   * PDFファイル名.
   */
  private String pdfFileName;

  /**
   * 画面ID名ゲッター.
   * 
   * @return 画面ID名.
   */
  public String getHelpPdfSearchName() {
    return helpPdfSearchName;
  }

  /**
   * 画面ID名セッター.
   * 
   * @param helpPdfSearchName 画面ID名
   */
  public void setHelpPdfSearchName(String helpPdfSearchName) {
    this.helpPdfSearchName = helpPdfSearchName;
  }

  /**
   * PDFファイル名ゲッター.
   * 
   * @return PDFファイル名
   */
  public String getPdfFileName() {
    return this.pdfFileName;
  }

  /**
   * PDFファイル名セッター.
   * 
   * @param pdfFileName PDFファイル名
   */
  public void setPdfFileName(String pdfFileName) {
    this.pdfFileName = pdfFileName;
  }
}
