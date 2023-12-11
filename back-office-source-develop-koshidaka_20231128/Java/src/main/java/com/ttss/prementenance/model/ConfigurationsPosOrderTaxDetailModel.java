package com.ttss.prementenance.model;

import lombok.Data;

/**
* POSオーダー価格 データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
public class ConfigurationsPosOrderTaxDetailModel {
  public ConfigurationsPosOrderTaxDetailModel() {}

  /**
   * 文字.
   */
  private String name;

  /**
   * 文字ゲッター.
   *
   * @return 文字
   */
  public String getName() {
    return name;
  }

  /**
   * 文字セッター.
   *
   * @param name 文字
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * 税率.
   */
  private String rate;

  /**
   * 税率ゲッター.
   *
   * @return 値
   */
  public String getRate() {
    return rate;
  }

  /**
   * 税率セッター.
   *
   * @param rate 値
   */
  public void setRate(String rate) {
    this.rate = rate;
  }

  /**
   * 種別.
   */
  private String type;

  /**
   * 種別ゲッター.
   *
   * @return 種別
   */
  public String getType() {
    return type;
  }

  /**
   * 種別セッター.
   *
   * @param type 種別
   */
  public void setType(String type) {
    this.type = type;
  }
	
  /**
   * 税率種別.
   */
  private String rateType;

  /**
   * 税率種別ゲッター.
   *
   * @return 税率種別
   */
  public String getRateType() {
    return rateType;
  }

  /**
   * 税率セッター.
   *
   * @param rateType 税率種別
   */
  public void setRateType(String rateType) {
    this.rateType = rateType;
  }
	
  /**
   * 表示器.
   */
  private String indicator;

  /**
   * 表示器ゲッター.
   *
   * @return 表示器
   */
  public String getIndicator() {
    return indicator;
  }

  /**
   * 表示器セッター.
   *
   * @param indicator 表示器
   */
  public void setIndicator(String indicator) {
    this.indicator = indicator;
  }
	
  /**
   * 権限.
   */
  private String jurisdictionType;

  /**
   * 権限ゲッター.
   *
   * @return 権限
   */
  public String getJurisdictionType() {
    return jurisdictionType;
  }

  /**
   * 権限セッター.
   *
   * @param jurisdictionType 権限
   */
  public void setJurisdictionType(String jurisdictionType) {
    this.jurisdictionType = jurisdictionType;
  }
	
  /**
   * 提供元税率.
   */
  private String originalTaxSource;

  /**
   * 提供元税率ゲッター.
   *
   * @return 値
   */
  public String getOriginalTaxSource() {
    return originalTaxSource;
  }

  /**
   * 提供元税率セッター.
   *
   * @param originalTaxSource 提供元税率
   */
  public void setOriginalTaxSource(String originalTaxSource) {
    this.originalTaxSource = originalTaxSource;
  }
	
  /**
   * オフライン.
   */
  private String offline;

  /**
   * オフラインゲッター.
   *
   * @return 値
   */
  public String getOffline() {
    return offline;
  }

  /**
   * オフラインセッター.
   *
   * @param offline オフライン
   */
  public void setOffline(String offline) {
    this.offline = offline;
  }
	
  /**
   * 丸めモード.
   */
  private String roundingMode;

  /**
   * 丸めモードゲッター.
   *
   * @return 丸めモード
   */
  public String getRoundingMode() {
    return roundingMode;
  }

  /**
   * 丸めモードセッター.
   *
   * @param rate 丸めモード
   */
  public void setRoundingMode(String roundingMode) {
    this.roundingMode = roundingMode;
  }

}
