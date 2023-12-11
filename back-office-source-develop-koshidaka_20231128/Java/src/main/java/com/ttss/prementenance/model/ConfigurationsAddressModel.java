package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 構成情報（住所） データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsAddressModel {
  public ConfigurationsAddressModel() {}


  /**
   * 住所.
   */
  private CommonDefaultModel address1;

  /**
   * 住所ゲッター.
   *
   * @return 住所
   */
  public CommonDefaultModel getAddress1() {
    return address1;
  }

  /**
   * 住所セッター.
   *
   * @param address1 住所
   */
  public void setAddress1(CommonDefaultModel address1) {
    this.address1 = address1;
  }


  /**
   * 住所２（未使用）.
   */
  private CommonDefaultModel address2;

  /**
   * 住所２（未使用）ゲッター.
   *
   * @return 住所２（未使用）
   */
  public CommonDefaultModel getAddress2() {
    return address2;
  }

  /**
   * 住所２（未使用）セッター.
   *
   * @param address2 住所２（未使用）
   */
  public void setAddress2(CommonDefaultModel address2) {
    this.address2 = address2;
  }


  /**
   * 都市（未使用）.
   */
  private CommonDefaultModel city;

  /**
   * 都市（未使用）ゲッター.
   *
   * @return 都市（未使用）
   */
  public CommonDefaultModel getCity() {
    return city;
  }

  /**
   * 都市（未使用）セッター.
   *
   * @param city 都市（未使用）
   */
  public void setCity(CommonDefaultModel city) {
    this.city = city;
  }


  /**
   * 郵便番号（未使用）.
   */
  private CommonDefaultModel postal_code;

  /**
   * 郵便番号（未使用）ゲッター.
   *
   * @return 郵便番号（未使用）
   */
  public CommonDefaultModel getPostal_code() {
    return postal_code;
  }

  /**
   * 郵便番号（未使用）セッター.
   *
   * @param postal_code 郵便番号（未使用）
   */
  public void setPostal_code(CommonDefaultModel postal_code) {
    this.postal_code = postal_code;
  }


  /**
   * 国（未使用）.
   */
  private CommonDefaultModel country;

  /**
   * 国（未使用）ゲッター.
   *
   * @return 国（未使用）
   */
  public CommonDefaultModel getCountry() {
    return country;
  }

  /**
   * 国（未使用）セッター.
   *
   * @param country 国（未使用）
   */
  public void setCountry(CommonDefaultModel country) {
    this.country = country;
  }


  /**
   * ステータス（未使用）.
   */
  private CommonDefaultModel state;

  /**
   * ステータス（未使用）ゲッター.
   *
   * @return ステータス（未使用）
   */
  public CommonDefaultModel getState() {
    return state;
  }

  /**
   * ステータス（未使用）セッター.
   *
   * @param state ステータス（未使用）
   */
  public void setState(CommonDefaultModel state) {
    this.state = state;
  }


  /**
   * 郵便番号.
   */
  private CommonDefaultModel postalCode;

  /**
   * 郵便番号ゲッター.
   *
   * @return 郵便番号
   */
  public CommonDefaultModel getPostalCode() {
    return postalCode;
  }

  /**
   * 郵便番号セッター.
   *
   * @param postalCode 郵便番号
   */
  public void setPostalCode(CommonDefaultModel postalCode) {
    this.postalCode = postalCode;
  }
}
