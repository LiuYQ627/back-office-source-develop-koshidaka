package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 変更計画情報 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsChangePlanModel {
  public ConfigurationsChangePlanModel() {}

  /**
   * グループ.
   */
  private Boolean deleted;

  /**
   * グループゲッター.
   *
   * @return グループ
   */
  public Boolean getDeleted() {
    return deleted;
  }

  /**
   * グループセッター.
   *
   * @param group グループ
   */
  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }


  /**
   * グループ.
   */
  private Integer referenceVersion;

  /**
   * グループゲッター.
   *
   * @return グループ
   */
  public Integer getReferenceVersion() {
    return referenceVersion;
  }

  /**
   * グループセッター.
   *
   * @param group グループ
   */
  public void setReferenceVersion(Integer referenceVersion) {
    this.referenceVersion = referenceVersion;
  }

  /**
   * グループ.
   */
  private String referenceId;

  /**
   * グループゲッター.
   *
   * @return グループ
   */
  public String getReferenceId() {
    return referenceId;
  }

  /**
   * グループセッター.
   *
   * @param group グループ
   */
  public void setReferenceId(String referenceId) {
    this.referenceId = referenceId;
  }

  /**
   * グループ.
   */
  private String name;

  /**
   * グループゲッター.
   *
   * @return グループ
   */
  public String getName() {
    return name;
  }

  /**
   * グループセッター.
   *
   * @param group グループ
   */
  public void setName(String name) {
    this.name = name;
  }
}
