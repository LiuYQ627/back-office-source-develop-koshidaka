package com.ttss.prementenance.model;

import lombok.Data;

/**
* 部門情報 データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class DepartmentsModel {

  public DepartmentsModel() {}

  /**
   * 店舗コード.
   */
  private int storeCd;

  /**
   * 分類コード.
   */
  private long classificationCd;

  /**
   * リンク分類コード.
   */
  private long linkClassificationCd;

  /**
   * 表示名称.
   */
  private String name;

  /**
   * 課税ID.
   */
  private short taxationId;

  /**
   * 売変許可／禁止.
   */
  private short validPriceChangFlg;

  /**
   * 登録許可／禁止.
   */
  private short validRegisterFlg;

  /**
   * 小数点許可／禁止.
   */
  private short validDecimalFlg;

  /**
   * ２０禁対象.
   */
  private short k20Flg;

  /**
   * 課税ID上位参照.
   */
  private short taxationIdFlg;

  /**
   * 店舗コードゲッター.
   * 
   * @return 店舗コード
   */
  public int getStoreCd() {
    return storeCd;
  }

  /**
   * 店舗コードセッター.
   * 
   * @param storeCd 店舗コード
   */
  public void setStoreCd(int storeCd) {
    this.storeCd = storeCd;
  }

  /**
   * 分類コードゲッター.
   * 
   * @return 分類コード
   */
  public long getClassificationCd() {
    return classificationCd;
  }

  /**
   * 分類コードセッター.
   * 
   * @param classificationCd 分類コード
   */
  public void setClassificationCd(long classificationCd) {
    this.classificationCd = classificationCd;
  }

  /**
   * リンク分類コードゲッター.
   * 
   * @return リンク分類コード
   */
  public long getLinkClassificationCd() {
    return linkClassificationCd;
  }

  /**
   * リンク分類コードセッター.
   * 
   * @param linkClassificationCd リンク分類コード
   */
  public void setLinkClassificationCd(long linkClassificationCd) {
    this.linkClassificationCd = linkClassificationCd;
  }

  /**
   * 表示名称ゲッター.
   * 
   * @return 表示名称
   */
  public String getName() {
    return name;
  }

  /**
   * 表示名称セッター.
   * 
   * @param name 表示名称
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * 課税IDゲッター.
   * 
   * @return 課税ID
   */
  public short getTaxationId() {
    return taxationId;
  }

  /**
   * 課税IDセッター.
   * 
   * @param taxationId 課税ID
   */
  public void setTaxationId(short taxationId) {
    this.taxationId = taxationId;
  }

  /**
   * 売変許可／禁止ゲッター.
   * 
   * @return 売変許可／禁止
   */
  public short getValidPriceChangFlg() {
    return validPriceChangFlg;
  }

  /**
   * 売変許可／禁止セッター.
   * 
   * @param validPriceChangFlg 売変許可／禁止
   */
  public void setValidPriceChangFlg(short validPriceChangFlg) {
    this.validPriceChangFlg = validPriceChangFlg;
  }

  /**
   * 登録許可／禁止ゲッター.
   * 
   * @return 登録許可／禁止
   */
  public short getValidRegisterFlg() {
    return validRegisterFlg;
  }

  /**
   * 登録許可／禁止セッター.
   * 
   * @param validRegisterFlg 登録許可／禁止
   */
  public void setValidRegisterFlg(short validRegisterFlg) {
    this.validRegisterFlg = validRegisterFlg;
  }

  /**
   * 小数点許可／禁止ゲッター.
   * 
   * @return 小数点許可／禁止
   */
  public short getValidDecimalFlg() {
    return validDecimalFlg;
  }

  /**
   * 小数点許可／禁止セッター.
   * 
   * @param validDecimalFlg 小数点許可／禁止
   */
  public void setValidDecimalFlg(short validDecimalFlg) {
    this.validDecimalFlg = validDecimalFlg;
  }

  /**
   * ２０禁対象ゲッター.
   * 
   * @return ２０禁対象
   */
  public short getK20Flg() {
    return k20Flg;
  }

  /**
   * ２０禁対象セッター.
   * 
   * @param k20Flg ２０禁対象
   */
  public void setK20Flg(short k20Flg) {
    this.k20Flg = k20Flg;
  }

  /**
   * 課税ID上位参照ゲッター.
   * 
   * @return 課税ID上位参照
   */
  public short getTaxationIdFlg() {
    return taxationIdFlg;
  }

  /**
   * 課税ID上位参照セッター.
   * 
   * @param taxationIdFlg 課税ID上位参照
   */
  public void setTaxationIdFlg(short taxationIdFlg) {
    this.taxationIdFlg = taxationIdFlg;
  }

}
