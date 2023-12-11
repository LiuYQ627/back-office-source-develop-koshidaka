package com.ttss.prementenance.utils;

import com.ttss.prementenance.model.MenuitemInfoModel;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import lombok.Data;
import org.springframework.web.context.annotation.SessionScope;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230214 xu.jh(Neusoft)    G001.00.0  issue課題#1054を対応します.
 * 20230302 xu.jh(Neusoft)    G002.00.0  issue課題#1038を対応します.
 */
/**
* セッション保持クラス.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
@SessionScope
@Data
public class SessionBeans implements Serializable {

	/**
	 * シリアライズバージョンUID.
	 */
	private static final long serialVersionUID = 6334063099671792256L;
	/**
	 * ユーザID.
	 */
	private String userId;
	/**
	 * ユーザ名.
	 */
	private String userName;
	/**
	 * 企業名.
	 */
	private String businessUnitName;
	/**
	 * 企業コード(文字列).
	 */
	private String businessUnitCdStr;
	/**
	 * (所属)店舗名.
	 */
	private String belongStoreName;
	/**
	 * APIトークン.
	 */
	private String wso2ApiToken;
	/**
	 * 承認.
	 */
	private short validApprovalFlg;
	/**
	 * ロール.
	 */
	private short role;
	/**
	 * 権限マップ.
	 */
	private HashMap<String, MenuitemInfoModel> itemModelMaps;
	/**
	 * アプリバージョン.
	 */
	private String applicationVersion;

	/**
	 * 本部権限.
	 */
	private short headquartersAuthority;

	/**
	 * 所属店舗.
	 */
	private String belongStoreCd;

	/**
	 * 担当店舗コードリスト.
	 */
	// G002.00.0 Update-start
//	private List<Integer> chargeStoreCds;
	private List<String> chargeStoreCds;
	// G002.00.0 Update-end
	// G002.00.0 Add-start
	private Boolean isCloudposAdmin;
	// G002.00.0 Add-end
	/**
	 * シークレットユーザフラグ.
	 */
	private short secretUserFlag;

	/**
	 * ELERAのToken
	 */
	private String ELERAToken;

	/**
	 * ELERAのTokenゲッター
	 *
	 * @return ELERAのToken
	 */
	public String getELERAToken() {
		return ELERAToken;
	}

	/**
	 * ELERAのTokenセッター
	 *
	 * @param ELERAToken ELERAのToken
	 */
	public void setELERAToken(String ELERAToken) {
		this.ELERAToken = ELERAToken;
	}

	/**
	 * ユーザIDゲッター.
	 *
	 * @return userId ユーザID
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * ユーザIDセッター.
	 *
	 * @param userId ユーザID
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * ユーザ名ゲッター.
	 *
	 * @return userName ユーザ名
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
	 * 担当店舗リストゲッター.
	 *
	 * @return 担当店舗リスト
	 */
	// G002.00.0 Update-start
//	public List<Integer> getChargeStoreCds() {
//		return chargeStoreCds;
//	}
	public List<String> getChargeStoreCds() {
		return chargeStoreCds;
	}
    // G002.00.0 Update-end
	// G002.00.0 Add-start
	public Boolean getIsCloudposAdmin() {
		return isCloudposAdmin;
	}
	// G002.00.0 Add-end
	/**
	 * 担当店舗リストセッター.
	 *
	 * @param chargeStoreCds 担当店舗リスト
	 */
//	public void setChargeStoreCds(List<Integer> chargeStoreCds) {
//		this.chargeStoreCds = chargeStoreCds;
//	}
	// G002.00.0 Update-start
	public void setChargeStoreCds(List<String> chargeStoreCds) {
		this.chargeStoreCds = chargeStoreCds;
	}
	// G002.00.0 Update-end
	// G002.00.0 Add-start
	public void setIsCloudposAdmin(Boolean isCloudposAdmin) {
		this.isCloudposAdmin = isCloudposAdmin;
	}
	// G002.00.0 Add-end
	/**
	 * 企業名ゲッター.
	 *
	 * @return businessUnitName 企業名
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
	 * 企業コード(文字列)ゲッター.
	 *
	 * @return businessUnitCdStr 企業コード(文字列)
	 */
	public String getBusinessUnitCdStr() {
		return businessUnitCdStr;
	}

	/**
	 * 企業コード(文字列)セッター.
	 *
	 * @param businessUnitCdStr 企業コード(文字列)
	 */
	public void setBusinessUnitCdStr(String businessUnitCdStr) {
		this.businessUnitCdStr = businessUnitCdStr;
	}

	/**
	 * (所属)店舗名ゲッター.
	 *
	 * @return affiliationStoreName (所属)店舗名
	 */
	public String getAffiliationStoreName() {
		return belongStoreName;
	}

	/**
	 * (所属)店舗名セッター.
	 *
	 * @param affiliationStoreName (所属)店舗名
	 */
	public void setAffiliationStoreName(String affiliationStoreName) {
		this.belongStoreName = affiliationStoreName;
	}

	/**
	 * APIトークンゲッター.
	 *
	 * @return wso2ApiToken APIトークン
	 */
	public String getWso2ApiToken() {
		return wso2ApiToken;
	}

	/**
	 * APIトークンセッター.
	 *
	 * @param wso2ApiToken セットする wso2ApiToken APIトークン
	 */
	public void setWso2ApiToken(String wso2ApiToken) {
		this.wso2ApiToken = wso2ApiToken;
	}

	/**
	 * 承認ゲッター.
	 *
	 * @return validApprovalFlg 承認
	 */
	public short getValidApprovalFlg() {
		return validApprovalFlg;
	}

	/**
	 * 承認セッター.
	 *
	 * @param validApprovalFlg 承認
	 */
	public void setValidApprovalFlg(short validApprovalFlg) {
		this.validApprovalFlg = validApprovalFlg;
	}

	/**
	 * ロールゲッター.
	 *
	 * @return ロール
	 */
	public short getRole() {
		return role;
	}

	/**
	 * ロールセッター.
	 *
	 * @param role ロールセッター.
	 */
	public void setRole(short role) {
		this.role = role;
	}

	/**
	 * 権限マップゲッター.
	 *
	 * @return 権限マップ
	 */
	public HashMap<String, MenuitemInfoModel> getItemModelMaps() {
		return itemModelMaps;
	}

	/**
	 * 権限マップゲッター.
	 *
	 * @param key メニューアイテムコード
	 * @return 権限情報
	 */
	public MenuitemInfoModel getItemModelMaps(String key) throws Exception {
		return this.itemModelMaps.get(key);
	}

	/**
	 * 権限マップセッター.
	 *
	 * @param itemModelMaps 権限マップ
	 */
	public void setItemModelMaps(HashMap<String, MenuitemInfoModel> itemModelMaps) {
		this.itemModelMaps = itemModelMaps;
	}

	/**
	 * 権限マップ更新.
	 *
	 * @param key メニューアイテムコード
	 * @param value 権限情報
	 */
	public void putItemModelMaps(String key, MenuitemInfoModel value) {
		this.itemModelMaps.put(key, value);
	}

	/**
	 * アプリバージョンゲッター.
	 *
	 * @return applicationVersion アプリバージョン
	 */
	public String getApplicationVersion() {
		return applicationVersion;
	}

	/**
	 * アプリバージョンセッター.
	 *
	 * @param applicationVersion アプリバージョン
	 */
	public void setApplicationVersion(String applicationVersion) {
		this.applicationVersion = applicationVersion;
	}

	/**
	 * 初期化処理.
	 */
	public void clear() {
		this.userId = null;
		this.userName = null;
		this.businessUnitCdStr = null;
		this.wso2ApiToken = null;
		this.validApprovalFlg = 0;
		this.role = 0;
		this.itemModelMaps = null;

		// 所属店舗
		this.belongStoreCd = null;
		// 担当店舗リスト
		this.chargeStoreCds.clear();
		// 企業名.
		this.businessUnitName = null;
		// (所属)店舗名.
		this.belongStoreName = null;
		// シークレットユーザフラグ
		this.secretUserFlag = 0;
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
	 * シークレットユーザフラグゲッター.
	 *
	 * @return 担当店舗シークレットユーザフラグ
	 */
	public short getSecretUserFlag() {
		return secretUserFlag;
	}

	/**
	 * シークレットユーザフラグセッター.
	 *
	 * @param secretUserFlag シークレットユーザフラグ
	 */
	public void setSecretUserFlag(short secretUserFlag) {
		this.secretUserFlag = secretUserFlag;
	}

	/**
	 * 企業ノードID.
	 */
	private String nodeId;

	/**
	 * 企業ノードIDゲッター
	 * @return 企業ノードID
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * 企業ノードIDセッター
	 * @param nodeId 企業ノードID
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 本部権限.
	 */
	private boolean homeStore;

	/**
	 * 本部権限ゲッター
	 * @return 本部権限
	 */
	public boolean getHomeStore() {
		return homeStore;
	}

	/**
	 * 本部権限セッター
	 * @param homeStore 本部権限
	 */
	public void setHomeStore(boolean homeStore) {
		this.homeStore = homeStore;
	}

	/**
	 * パスワード.
	 */
	private String passWord;

	/**
	 * パスワードゲッター
	 * @return パスワード
	 */
	public String getPassWord() {
		return passWord;
	}

	/**
	 * パスワードセッター
	 * @param passWord パスワード
	 */
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	// KSD V001.000 M 記載順を、確認の為並び替える（コメントも追加）、又、途中行への追加はコメントで判断可能にする
	// ■ユーザ管理
	private boolean CLOUDPOS_USER_EXECUTE;						// ユーザマスタ登録：起動
	private boolean CLOUDPOS_USER_DELETE;						// ユーザマスタ登録：削除
	private boolean CLOUDPOS_USER_UPDATE;						// ユーザマスタ登録：保存
	private boolean CLOUDPOS_USER_OTHER_1;						// ユーザマスタ登録：その他１（PWロック）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_EMPLOYEE_EXECUTE;					// 従業員コード印字：起動
	private boolean CLOUDPOS_EMPLOYEE_OTHER_1;					// 従業員コード印字：その他１（PDF出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_ACCESS_EXECUTE;					// アクセス権限登録：起動
	private boolean CLOUDPOS_ACCESS_UPDATE;						// アクセス権限登録：保存
	private boolean CLOUDPOS_ACCESS_OTHER_1;					// アクセス権限登録：その他１（CSV入力）
	private boolean CLOUDPOS_ACCESS_OTHER_2;					// アクセス権限登録：その他２（CSV出力）
	// ■店舗管理
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_GRP1_EXECUTE;						// 店舗グループ１登録：起動
	private boolean CLOUDPOS_GRP1_DELETE;						// 店舗グループ１登録：削除
	private boolean CLOUDPOS_GRP1_UPDATE;						// 店舗グループ１登録：保存
	private boolean CLOUDPOS_GRP2_EXECUTE;						// 店舗グループ２登録：起動
	private boolean CLOUDPOS_GRP2_DELETE;						// 店舗グループ２登録：削除
	private boolean CLOUDPOS_GRP2_UPDATE;						// 店舗グループ２登録：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_STORE_EXECUTE;						// 店舗マスタ登録：起動
	private boolean CLOUDPOS_STORE_DELETE;						// 店舗マスタ登録：削除
	private boolean CLOUDPOS_STORE_UPDATE;						// 店舗マスタ登録：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_STORE_COPY_EXECUTE;				// 店舗マスタコピー：起動
	private boolean CLOUDPOS_STORE_COPY_DELETE;					// 店舗マスタコピー：削除
	private boolean CLOUDPOS_STORE_COPY_UPDATE;					// 店舗マスタコピー：保存
	private boolean CLOUDPOS_STORE_COPY_OTHER_1;				// 店舗マスタコピー：その他１（ｺﾋﾟｰ実行）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■端末管理
	private boolean CLOUDPOS_DEVICE_EXECUTE;					// 端末設定：起動
	private boolean CLOUDPOS_DEVICE_DELETE;						// 端末設定：削除
	private boolean CLOUDPOS_DEVICE_UPDATE;						// 端末設定：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_DENOMINATION_EXECUTE;				// 金種設定：起動
	private boolean CLOUDPOS_DENOMINATION_UPDATE;				// 金種設定：保存
	private boolean CLOUDPOS_DENOMINATION_OTHER_1;				// 金種設定：その他１（ｺﾋﾟｰ実行）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_STATUS_EXECUTE;					// 状態管理：起動
	// ■監査
	private boolean CLOUDPOS_JOURNAL_EXECUTE;					// 電子ジャーナル：起動
	private boolean CLOUDPOS_JOURNAL_UPDATE;					// 電子ジャーナル：保存
	private boolean CLOUDPOS_JOURNAL_OTHER_1;					// 電子ジャーナル：その他１（PDF出力）
	private boolean CLOUDPOS_REPORT_EXECUTE;					// POSレポート出力：起動
	private boolean CLOUDPOS_REPORT_OTHER_1;					// POSレポート出力：その他１（PDF出力）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_AUDIT_EXECUTE;						// 監査レポート出力：起動
	private boolean CLOUDPOS_AUDIT_OTHER_1;						// 監査レポート出力：その他１（PDF出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■商品構成
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_PRODUCT_DIVISIONS_EXECUTE;			// 商品分類階層設定：起動
	private boolean CLOUDPOS_PRODUCT_DIVISIONS_UPDATE;			// 商品分類階層設定：保存
	private boolean CLOUDPOS_CATALOG_EXECUTE;					// 商品構成マスタ登録：起動
	private boolean CLOUDPOS_CATALOG_DELETE;					// 商品構成マスタ登録：削除
	private boolean CLOUDPOS_CATALOG_UPDATE;					// 商品構成マスタ登録：保存
	private boolean CLOUDPOS_CATALOG_OTHER_1;					// 商品構成マスタ登録：その他１（CSV入力）
	private boolean CLOUDPOS_CATALOG_OTHER_2;					// 商品構成マスタ登録：その他２（CSV出力）
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_ITEM_EXECUTE;						// 商品マスタ登録：起動
	private boolean CLOUDPOS_ITEM_DELETE;						// 商品マスタ登録：削除
	private boolean CLOUDPOS_ITEM_UPDATE;						// 商品マスタ登録：保存
	private boolean CLOUDPOS_ITEM_OTHER_1;						// 商品マスタ登録：その他１（CSV入力）
	private boolean CLOUDPOS_ITEM_OTHER_2;						// 商品マスタ登録：その他２（CSV出力）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_RESTAURANT_SCP_EXECUTE;			// 飲食オーダーガイダンス設定：起動
	private boolean CLOUDPOS_RESTAURANT_SCP_DELETE;				// 飲食オーダーガイダンス設定：削除
	private boolean CLOUDPOS_RESTAURANT_SCP_UPDATE;				// 飲食オーダーガイダンス設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_PRESET_EXECUTE;					// プリセットマスタ：起動
	private boolean CLOUDPOS_PRESET_DELETE;						// プリセットマスタ：削除
	private boolean CLOUDPOS_PRESET_UPDATE;						// プリセットマスタ：保存
	private boolean CLOUDPOS_PRESET_OTHER_1;					// プリセットマスタ：その他１（企画ｺﾋﾟｰ）
	private boolean CLOUDPOS_PRESET_OTHER_2;					// プリセットマスタ：その他２（運用確認）
	// ■売価変更
	private boolean CLOUDPOS_PRICE_EXECUTE;						// 売価変更：起動
	private boolean CLOUDPOS_PRICE_DELETE;						// 売価変更：削除
	private boolean CLOUDPOS_PRICE_UPDATE;						// 売価変更：保存
	private boolean CLOUDPOS_PRICE_OTHER_1;						// 売価変更：その他１（出力）
	// ■クラウドPOS運用設定
	private boolean CLOUDPOS_BARCODE_EXECUTE;					// バーコードフラグ設定：起動
	private boolean CLOUDPOS_BARCODE_DELETE;					// バーコードフラグ設定：削除
	private boolean CLOUDPOS_BARCODE_UPDATE;					// バーコードフラグ設定：保存
	private boolean CLOUDPOS_TRANSACTION_EXECUTE;				// 取引別名称設定：起動
	private boolean CLOUDPOS_TRANSACTION_DELETE;				// 取引別名称設定：削除
	private boolean CLOUDPOS_TRANSACTION_UPDATE;				// 取引別名称設定：保存
	private boolean CLOUDPOS_REVENUE_STAMP_EXECUTE;				// 収入印紙一括納付設定：起動
	private boolean CLOUDPOS_REVENUE_STAMP_DELETE;				// 収入印紙一括納付設定：削除
	private boolean CLOUDPOS_REVENUE_STAMP_UPDATE;				// 収入印紙一括納付設定：保存
	private boolean CLOUDPOS_OPERATION_EXECUTE;					// 運用設定：起動
	private boolean CLOUDPOS_OPERATION_DELETE;					// 運用設定：削除
	private boolean CLOUDPOS_OPERATION_UPDATE;					// 運用設定：保存
	private boolean CLOUDPOS_STORE_OPERATION_EXECUTE;			// 店別運用設定：起動
	private boolean CLOUDPOS_STORE_OPERATION_DELETE;			// 店別運用設定：削除
	private boolean CLOUDPOS_STORE_OPERATION_UPDATE;			// 店別運用設定：保存
	private boolean CLOUDPOS_RECEIPT_EXECUTE;					// レシート設定：起動
	private boolean CLOUDPOS_RECEIPT_DELETE;					// レシート設定：削除
	private boolean CLOUDPOS_RECEIPT_UPDATE;					// レシート設定：保存
	private boolean CLOUDPOS_RECEIPT_OTHER_1;					// レシート設定：その他１（企画ｺﾋﾟｰ）
	private boolean CLOUDPOS_RECEIPT_OTHER_2;					// レシート設定：その他２（企画確認）
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	private boolean CLOUDPOS_TAX_EXECUTE;						// 税率設定：起動
	private boolean CLOUDPOS_TAX_DELETE;						// 税率設定：削除
	private boolean CLOUDPOS_TAX_UPDATE;						// 税率設定：保存
	private boolean CLOUDPOS_TIME_EXECUTE;						// 時間帯設定：起動
	private boolean CLOUDPOS_TIME_DELETE;						// 時間帯設定：削除
	private boolean CLOUDPOS_TIME_UPDATE;						// 時間帯設定：保存
	private boolean CLOUDPOS_RESTAURANT_CONNECTNAME_EXECUTE;	// OES連携名称設定：起動
	private boolean CLOUDPOS_RESTAURANT_CONNECTNAME_UPDATE;		// OES連携名称設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// ■クラウドPOS店舗運用設定
	private boolean CLOUDPOS_OPERATION_BTN_EXECUTE;				// 操作ボタン設定：起動
	private boolean CLOUDPOS_OPERATION_BTN_UPDATE;				// 操作ボタン設定：保存
	private boolean CLOUDPOS_TIGHTENING_BTN_EXECUTE;			// 締めボタン設定：起動
	private boolean CLOUDPOS_TIGHTENING_BTN_DELETE;				// 締めボタン設定：削除
	private boolean CLOUDPOS_TIGHTENING_BTN_UPDATE;				// 締めボタン設定：保存
	// KSD V001.000 AS 追加業務のアクセス権取得追加
	// ■全店共通設定
	private boolean CLOUDPOS_EQUIPMENT_EXECUTE;					// 機材マスタ設定：起動
	private boolean CLOUDPOS_EQUIPMENT_DELETE;					// 機材マスタ設定：削除
	private boolean CLOUDPOS_EQUIPMENT_UPDATE;					// 機材マスタ設定：保存
	private boolean CLOUDPOS_MODEL_EXECUTE;						// 機種設備マスタ設定：起動
	private boolean CLOUDPOS_MODEL_DELETE;						// 機種設備マスタ設定：削除
	private boolean CLOUDPOS_MODEL_UPDATE;						// 機種設備マスタ設定：保存
	private boolean CLOUDPOS_AGE_DIVISION_EXECUTE;				// 年齢区分マスタ設定：起動
	private boolean CLOUDPOS_AGE_DIVISION_DELETE;				// 年齢区分マスタ設定：削除
	private boolean CLOUDPOS_AGE_DIVISION_UPDATE;				// 年齢区分マスタ設定：保存
	private boolean CLOUDPOS_MEMBER_RANK_EXECUTE;				// 会員ランクマスタ設定：起動
	private boolean CLOUDPOS_MEMBER_RANK_DELETE;				// 会員ランクマスタ設定：削除
	private boolean CLOUDPOS_MEMBER_RANK_UPDATE;				// 会員ランクマスタ設定：保存
	// ■店舗固有設備設定
	private boolean CLOUDPOS_ROOM_EXECUTE;						// 部屋情報マスタ設定：起動
	private boolean CLOUDPOS_ROOM_DELETE;						// 部屋情報マスタ設定：削除
	private boolean CLOUDPOS_ROOM_UPDATE;						// 部屋情報マスタ設定：保存
	private boolean CLOUDPOS_ROOM_RELATION_EXECUTE;				// 部屋関連情報マスタ設定：起動
	private boolean CLOUDPOS_ROOM_RELATION_DELETE;				// 部屋関連情報マスタ設定：削除
	private boolean CLOUDPOS_ROOM_RELATION_UPDATE;				// 部屋関連情報マスタ設定：保存
	private boolean CLOUDPOS_ROOM_SUB_EXECUTE;					// 部屋情報サブ設定：起動
	private boolean CLOUDPOS_ROOM_SUB_UPDATE;					// 部屋情報サブ設定：保存
	private boolean CLOUDPOS_ROOM_SUB_OTHER_1;					// 部屋情報サブ設定：その他１（ｺﾋﾟｰ）
	private boolean CLOUDPOS_CODEPAY_EXECUTE;					// コード決済通信マスタ設定：起動
	private boolean CLOUDPOS_CODEPAY_UPDATE;					// コード決済通信マスタ設定：保存
	private boolean CLOUDPOS_TARIFF_EXECUTE;					// 料金表表示マスタ設定：起動
	private boolean CLOUDPOS_TARIFF_DELETE;						// 料金表表示マスタ設定：削除
	private boolean CLOUDPOS_TARIFF_UPDATE;						// 料金表表示マスタ設定：保存
	// ■店舗固有POS設定
	private boolean CLOUDPOS_TICKET_EXECUTE;					// 券種マスタ設定：起動
	private boolean CLOUDPOS_TICKET_DELETE;						// 券種マスタ設定：削除
	private boolean CLOUDPOS_TICKET_UPDATE;						// 券種マスタ設定：保存
	private boolean CLOUDPOS_COMPLIANCE_EXECUTE;				// コンプライアンス情報マスタ設定：起動
	private boolean CLOUDPOS_COMPLIANCE_UPDATE;					// コンプライアンス情報マスタ設定：保存
	private boolean CLOUDPOS_SELFPOS_EXECUTE;					// セルフPOSマスタ設定：起動
	private boolean CLOUDPOS_SELFPOS_UPDATE;					// セルフPOSマスタ設定：保存
	// ■店舗固有料金設定
	private boolean CLOUDPOS_WEEKDAY_DIVISION_EXECUTE;			// 曜日区分マスタ設定：起動
	private boolean CLOUDPOS_WEEKDAY_DIVISION_DELETE;			// 曜日区分マスタ設定：削除
	private boolean CLOUDPOS_WEEKDAY_DIVISION_UPDATE;			// 曜日区分マスタ設定：保存
	private boolean CLOUDPOS_CALENDER_EXECUTE;					// カレンダーマスタ設定：起動
	private boolean CLOUDPOS_CALENDER_UPDATE;					// カレンダーマスタ設定：保存
	private boolean CLOUDPOS_COURSE_RATE_EXECUTE;				// コース料金設定：起動
	private boolean CLOUDPOS_COURSE_RATE_UPDATE;				// コース料金設定：保存
	private boolean CLOUDPOS_COURSE_RATE_OTHER_1;				// コース料金設定：その他１（ｺﾋﾟｰ）
	private boolean CLOUDPOS_DRINKCOURCE_EXECUTE;				// オプションマスタ設定：起動
	private boolean CLOUDPOS_DRINKCOURCE_DELETE;				// オプションマスタ設定：削除
	private boolean CLOUDPOS_DRINKCOURCE_UPDATE;				// オプションマスタ設定：保存
	private boolean CLOUDPOS_ROOMCOURCE_EXECUTE;				// コースマスタ設定：起動
	private boolean CLOUDPOS_ROOMCOURCE_DELETE;					// コースマスタ設定：削除
	private boolean CLOUDPOS_ROOMCOURCE_UPDATE;					// コースマスタ設定：保存
	// KSD V001.000 AE 追加業務のアクセス権取得追加
	// G001.00.0 Add-start
	private String PERMISSION_LIST_STRING;
	// G001.00.0 Add-end
}
