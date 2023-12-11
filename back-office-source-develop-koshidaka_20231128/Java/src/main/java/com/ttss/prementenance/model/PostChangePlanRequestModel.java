package com.ttss.prementenance.model;

import lombok.Data;

/**
* 変更計画の一覧取得 リクエストパラメータ データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
public class PostChangePlanRequestModel {
  public PostChangePlanRequestModel() {}
  
  /**
   * バージョン.
   */
  private Integer version;

  /**
   * 変更計画名称.
   */
  private String name;
  /**
   * 変更計画ステータス.
   */
  private String status;
  /**
   * フリーテキスト.
   */
  private String notes;

  /**
   * バージョンゲッター.
   *
   * @return バージョン
   */
  public Integer getVersion() {
    return version;
  }

  /**
   * バージョンセッター.
   *
   * @param version バージョン
   */
  public void setVersion(Integer version) {
    this.version = version;
  }

  /**
   * ステータスゲッター.
   *
   * @return ステータス
   */
  public String getStatus() {
    return status;
  }

  /**
   * ステータスセッター.
   *
   * @param status ステータス
   */
  public void setStatus(String status) {
    this.status = status;
  }
  

  /**
   * フリーテキストゲッター.
   *
   * @return フリーテキスト
   */
  public String getNotes() {
    return notes;
  }

  /**
   * フリーテキストセッター.
   *
   * @param notes フリーテキスト
   */
  public void setNotes(String notes) {
    this.notes = notes;
  }
  
  /**
   * 変更計画名称..
   *
   * @return 変更計画名称..
   */
  public String getName() {
    return name;
  }

  /**
   * 変更計画名称..
   *
   * @param status 変更計画名称..
   */
  public void setName(String name) {
    this.name = name;
  }
  
}
