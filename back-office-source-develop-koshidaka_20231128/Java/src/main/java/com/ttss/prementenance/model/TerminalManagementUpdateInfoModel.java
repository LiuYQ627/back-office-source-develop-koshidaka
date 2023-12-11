package com.ttss.prementenance.model;

import java.util.Map;

import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;

import com.ttss.prementenance.utils.validation.ByteMax;

import lombok.Data;

/**
 * 端末管理更新 端末管理情報 データモデル.
 * @author TSS 可知 徹生
 * @version 1.0.0
 */
@Data
public class TerminalManagementUpdateInfoModel {

  // チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
  public interface TerminalManagementUpdateInfoOrder1 {}
  public interface TerminalManagementUpdateInfoOrder2 {}
  
  // 順序を指定したグループの定義
  @GroupSequence({TerminalManagementUpdateInfoOrder1.class, TerminalManagementUpdateInfoOrder2.class})
  public interface GroupNameOrder {}

  public TerminalManagementUpdateInfoModel() {}

  /**
   * 店舗コード.
   */
  private String storeCd;

  /**
   * 端末ID.
   */
  private String clientId;

  /**
   * 端末名称.
   */
  @NotEmpty(groups={TerminalManagementUpdateInfoOrder1.class})
  @ByteMax(value = 20, fullWidthValue = 10, encoding = "Shift-JIS", groups={TerminalManagementUpdateInfoOrder2.class})
  private String name;

  /**
   * 端末種別.
   */
  @NotEmpty
  private String terminalType;

  /**
   * 利用中フラグ.
   */
  private Integer activeFlag;

  /**
   * 接続スキャナ.
   */
  private Integer connectScanner;

  /**
   * 店舗コードゲッター.
   * 
   * @return 店舗コードコード
   */
  public String getStoreCd() {
    return storeCd;
  }

  /**
   * 店舗コードセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setStoreCd(String storeCd) {
    this.storeCd = storeCd;
  }

  /**
   * 端末IDゲッター.
   * 
   * @return 端末IDコード
   */
  public String getClientId() {
    return clientId;
  }

  /**
   * 端末IDセッター.
   * 
   * @param clientId 端末ID
   */
  public void setClientId(String clientId) {
    this.clientId = clientId;
  }

  /**
   * 名称.ゲッター.
   * 
   * @return 名称.
   */
  public String getName() {
    return name;
  }

  /**
   * 名称.セッター.
   * 
   * @param name 名称.
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * 端末種別.ゲッター.
   * 
   * @return 端末種別.
   */
  public String getTerminalType() {
    return terminalType;
  }

  /**
   * 端末種別.セッター.
   * 
   * @param terminalType 端末種別.
   */
  public void setTerminalType(String terminalType) {
    this.terminalType = terminalType;
  }

  /**
   * 利用中フラグゲッター.
   * 
   * @return 利用中フラグ
   */
  public Integer getActiveFlag() {
    return activeFlag;
  }

  /**
   * 利用中フラグセッター.
   * 
   * @param activeFlag 利用中フラグ
   */
  public void setActiveFlag(Integer activeFlag) {
    this.activeFlag = activeFlag;
  }

  /**
   * 接続スキャナゲッター.
   * 
   * @return 接続スキャナ
   */
  public Integer getConnectScanner() {
    return connectScanner;
  }

  /**
   * 接続スキャナセッター.
   * 
   * @param connectScanner 接続スキャナ
   */
  public void setConnectScanner(Integer connectScanner) {
    this.connectScanner = connectScanner;
  }
  
  /**
   * version
   *
   */
  private Long version;
  /**
	* versionゲッター
	*
	* @return version
	*/
  public Long getVersion() {
	return version;
  }
  /**
	* versionセッター
	*
	* @param version version
	*/
  public void setVersion(Long version) {
	this.version = version;
  }
  
  /**
	* mode
	* 
	*/
  private Integer mode;
  /**
	* modeゲッター
	*
	* @return mode
	*/
  public Integer getMode() {
	return mode;
  }
  /**
	* modeセッター
	*
	* @param mode mode
	*/
  public void setMode(Integer mode) {
	this.mode = mode;
  }

  // KSD V001.000 AS
  /**
   * 金種設定
   */
  private Map<String, Object> moneyTypeSettings;
  // KSD V001.000 AE

}
