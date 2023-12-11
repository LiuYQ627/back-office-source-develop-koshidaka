package com.ttss.prementenance.model;

/**
* ユーザ権限情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
public class UserAuthModel {

  /**
   * コンストラクタ.
   */
  public UserAuthModel() {
    this.registerAuth = true;
    this.modifyAuth = true;
    this.deleteAuth = true;
    this.other1Auth = true;
    this.other2Auth = true;
  }

  private ApiCommonResponseModel result;

  /**
   * 登録権限.
   */
  private boolean registerAuth;
  /**
   * 修正権限.
   */
  private boolean modifyAuth;
  /**
   * 削除権限.
   */
  private boolean deleteAuth;
  /**
   * その他1権限.
   */
  private boolean other1Auth;
  /**
   * その他2権限.
   */
  private boolean other2Auth;
  /**
   * 承認.
   */
  private boolean approvalFlg;

  /**
   * 登録権限ゲッター.
   * 
   * @return 登録権限
   */
  public boolean isRegisterAuth() {
    return registerAuth;
  }

  /**
   * 登録権限セッター.
   * 
   * @param registerAuth 登録権限
   */
  public void setRegisterAuth(boolean registerAuth) {
    this.registerAuth = registerAuth;
  }

  /**
   * 修正権限ゲッター.
   * 
   * @return 修正権限
   */
  public boolean isModifyAuth() {
    return modifyAuth;
  }

  /**
   * 修正権限セッター.
   * 
   * @param modifyAuth 修正権限
   */
  public void setModifyAuth(boolean modifyAuth) {
    this.modifyAuth = modifyAuth;
  }

  /**
   * 削除権限ゲッター.
   * 
   * @return 削除権限
   */
  public boolean isDeleteAuth() {
    return deleteAuth;
  }

  /**
   * 削除権限セッター.
   * 
   * @param deleteAuth 削除権限
   */
  public void setDeleteAuth(boolean deleteAuth) {
    this.deleteAuth = deleteAuth;
  }

  /**
   * その他1権限セッター.
   * 
   * @return その他1権限
   */
  public boolean isOther1Auth() {
    return other1Auth;
  }

  /**
   * その他1権限セッター.
   * 
   * @param other1Auth その他1権限
   */
  public void setOther1Auth(boolean other1Auth) {
    this.other1Auth = other1Auth;
  }

  /**
   * その他2権限ゲッター.
   * 
   * @return other1Auth その他2権限
   */
  public boolean isOther2Auth() {
    return other2Auth;
  }

  /**
   * その他2権限セッター.
   * 
   * @param other2Auth その他2権限
   */
  public void setOther2Auth(boolean other2Auth) {
    this.other2Auth = other2Auth;
  }

  /**
   * 実行結果ゲッター.
   * 
   * @return 実行結果
   */

  public ApiCommonResponseModel getResult() {
    return result;
  }

  /**
   * 実行結果セッター.
   * 
   * @param result 実行結果
   */
  public void setResult(ApiCommonResponseModel result) {
    this.result = result;
  }

  /**
   * 承認ゲッター.
   * 
   * @return 承認
   */
  public boolean isApprovalFlg() {
    return approvalFlg;
  }

  /**
   * 承認セッター.
   * 
   * @param approvalFlg 承認
   */
  public void setApprovalFlg(boolean approvalFlg) {
    this.approvalFlg = approvalFlg;
  }
}
