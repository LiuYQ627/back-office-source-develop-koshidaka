package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 店舗マスタ検索 レスポンス 店舗マスタ情報 データモデル.
 *
 * @author TSS 早川 剛生
 * @version 1.0.0
 */
@Data
public class StoreInfoModel {

	public StoreInfoModel() {
	}

	/**
	 * 店舗コード.
	 */
	private String storeCd;
	/**
	 * 店舗コード（文字列）.
	 */
	private String storeCdStr;
	/**
	 * 名称.
	 */
	private String name;
	/**
	 * 郵便番号.
	 */
	private String postNo;
	/**
	 * 住所.
	 */
	private String address;
	/**
	 * 電話番号.
	 */
	private String phone;
	/**
	 * FAX番号.
	 */
	private String fax;

	/**
	 * 運用形態.
	 */
	private short operationForm;

	/**
	 * イートイン.
	 */
	private short eatIn;

	/**
	 * 店舗グループ１.
	 */
	// KSD V001.000 MS
	// private short storeGroup1;
	private long storeGroup1;
	// KSD V001.000 ME

	/**
	 * 店舗グループ２.
	 */
	// KSD V001.000 MS
	// private short storeGroup2;
	private long storeGroup2;
	// KSD V001.000 ME

	/**
	 * 表示順.
	 */
	private short displayOrder;

	/**
	 * マスタ更新日時.
	 */
	private String masterUpdate;
	// KSD V001.000 AS
	/**
	 * ストアの構成詳細
	 */
	private ConfigurationsDetailModel configurations;
	// KSD V001.000 AE

	/**
	 * 店舗コードゲッター.
	 *
	 * @return 店舗コード
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
	 * 店舗コード（文字列）ゲッター.
	 *
	 * @return 店舗コード（文字列）
	 */
	public String getStoreCdStr() {
		return storeCdStr;
	}

	/**
	 * 店舗コード（文字列）セッター.
	 *
	 * @param storeCdStr 店舗コード（文字列）
	 */
	public void setStoreCdStr(String storeCdStr) {
		this.storeCdStr = storeCdStr;
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
	 * @param name 名称セッター.
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 郵便番号ゲッター.
	 *
	 * @return 郵便番号
	 */
	public String getPostNo() {
		return postNo;
	}

	/**
	 * 郵便番号セッター.
	 *
	 * @param postNo 郵便番号
	 */
	public void setPostNo(String postNo) {
		this.postNo = postNo;
	}

	/**
	 * 住所ゲッター.
	 *
	 * @return 住所
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * 住所セッター.
	 *
	 * @param address 住所
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * イートインゲッター.
	 *
	 * @return イートイン
	 */
	public short getEatIn() {
		return eatIn;
	}

	/**
	 * イートインセッター.
	 *
	 * @param eatIn イートイン
	 */
	public void setEatIn(short eatIn) {
		this.eatIn = eatIn;
	}

	/**
	 * 店舗グループ１ゲッター.
	 *
	 * @return 店舗グループ１
	 */
	// KSD V001.000 DS
	// public short getStoreGroup1() {
	// 	return storeGroup1;
	// }
	// KSD V001.000 DE

	/**
	 * 店舗グループ１セッター.
	 *
	 * @param storeGroup1 店舗グループ１
	 */
	// KSD V001.000 DS
	// public void setStoreGroup1(short storeGroup1) {
	// 	this.storeGroup1 = storeGroup1;
	// }
	// KSD V001.000 DE

	/**
	 * 店舗グループ２ゲッター.
	 *
	 * @return 店舗グループ２
	 */
	// KSD V001.000 DS
	// public short getStoreGroup2() {
	// 	return storeGroup2;
	// }
	// KSD V001.000 DE

	/**
	 * 店舗グループ２セッター.
	 *
	 * @param storeGroup2 店舗グループ２
	 */
	// KSD V001.000 DS
	// public void setStoreGroup2(short storeGroup2) {
	// 	this.storeGroup2 = storeGroup2;
	// }
	// KSD V001.000 DE

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
	 * マスタ更新日時ゲッター.
	 *
	 * @return マスタ更新日時
	 */
	public String getMasterUpdate() {
		return masterUpdate;
	}

	/**
	 * マスタ更新日時セッター.
	 *
	 * @param masterUpdate マスタ更新日時
	 */
	public void setMasterUpdate(String masterUpdate) {
		this.masterUpdate = masterUpdate;
	}
}
