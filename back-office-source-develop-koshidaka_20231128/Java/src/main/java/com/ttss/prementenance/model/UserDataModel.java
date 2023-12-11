package com.ttss.prementenance.model;

import java.util.List;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230214 xu.jh(Neusoft)    G001.00.0  issue課題#1054を対応します.
 * 20230302 xu.jh(Neusoft)    G002.00.0  issue課題#1038を対応します.
 */

/**
* ユーザデータ情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
public class UserDataModel {
  public UserDataModel() {}

  /**
   * コンストラクタ.
   * 
   * @param userCode ユーザコード
   * @param userName ユーザ名
   * @param role ロール
   */
   // G001.00.0 Update-start
  // public UserDataModel(String userCode, String userName, String businessUnitName, String belongStoreCd,
  //     String belongStoreName, String applicationVersion, Integer role, String businessUnitCdStr) {
  public UserDataModel(String userCode, String userName, String businessUnitName, String belongStoreCd,
      String belongStoreName, String applicationVersion, Integer role, String businessUnitCdStr, String permissions) {
    // G001.00.0 Update-end
    this.userCode = userCode;
    this.userName = userName;
    this.businessUnitName = businessUnitName;
    this.businessUnitCdStr = businessUnitCdStr;
    this.belongStoreCd = belongStoreCd;
    this.belongStoreName = belongStoreName;
    this.applicationVersion = applicationVersion;
    // G001.00.0 Add-start
    this.permissions = permissions;
    // G001.00.0 Add-end
  }

  /**
   * ユーザコード.
   */
  private String userCode;

  /**
   * ユーザ名.
   */
  private String userName;


  /**
   * 企業コード.
   */
  private String businessUnitCdStr;
  
  /**
   * 企業名.
   */
  private String businessUnitName;
  
  /**
   * 所属店舗.
   */
  private String belongStoreCd;
  
  /**
   * (所属)店舗名.
   */
  private String belongStoreName;
  
  /**
   * アプリケーションバージョン.
   */
  private String applicationVersion;
  
  /**
   * 本部権限.
   */
  private short headquartersAuthority;
  
  /**
   * 担当店舗コードリスト.
   */
  // G002.00.0 Update-start
//  private List<Integer> chargeStoreCds;
  private List<String> chargeStoreCds;
  // G002.00.0 Update-end
  /**
   * ロールコード.
   */
  private short roleCd;
  // G001.00.0 Add-start
  private String permissions;
  // G001.00.0 Add-end
  /**
   * ユーザコードゲッター.
   * 
   * @return ユーザコード
   */
  public String getUserCode() {
    return userCode;
  }

  /**
   * ユーザコードセッター.
   * 
   * @param userCode ユーザコード
   */
  public void setUserCode(String userCode) {
    this.userCode = userCode;
  }

  /**
   * ユーザ名ゲッター.
   * 
   * @return ユーザ名
   */
  public String getUserName() {
    return userName;
  }

  /**
   * ユーザ名セッター.
   * 
   * @param userName ユーザ名
   */
  public void setUserName(String userName) {
    this.userName = userName;
  }


  /**
   * 企業コード
   * 
   * @return 企業コード
   */
  public String getBusinessUnitCdStr() {
    return businessUnitCdStr;
  }

  /**
   * 企業コードセッター.
   * 
   * @param BusinessUnitCdStr 企業コード
   */
  public void setBusinessUnitCdStr(String businessUnitCdStr) {
    this.businessUnitCdStr = businessUnitCdStr;
  }

  /**
   * 企業名ゲッター.
   * 
   * @return 企業名
   */
  public String getBusinessUnitName() {
    return businessUnitName;
  }

  /**
   * 企業名セッター.
   * 
   * @param businessUnitName 企業名
   */
  public void setBusinessUnitName(String businessUnitName) {
    this.businessUnitName = businessUnitName;
  }

  /**
   * 所属店舗ゲッター.
   * 
   * @return 所属店舗
   */
  public String getBelongStoreCd() {
    return belongStoreCd;
  }

  /**
   * 所属店舗セッター.
   * 
   * @param belongStoreCd 所属店舗
   */
  public void setBelongStoreCd(String belongStoreCd) {
    this.belongStoreCd = belongStoreCd;
  }

  /**
   * (所属)店舗名ゲッター.
   * 
   * @return (所属)店舗名
   */
  public String getBelongStoreName() {
    return belongStoreName;
  }

  /**
   * (所属)店舗名セッター.
   * 
   * @param belongStoreName (所属)店舗名
   */
  public void setBelongStoreName(String belongStoreName) {
    this.belongStoreName = belongStoreName;
  }
  
  /**
   * アプリケーションバージョンゲッター.
   * 
   * @return アプリケーションバージョン
   */
  public String getApplicationVersion() {
    return applicationVersion;
  }

  /**
   * アプリケーションバージョンセッター.
   * 
   * @param applicationVersion アプリケーションバージョン
   */
  public void setApplicationVersion(String applicationVersion) {
    this.applicationVersion = applicationVersion;
  }
  
  /**
   * 本部権限ゲッター.
   * 
   * @return 本部権限
   */
  public short getHeadquartersAuthority() {
    return headquartersAuthority;
  }
  
  /**
   * 本部権限セッター.
   * 
   * @param headquartersAuthority 本部権限
   */
  public void setHeadquartersAuthority(short headquartersAuthority) {
    this.headquartersAuthority = headquartersAuthority;
  }
  
  /**
   * 担当店舗リストゲッター.
   *
   * @return 担当店舗リスト
   */
  // G002.00.0 Update-start
//  public List<Integer> getChargeStoreCds() {
//    return chargeStoreCds;
//  }
  public List<String> getChargeStoreCds() {
    return chargeStoreCds;
  }
  // G002.00.0 Update-end
  /**
   * 担当店舗リストセッター.
   *
   * @param chargeStoreCds 担当店舗リスト
   */
  // G002.00.0 Update-start
//  public void setChargeStoreCds(List<Integer> chargeStoreCds) {
  public void setChargeStoreCds(List<String> chargeStoreCds) {
    // G002.00.0 Update-end
    this.chargeStoreCds = chargeStoreCds;
  }

  /**
   * ロールコード.
   *
   * @return ロールコード
   */
  public short getRoleCd() {
    return roleCd;
  }

  /**
   * ロールコードフラグセッター.
   * 
   * @param roleCd ロールコード
   */
  public void setRoleCd(short roleCd) {
    this.roleCd = roleCd;
  }
  // G001.00.0 Add-start
  public String getPermissions() {
    return permissions;
  }

  public void setPermissions(String permissions) {
    this.permissions = permissions;
  }
  // G001.00.0 Add-end
  
  // KSD V001.000 AS
  /**
   * 保守権限
   */
  private Boolean isCloudposAdmin;
  public void setIsCloudposAdmin(Boolean isCloudposAdmin) {
	  this.isCloudposAdmin = isCloudposAdmin;
  }
  public Boolean getIsCloudposAdmin() {
	  return isCloudposAdmin;
  }
  // KSD V001.000 AE

}
