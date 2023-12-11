package com.ttss.prementenance.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 店舗情報 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsCatalogModel {
  public ConfigurationsCatalogModel() {}

  /**
   * グループ.
   */
  private String group;

  /**
   * グループゲッター.
   *
   * @return グループ
   */
  public String getGroup() {
    return group;
  }

  /**
   * グループセッター.
   *
   * @param group グループ
   */
  public void setGroup(String group) {
    this.group = group;
  }


  /**
   * サブグループ.
   */
  private String subGroup;

  /**
   * サブグループゲッター.
   *
   * @return サブグループ
   */
  public String getSubGroup() {
    return subGroup;
  }

  /**
   * サブグループセッター.
   *
   * @param subGroup サブグループ
   */
  public void setSubGroup(String subGroup) {
    this.subGroup = subGroup;
  }


  /**
   * タイプ.
   */
  private String type;

  /**
   * タイプゲッター.
   *
   * @return タイプ
   */
  public String getType() {
    return type;
  }

  /**
   * タイプセッター.
   *
   * @param type タイプ
   */
  public void setType(String type) {
    this.type = type;
  }


  /**
   * エントリータイプ.
   */
  private String entryType;

  /**
   * エントリータイプゲッター.
   *
   * @return エントリータイプ
   */
  public String getEntryType() {
    return entryType;
  }

  /**
   * エントリータイプセッター.
   *
   * @param entryType エントリータイプ
   */
  public void setEntryType(String entryType) {
    this.entryType = entryType;
  }

  
  /**
   * 説明.
   */
  private CommonDefaultModel description;

  /**
   * 説明ゲッター.
   *
   * @return 説明
   */
  public CommonDefaultModel getDescription() {
    return description;
  }

  /**
   * 説明セッター.
   *
   * @param description 説明
   */
  public void setDescription(CommonDefaultModel description) {
    this.description = description;
  }  
  

  /**
   * 継承.
   */
  private Boolean inherited;

  /**
   * 継承ゲッター.
   *
   * @return 継承
   */
  public Boolean getInherited() {
    return inherited;
  }

  /**
   * 継承セッター.
   *
   * @param inherited 継承
   */
  public void setInherited(Boolean inherited) {
    this.inherited = inherited;
  }


  /**
   * 名称.
   */
  private String name;

  /**
   * 名称ゲッター.
   *
   * @return 名称
   */
  public String getName() {
    return name;
  }

  /**
   * 名称セッター.
   *
   * @param name 名称
   */
  public void setName(String name) {
    this.name = name;
  }


  /**
   * 設定値.
   */
  private List<CommonValueOrderModel> value;

  /**
   * 設定値ゲッター.
   *
   * @return 設定値
   */
  public List<CommonValueOrderModel> getValue() {
    return value;
  }

  /**
   * 設定値セッター.
   *
   * @param value 設定値
   */
  public void setValue(List<CommonValueOrderModel> value) {
    this.value = value;
  }

  /**
   * バージョン.
   */
  private Integer version;	

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

}
