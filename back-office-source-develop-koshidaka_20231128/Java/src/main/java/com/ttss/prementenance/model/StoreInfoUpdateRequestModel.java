package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ttss.prementenance.utils.validation.ByteMax;
import com.ttss.prementenance.utils.validation.ByteSize;
import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

/**
 * 店舗マスタ更新 店舗情報 データモデル.
 *
 * @author TSS 早川 剛生
 * @version 1.0.0
 */
@Data
public class StoreInfoUpdateRequestModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface StoreInfoUpdateRequestNameOrder1 {
	}

	public interface StoreInfoUpdateRequestNameOrder2 {
	}

	public interface StoreInfoUpdateRequestPostNoOrder1 {
	}

	public interface StoreInfoUpdateRequestPostNoOrder2 {
	}

	public interface StoreInfoUpdateRequestTelNoOrder1 {
	}

	public interface StoreInfoUpdateRequestTelNoOrder2 {
	}

	public interface StoreInfoUpdateRequestFaxNoOrder1 {
	}

	public interface StoreInfoUpdateRequestFaxNoOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ StoreInfoUpdateRequestNameOrder1.class, StoreInfoUpdateRequestNameOrder2.class })
	public interface GroupNameOrder {
	}

	@GroupSequence({ StoreInfoUpdateRequestPostNoOrder1.class,
			StoreInfoUpdateRequestPostNoOrder2.class })
	public interface GroupPostNoOrder {
	}

	@GroupSequence({ StoreInfoUpdateRequestTelNoOrder1.class,
			StoreInfoUpdateRequestTelNoOrder2.class })
	public interface GroupTelNoOrder {
	}

	public StoreInfoUpdateRequestModel() {
	}

	/**
	 * 店舗コード.
	 */
	@Range(min = 1, max = 999999)
	private int storeCd;

	/**
	 * 店舗コード(文字列).
	 */
	@Size(max = 6)
	@Pattern(regexp = "^[0-9]*$")
	private String storeCdStr;

	/**
	 * 名称.
	 */
	@NotEmpty(groups = { StoreInfoUpdateRequestNameOrder1.class })
	@ByteSize(min = 1, max = 30, fullWidthMin = 1, fullWidthMax = 15, encoding = "Shift-JIS", groups = {
			StoreInfoUpdateRequestNameOrder2.class })
	private String name;

	/**
	 * 郵便番号.
	 */
	@Size(max = 8, groups = { StoreInfoUpdateRequestPostNoOrder1.class })
	@Pattern(regexp = "^[0-9-]*$", message = "{validation.Pattern.NumWithHyphen.message}", groups = {
			StoreInfoUpdateRequestPostNoOrder2.class })
	private String postNo;

	/**
	 * 住所.
	 */
	@ByteMax(value = 40, fullWidthValue = 20, encoding = "Shift-JIS")
	private String address;

	/**
	 * 電話番号.
	 */
	@Size(max = 16, groups = { StoreInfoUpdateRequestTelNoOrder1.class })
	@Pattern(regexp = "^[0-9-]*$", message = "{validation.Pattern.NumWithHyphen.message}", groups = {
			StoreInfoUpdateRequestTelNoOrder2.class })
	private String phone;

	/**
	 * FAX番号.
	 */
	@Size(max = 16)
	@Pattern(regexp = "^[0-9-]*$")
	private String fax;

	/**
	 * 運用形態.
	 */
	private short operationalForm;

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

	// KSD V001.000 AS
	/**
	 * ストアの構成詳細
	 */
	private ConfigurationsDetailModel configurations;
	// KSD V001.000 AE

	/**
	 * 表示順.
	 */
	@Range(min = 0, max = 999)
	private short displayOrder;

	/**
	 * マスタ更新日時.
	 */
	private String masterUpdate;

	/**
	 * ダイアログモード.
	 */
	private int mode;

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
	 * 店舗コード(文字列)ゲッター.
	 *
	 * @return 店舗コード(文字列)
	 */
	public String getStoreCdStr() {
		return storeCdStr;
	}

	/**
	 * 店舗コード(文字列)セッター.
	 *
	 * @param storeCdStr 店舗コード(文字列)
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

	// /**
	// * 電話番号ゲッター.
	// *
	// * @return 電話番号
	// */
	// public String getTelNo() {
	// return telNo;
	// }
	//
	// /**
	// * 電話番号セッター.
	// *
	// * @param telNo 電話番号
	// */
	// public void setTelNo(String telNo) {
	// this.telNo = telNo;
	// }
	//
	// /**
	// * FAX番号ゲッター.
	// *
	// * @return FAX番号
	// */
	// public String getFaxNo() {
	// return faxNo;
	// }
	//
	// /**
	// * FAX番号セッター.
	// *
	// * @param faxNo FAX番号
	// */
	// public void setFaxNo(String faxNo) {
	// this.faxNo = faxNo;
	// }

	/**
	 * 運用形態ゲッター.
	 *
	 * @return 運用形態
	 */
	public short getOperationalForm() {
		return operationalForm;
	}

	/**
	 * 運用形態セッター.
	 *
	 * @param operationalForm 運用形態
	 */
	public void setOperationalForm(short operationalForm) {
		this.operationalForm = operationalForm;
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

	/**
	 * ダイアログモードゲッター.
	 *
	 * @return ダイアログモード
	 */
	@JsonIgnore
	public int getMode() {
		return mode;
	}

	/**
	 * ダイアログモードセッター.
	 *
	 * @param mode ダイアログモード
	 */
	@JsonProperty
	public void setMode(int mode) {
		this.mode = mode;
	}
}
