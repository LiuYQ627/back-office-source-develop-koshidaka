package com.ttss.prementenance.model;

/**
* ユーザマスタ権限取得 メニューアイテムマスタ権限 データモデル.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/
public class MenuitemInfoModel {
  public MenuitemInfoModel() {}

  /**
   * メニューアイテムコード.
   */
  private String menuitemCd;
  /**
   * 名称.
   */
  private String name;
  /**
   * メニュー区分.
   */
  private short menuFlg;
  /**
   * 表示順.
   */
  private short displayOrder;
  /**
   * メインメニューコード.
   */
  private short mainmenuCd;
  /**
   * サブメニューコード.
   */
  private short submenuCd;
  /**
   * レベル1～10.
   */
  private short startLevel1;
  private short registerLevel1;
  private short modifyLevel1;
  private short deleteLevel1;
  private short other1Level1;
  private short other2Level1;
  private short startLevel2;
  private short registerLevel2;
  private short modifyLevel2;
  private short deleteLevel2;
  private short other1Level2;
  private short other2Level2;
  private short startLevel3;
  private short registerLevel3;
  private short modifyLevel3;
  private short deleteLevel3;
  private short other1Level3;
  private short other2Level3;
  private short startLevel4;
  private short registerLevel4;
  private short modifyLevel4;
  private short deleteLevel4;
  private short other1Level4;
  private short other2Level4;
  private short startLevel5;
  private short registerLevel5;
  private short modifyLevel5;
  private short deleteLevel5;
  private short other1Level5;
  private short other2Level5;
  private short startLevel6;
  private short registerLevel6;
  private short modifyLevel6;
  private short deleteLevel6;
  private short other1Level6;
  private short other2Level6;
  private short startLevel7;
  private short registerLevel7;
  private short modifyLevel7;
  private short deleteLevel7;
  private short other1Level7;
  private short other2Level7;
  private short startLevel8;
  private short registerLevel8;
  private short modifyLevel8;
  private short deleteLevel8;
  private short other1Level8;
  private short other2Level8;
  private short startLevel9;
  private short registerLevel9;
  private short modifyLevel9;
  private short deleteLevel9;
  private short other1Level9;
  private short other2Level9;
  private short startLevel10;
  private short registerLevel10;
  private short modifyLevel10;
  private short deleteLevel10;
  private short other1Level10;
  private short other2Level10;

  /**
   * メニューアイテムコードゲッター.
   * 
   * @return メニューアイテムコード
   */
  public String getMenuitemCd() {
    return menuitemCd;
  }

  /**
   * メニューアイテムコードセッター.
   * 
   * @param menuitemCd メニューアイテムコード
   */
  public void setMenuitemCd(String menuitemCd) {
    this.menuitemCd = menuitemCd;
  }

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
   * メニュー区分ゲッター.
   * 
   * @return メニュー区分
   */
  public short getMenuFlg() {
    return menuFlg;
  }

  /**
   * メニュー区分セッター.
   * 
   * @param menuFlg メニュー区分
   */
  public void setMenuFlg(short menuFlg) {
    this.menuFlg = menuFlg;
  }

  /**
   * 表示順ゲッター.
   * 
   * @return 表示順
   */
  public short getDisplayOrder() {
    return displayOrder;
  }

  /**
   * 表示順セッター.
   * 
   * @param displayOrder 表示順
   */
  public void setDisplayOrder(short displayOrder) {
    this.displayOrder = displayOrder;
  }

  /**
   * メインメニューコードゲッター.
   * 
   * @return メインメニューコード
   */
  public short getMainmenuCd() {
    return mainmenuCd;
  }

  /**
   * メインメニューコードセッター.
   * 
   * @param mainmenuCd メインメニューコード
   */
  public void setMainmenuCd(short mainmenuCd) {
    this.mainmenuCd = mainmenuCd;
  }

  /**
   * サブメニューコードゲッター.
   * 
   * @return サブメニューコード
   */
  public short getSubmenuCd() {
    return submenuCd;
  }

  /**
   * サブメニューコードセッター.
   * 
   * @param submenuCd サブメニューコード
   */
  public void setSubmenuCd(short submenuCd) {
    this.submenuCd = submenuCd;
  }

  /**
   * 以下レベル1~10のゲッター&セッター.
   */
  public short getStartLevel1() {
    return startLevel1;
  }

  public void setStartLevel1(short startLevel1) {
    this.startLevel1 = startLevel1;
  }

  public short getRegisterLevel1() {
    return registerLevel1;
  }

  public void setRegisterLevel1(short registerLevel1) {
    this.registerLevel1 = registerLevel1;
  }

  public short getModifyLevel1() {
    return modifyLevel1;
  }

  public void setModifyLevel1(short modifyLevel1) {
    this.modifyLevel1 = modifyLevel1;
  }

  public short getDeleteLevel1() {
    return deleteLevel1;
  }

  public void setDeleteLevel1(short deleteLevel1) {
    this.deleteLevel1 = deleteLevel1;
  }

  public short getOther1Level1() {
    return other1Level1;
  }

  public void setOther1Level1(short other1Level1) {
    this.other1Level1 = other1Level1;
  }

  public short getOther2Level1() {
    return other2Level1;
  }

  public void setOther2Level1(short other2Level1) {
    this.other2Level1 = other2Level1;
  }

  public short getStartLevel2() {
    return startLevel2;
  }

  public void setStartLevel2(short startLevel2) {
    this.startLevel2 = startLevel2;
  }

  public short getRegisterLevel2() {
    return registerLevel2;
  }

  public void setRegisterLevel2(short registerLevel2) {
    this.registerLevel2 = registerLevel2;
  }

  public short getModifyLevel2() {
    return modifyLevel2;
  }

  public void setModifyLevel2(short modifyLevel2) {
    this.modifyLevel2 = modifyLevel2;
  }

  public short getDeleteLevel2() {
    return deleteLevel2;
  }

  public void setDeleteLevel2(short deleteLevel2) {
    this.deleteLevel2 = deleteLevel2;
  }

  public short getOther1Level2() {
    return other1Level2;
  }

  public void setOther1Level2(short other1Level2) {
    this.other1Level2 = other1Level2;
  }

  public short getOther2Level2() {
    return other2Level2;
  }

  public void setOther2Level2(short other2Level2) {
    this.other2Level2 = other2Level2;
  }

  public short getStartLevel3() {
    return startLevel3;
  }

  public void setStartLevel3(short startLevel3) {
    this.startLevel3 = startLevel3;
  }

  public short getRegisterLevel3() {
    return registerLevel3;
  }

  public void setRegisterLevel3(short registerLevel3) {
    this.registerLevel3 = registerLevel3;
  }

  public short getModifyLevel3() {
    return modifyLevel3;
  }

  public void setModifyLevel3(short modifyLevel3) {
    this.modifyLevel3 = modifyLevel3;
  }

  public short getDeleteLevel3() {
    return deleteLevel3;
  }

  public void setDeleteLevel3(short deleteLevel3) {
    this.deleteLevel3 = deleteLevel3;
  }

  public short getOther1Level3() {
    return other1Level3;
  }

  public void setOther1Level3(short other1Level3) {
    this.other1Level3 = other1Level3;
  }

  public short getOther2Level3() {
    return other2Level3;
  }

  public void setOther2Level3(short other2Level3) {
    this.other2Level3 = other2Level3;
  }

  public short getStartLevel4() {
    return startLevel4;
  }

  public void setStartLevel4(short startLevel4) {
    this.startLevel4 = startLevel4;
  }

  public short getRegisterLevel4() {
    return registerLevel4;
  }

  public void setRegisterLevel4(short registerLevel4) {
    this.registerLevel4 = registerLevel4;
  }

  public short getModifyLevel4() {
    return modifyLevel4;
  }

  public void setModifyLevel4(short modifyLevel4) {
    this.modifyLevel4 = modifyLevel4;
  }

  public short getDeleteLevel4() {
    return deleteLevel4;
  }

  public void setDeleteLevel4(short deleteLevel4) {
    this.deleteLevel4 = deleteLevel4;
  }

  public short getOther1Level4() {
    return other1Level4;
  }

  public void setOther1Level4(short other1Level4) {
    this.other1Level4 = other1Level4;
  }

  public short getOther2Level4() {
    return other2Level4;
  }

  public void setOther2Level4(short other2Level4) {
    this.other2Level4 = other2Level4;
  }

  public short getStartLevel5() {
    return startLevel5;
  }

  public void setStartLevel5(short startLevel5) {
    this.startLevel5 = startLevel5;
  }

  public short getRegisterLevel5() {
    return registerLevel5;
  }

  public void setRegisterLevel5(short registerLevel5) {
    this.registerLevel5 = registerLevel5;
  }

  public short getModifyLevel5() {
    return modifyLevel5;
  }

  public void setModifyLevel5(short modifyLevel5) {
    this.modifyLevel5 = modifyLevel5;
  }

  public short getDeleteLevel5() {
    return deleteLevel5;
  }

  public void setDeleteLevel5(short deleteLevel5) {
    this.deleteLevel5 = deleteLevel5;
  }

  public short getOther1Level5() {
    return other1Level5;
  }

  public void setOther1Level5(short other1Level5) {
    this.other1Level5 = other1Level5;
  }

  public short getOther2Level5() {
    return other2Level5;
  }

  public void setOther2Level5(short other2Level5) {
    this.other2Level5 = other2Level5;
  }

  public short getStartLevel6() {
    return startLevel6;
  }

  public void setStartLevel6(short startLevel6) {
    this.startLevel6 = startLevel6;
  }

  public short getRegisterLevel6() {
    return registerLevel6;
  }

  public void setRegisterLevel6(short registerLevel6) {
    this.registerLevel6 = registerLevel6;
  }

  public short getModifyLevel6() {
    return modifyLevel6;
  }

  public void setModifyLevel6(short modifyLevel6) {
    this.modifyLevel6 = modifyLevel6;
  }

  public short getDeleteLevel6() {
    return deleteLevel6;
  }

  public void setDeleteLevel6(short deleteLevel6) {
    this.deleteLevel6 = deleteLevel6;
  }

  public short getOther1Level6() {
    return other1Level6;
  }

  public void setOther1Level6(short other1Level6) {
    this.other1Level6 = other1Level6;
  }

  public short getOther2Level6() {
    return other2Level6;
  }

  public void setOther2Level6(short other2Level6) {
    this.other2Level6 = other2Level6;
  }

  public short getStartLevel7() {
    return startLevel7;
  }

  public void setStartLevel7(short startLevel7) {
    this.startLevel7 = startLevel7;
  }

  public short getRegisterLevel7() {
    return registerLevel7;
  }

  public void setRegisterLevel7(short registerLevel7) {
    this.registerLevel7 = registerLevel7;
  }

  public short getModifyLevel7() {
    return modifyLevel7;
  }

  public void setModifyLevel7(short modifyLevel7) {
    this.modifyLevel7 = modifyLevel7;
  }

  public short getDeleteLevel7() {
    return deleteLevel7;
  }

  public void setDeleteLevel7(short deleteLevel7) {
    this.deleteLevel7 = deleteLevel7;
  }

  public short getOther1Level7() {
    return other1Level7;
  }

  public void setOther1Level7(short other1Level7) {
    this.other1Level7 = other1Level7;
  }

  public short getOther2Level7() {
    return other2Level7;
  }

  public void setOther2Level7(short other2Level7) {
    this.other2Level7 = other2Level7;
  }

  public short getStartLevel8() {
    return startLevel8;
  }

  public void setStartLevel8(short startLevel8) {
    this.startLevel8 = startLevel8;
  }

  public short getRegisterLevel8() {
    return registerLevel8;
  }

  public void setRegisterLevel8(short registerLevel8) {
    this.registerLevel8 = registerLevel8;
  }

  public short getModifyLevel8() {
    return modifyLevel8;
  }

  public void setModifyLevel8(short modifyLevel8) {
    this.modifyLevel8 = modifyLevel8;
  }

  public short getDeleteLevel8() {
    return deleteLevel8;
  }

  public void setDeleteLevel8(short deleteLevel8) {
    this.deleteLevel8 = deleteLevel8;
  }

  public short getOther1Level8() {
    return other1Level8;
  }

  public void setOther1Level8(short other1Level8) {
    this.other1Level8 = other1Level8;
  }

  public short getOther2Level8() {
    return other2Level8;
  }

  public void setOther2Level8(short other2Level8) {
    this.other2Level8 = other2Level8;
  }

  public short getStartLevel9() {
    return startLevel9;
  }

  public void setStartLevel9(short startLevel9) {
    this.startLevel9 = startLevel9;
  }

  public short getRegisterLevel9() {
    return registerLevel9;
  }

  public void setRegisterLevel9(short registerLevel9) {
    this.registerLevel9 = registerLevel9;
  }

  public short getModifyLevel9() {
    return modifyLevel9;
  }

  public void setModifyLevel9(short modifyLevel9) {
    this.modifyLevel9 = modifyLevel9;
  }

  public short getDeleteLevel9() {
    return deleteLevel9;
  }

  public void setDeleteLevel9(short deleteLevel9) {
    this.deleteLevel9 = deleteLevel9;
  }

  public short getOther1Level9() {
    return other1Level9;
  }

  public void setOther1Level9(short other1Level9) {
    this.other1Level9 = other1Level9;
  }

  public short getOther2Level9() {
    return other2Level9;
  }

  public void setOther2Level9(short other2Level9) {
    this.other2Level9 = other2Level9;
  }

  public short getStartLevel10() {
    return startLevel10;
  }

  public void setStartLevel10(short startLevel10) {
    this.startLevel10 = startLevel10;
  }

  public short getRegisterLevel10() {
    return registerLevel10;
  }

  public void setRegisterLevel10(short registerLevel10) {
    this.registerLevel10 = registerLevel10;
  }

  public short getModifyLevel10() {
    return modifyLevel10;
  }

  public void setModifyLevel10(short modifyLevel10) {
    this.modifyLevel10 = modifyLevel10;
  }

  public short getDeleteLevel10() {
    return deleteLevel10;
  }

  public void setDeleteLevel10(short deleteLevel10) {
    this.deleteLevel10 = deleteLevel10;
  }

  public short getOther1Level10() {
    return other1Level10;
  }

  public void setOther1Level10(short other1Level10) {
    this.other1Level10 = other1Level10;
  }

  public short getOther2Level10() {
    return other2Level10;
  }

  public void setOther2Level10(short other2Level10) {
    this.other2Level10 = other2Level10;
  }
}
