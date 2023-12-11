package com.ttss.prementenance.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230117 litie(Neusoft)     G001.00.0  issue課題#1088を対応します.
 */

/**
 * API関連の共通定数.
 *
 * @author TSS 小山田 峻登
 * @version 1.0.0
 */
@ConfigurationProperties(prefix = "api")
public class ApiContext {

	/**
	 * ベースURI.
	 */
	private String wso2CommonUrl;

	/**
	 * アプリバージョン.
	 */
	private String appVersion;

	/**
	 * URI:ＰＬＵ情報.
	 */
	private String plu;
	/**
	 * URI:単品マスタ.
	 */
	private String itemManagement;
	/**
	 * URI:単品マスタ初期化.
	 */
	private String itemInit;
	/**
	 * URI:クラスマスタ.
	 */
	private String classManagement;
	/**
	 * URI:クラスマスタ初期化.
	 */
	private String classInit;
	/**
	 * URI:部門マスタ.
	 */
	private String departmentsManagement;
	/**
	 * URI:部門マスタ初期化.
	 */
	private String departmentsInit;
	/**
	 * URI:ＧＰマスタ.
	 */
	private String gpManagement;
	/**
	 * URI:ＧＰマスタ初期化.
	 */
	private String gpInit;
	/**
	 * URI:システムオプション（商品管理）のオプション.
	 */
	private String sysoptionManagement;

	/**
	 * URI:企業マスタ.
	 */
	private String corporateManagement;
	/**
	 * URI:店舗マスタ.
	 */
	private String storeManagement;
	/**
	 * URI:ロールマスタ.
	 */
	private String roleManagement;
	/**
	 * URI:ユーザマスタ.
	 */
	private String userManagement;
	/**
	 * URI:メニューアイテムマスタ.
	 */
	private String menuitems;
	/**
	 * URI:税情報.
	 */
	private String taxManagement;
	/**
	 * URI:アカウントロックユーザ.
	 */
	private String userLock;
	/**
	 * URI:ログイン.
	 */
	private String userLogin;
	/**
	 * URI:パスワード更新.
	 */
	private String userPass;
	/**
	 * URI:アカウント区分.
	 */
	private String userStatus;

	/**
	 * URI:前捌き端末用プリセット情報.
	 */
	private String terminalpresetManagement;
	/**
	 * URI:プリセット情報.
	 */
	private String presetManagement;
	/**
	 * URI:プリセット企画マスタ.
	 */
	private String presetplanManagement;
	/**
	 * URI:アプリケーション管理マスタ.
	 */
	private String aplinfoManagement;
	/**
	 * URI:タブレット機種情報.
	 */
	private String terminalTablet;
	/**
	 * URI:端末情報.
	 */
	private String terminalinfoManagement;
	/**
	 * URI:バーコード解析.
	 */
	private String analyze;

	/**
	 * URI:プリセット画像一覧取得.
	 */
	private String presetimages;

	/**
	 * URI:税情報検索.
	 */
	private String taxes;

	/**
	 * URI:取引情報取得.
	 */
	private String transaction;

	/**
	 * URI:バーコード解析データ件数.
	 */
	private String barcodeCount;

	/**
	 * URI:商品管理データ件数.
	 */
	private String productCount;

	/**
	 * URI:前捌き取引管理データ件数.
	 */
	private String preTransactionCount;

	/**
	 * URI:エージェント管理データ件数.
	 */
	private String agentManagementCount;

	/**
	 * URI:企業・店舗管理データ件数.
	 */
	private String corporateStoreManagementCount;

	/**
	 * URI:端末管理データ件数.
	 */
	private String terminalCount;

	/**
	 * URI:バーコード解析データベースクリア.
	 */
	private String barcodeClear;

	/**
	 * URI:商品管理データベースクリア.
	 */
	private String productClear;

	/**
	 * URI:前捌き取引管理データベースクリア.
	 */
	private String preTransactionClear;

	/**
	 * URI:エージェント管理データベースクリア.
	 */
	private String agentManagementClear;

	/**
	 * URI:企業・店舗管理データベースクリア.
	 */
	private String corporateStoreManagementClear;

	/**
	 * URI:端末管理データベースクリア.
	 */
	private String terminalClear;

	/**
	 * URI:値引シール画像取得.
	 */
	private String discountstickerimage;

	/**
	 * URI:レスポンス:成功.
	 */
	private String responceSuccess;

	/**
	 * URI:変更計画取得
	 */
	private String changePlansRecords;

	/**
	 * URI:変更計画実行.
	 */
	private String changePlansExecute;

	/**
	 * URI:変更計画削除
	 */
	private String changePlansDelete;

	/**
	 * URI:構成情報一覧
	 */
	private String configurationsList;

	/**
	 * URI:構成情報
	 */
	private String configurationsNodes;

	/**
	 * URI:テーブル情報一覧
	 */
	private String tableList;

	/**
	 * URI:テーブル情報削除
	 */
	private String tableListDelete;

	/**
	 * URI:アクセス権限情報一覧
	 */
	private String permissionsList;

	/**
	 * URI:ConfigurationsMetadata取得
	 */
	private String configurationsMetadataGroup;

	/**
	 * URI:ＰＬＵ情報ゲッター.
	 *
	 * @return URI:ＰＬＵ情報
	 */
	public String getPlu() {
		return plu;
	}

	/**
	 * URI:ＰＬＵ情報セッター.
	 *
	 * @param plu URI:ＰＬＵ情報
	 */
	public void setPlu(String plu) {
		this.plu = plu;
	}

	/**
	 * URI:単品マスタゲッター.
	 *
	 * @return URI:単品マスタ
	 */
	public String getItemManagement() {
		return itemManagement;
	}

	/**
	 * URI:単品マスタセッター.
	 *
	 * @param itemManagement URI:単品マスタ
	 */
	public void setItemManagement(String itemManagement) {
		this.itemManagement = itemManagement;
	}

	/**
	 * URI:単品マスタ初期化ゲッター.
	 *
	 * @return URI:単品マスタ初期化
	 */
	public String getItemInit() {
		return itemInit;
	}

	/*
	 * URI:店舗グループマスタ検索.
	 */
	private String storeGroups;

	/*
	 * URI:店舗運用形態検索.
	 */
	private String operationalForm;

	/**
	 * URI:共通表示情報.
	 */
	private String commonDisplay;

	/**
	 * URI:システムオプション企業管理検索.
	 */
	private String systemOptions;

	/**
	 * URI:アプリケーション情報検索.
	 */
	private String applicationinfo;

	/**
	 * URI:企業マスタ検索.
	 */
	private String corporates;

	/**
	 * URI:契約サービス親マスタ.
	 */
	private String serviceParent;

	/**
	 * URI:システムオプション.
	 */
	private String systemoptionsManagement;

	/**
	 * URI:セルフプリセット情報.
	 */
	private String presetCaptureManagement;

	/**
	 * URI:プリセット情報企画.
	 */
	private String presetPlanCopyManagement;

	/**
	 * URI:プリセット画像.
	 */
	private String presetimagesManagement;

	/**
	 * URI:契約サービス子マスタ.
	 */
	private String serviceChild;

	/**
	 * URI:契約サービス管理マスタ.
	 */
	private String serviceManagement;

	/**
	 * URI:データ保持設定.
	 */
	private String dataRetentionPeriods;

	/**
	 * URI:利用料金情報取得.
	 */
	private String usageChargeInfo;

	/**
	 * URI:取引ヘッダー件数取得.
	 */
	private String trnHeaderCount;

	/**
	 * URI:システムオプション(端末管理).
	 */
	private String terminalSystemOptions;

	/**
	 * URI:プリセット情報店舗コピー.
	 */
	private String terminalPresetInfoStoreCopy;

	/**
	 * URI:バーコード解析のデータベース.
	 */
	private String barcodeManagement;

	/**
	 * URI:商品管理のデータベース.
	 */
	private String preProductManagement;

	/**
	 * URI:前捌き取引管理のデータベース.
	 */
	private String preTransactionManagement;

	/**
	 * URI:エージェント管理のデータベース.
	 */
	private String agentManagement;

	/**
	 * URI:企業・店舗管理のデータベース.
	 */
	private String corporateStoreManagement;

	/**
	 * URI:端末管理のデータベース.
	 */
	private String terminalManagement;

	/**
	 * URI:ヘルプ用PDFファイル取得.
	 */
	private String helppdf;

	/**
	 * URI:契約サービス.
	 */
	private String contractService;

	/**
	 * URI:企業・店舗管理のバケット.
	 */
	private String corporateStoreBucket;

	/**
	 * URI:端末管理のバケット.
	 */
	private String terminalBucket;

	/**
	 * URI:単品マスタ初期化セッター.
	 *
	 * @param itemInit URI:単品マスタ初期化
	 */
	public void setItemInit(String itemInit) {
		this.itemInit = itemInit;
	}

	/**
	 * URI:クラスマスタゲッター.
	 *
	 * @return URI:クラスマスタ
	 */
	public String getClassManagement() {
		return classManagement;
	}

	/**
	 * URI:クラスマスタセッター.
	 *
	 * @param classManagement URI:クラスマスタ
	 */
	public void setClassManagement(String classManagement) {
		this.classManagement = classManagement;
	}

	/**
	 * URI:クラスマスタ初期化ゲッター.
	 *
	 * @return URI:クラスマスタ初期化
	 */
	public String getClassInit() {
		return classInit;
	}

	/**
	 * URI:クラスマスタ初期化セッター.
	 *
	 * @param classInit URI:クラスマスタ初期化ゲッター.
	 */
	public void setClassInit(String classInit) {
		this.classInit = classInit;
	}

	/**
	 * URI:部門マスタゲッター.
	 *
	 * @return URI:部門マスタ
	 */
	public String getDepartmentsManagement() {
		return departmentsManagement;
	}

	/**
	 * URI:部門マスタセッター.
	 *
	 * @param departmentsManagement URI:部門マスタ
	 */
	public void setDepartmentsManagement(String departmentsManagement) {
		this.departmentsManagement = departmentsManagement;
	}

	/**
	 * URI:部門マスタ初期化ゲッター.
	 *
	 * @return URI:部門マスタ初期化
	 */
	public String getDepartmentsInit() {
		return departmentsInit;
	}

	/**
	 * URI:部門マスタ初期化セッター.
	 *
	 * @param departmentsInit URI:部門マスタ初期化
	 */
	public void setDepartmentsInit(String departmentsInit) {
		this.departmentsInit = departmentsInit;
	}

	/**
	 * URI:ＧＰマスタゲッター.
	 *
	 * @return URI:ＧＰマスタ
	 */
	public String getGpManagement() {
		return gpManagement;
	}

	/**
	 * URI:ＧＰマスタセッター.
	 *
	 * @param gpManagement URI:ＧＰマスタ
	 */
	public void setGpManagement(String gpManagement) {
		this.gpManagement = gpManagement;
	}

	/**
	 * URI:ＧＰマスタ初期化ゲッター.
	 *
	 * @return URI:ＧＰマスタ初期化
	 */
	public String getGpInit() {
		return gpInit;
	}

	/**
	 * URI:ＧＰマスタ初期化セッター.
	 *
	 * @param gpInit URI:ＧＰマスタ初期化
	 */
	public void setGpInit(String gpInit) {
		this.gpInit = gpInit;
	}

	/**
	 * URI:システムオプション（商品管理）のオプションゲッター.
	 *
	 * @return URI:システムオプション（商品管理）のオプション
	 */
	public String getSysoptionManagement() {
		return sysoptionManagement;
	}

	/**
	 * URI:システムオプション（商品管理）のオプションセッター.
	 *
	 * @param sysoptionManagement URI:システムオプション（商品管理）のオプション
	 */
	public void setSysoptionManagement(String sysoptionManagement) {
		this.sysoptionManagement = sysoptionManagement;
	}

	/*
	 * ベースURIゲッター.
	 *
	 * @return ベースURI
	 */
	public String getWso2CommonUrl() {
		return wso2CommonUrl;
	}

	/**
	 * ベースURIセッター.
	 *
	 * @param wso2CommonUrl ベースURI
	 */
	public void setWso2CommonUrl(String wso2CommonUrl) {
		this.wso2CommonUrl = wso2CommonUrl;
	}

	/**
	 * URI:企業マスタゲッター.
	 *
	 * @return URI:企業マスタ
	 */
	public String getCorporateManagement() {
		return corporateManagement;
	}

	/**
	 * URI:企業マスタセッター.
	 *
	 * @param corporateManagement URI:企業マスタ
	 */
	public void setCorporateManagement(String corporateManagement) {
		this.corporateManagement = corporateManagement;
	}

	/**
	 * URI:店舗マスタゲッター.
	 *
	 * @return URI:店舗マスタ
	 */
	public String getStoreManagement() {
		return storeManagement;
	}

	/**
	 * URI:店舗マスタセッター.
	 *
	 * @param storeManagement URI:店舗マスタ
	 */
	public void setStoreManagement(String storeManagement) {
		this.storeManagement = storeManagement;
	}

	/**
	 * URI:ロールマスタゲッター.
	 *
	 * @return URI:ロールマスタ
	 */
	public String getRoleManagement() {
		return roleManagement;
	}

	/**
	 * URI:ロールマスタセッター.
	 *
	 * @param roleManagement URI:ロールマスタ
	 */
	public void setRoleManagement(String roleManagement) {
		this.roleManagement = roleManagement;
	}

	/**
	 * URI:ユーザマスタゲッター.
	 *
	 * @return URI:ユーザマスタ
	 */
	public String getUserManagement() {
		return userManagement;
	}

	/**
	 * URI:ユーザマスタセッター.
	 *
	 * @param userManagement URI:ユーザマスタ
	 */
	public void setUserManagement(String userManagement) {
		this.userManagement = userManagement;
	}

	/**
	 * URI:メニューアイテムマスタゲッター.
	 *
	 * @return URI:メニューアイテムマスタ
	 */
	public String getMenuitems() {
		return menuitems;
	}

	/**
	 * URI:メニューアイテムマスタセッター.
	 *
	 * @param menuitems URI:メニューアイテムマスタ
	 */
	public void setMenuitems(String menuitems) {
		this.menuitems = menuitems;
	}

	/**
	 * URI:税情報ゲッター.
	 *
	 * @return URI:税情報
	 */
	public String getTaxManagement() {
		return taxManagement;
	}

	/**
	 * URI:税情報セッター.
	 *
	 * @param taxManagement URI:税情報
	 */
	public void setTaxManagement(String taxManagement) {
		this.taxManagement = taxManagement;
	}

	/**
	 * URI:アカウントロックユーザゲッター.
	 *
	 * @return URI:アカウントロックユーザ
	 */
	public String getUserLock() {
		return userLock;
	}

	/**
	 * URI:アカウントロックユーザセッター.
	 *
	 * @param userLock URI:アカウントロックユーザ
	 */
	public void setUserLock(String userLock) {
		this.userLock = userLock;
	}

	/**
	 * URI:ログインゲッター.
	 *
	 * @return URI:ログイン
	 */
	public String getUserLogin() {
		return userLogin;
	}

	/**
	 * URI:ログインゲッター.
	 *
	 * @param userId ユーザコード
	 * @return URI:ログイン
	 */
	public String getUserLogin(String userId) {
		return String.format(userLogin, userId);
	}

	/**
	 * URI:ログインセッター.
	 *
	 * @param userLogin URI:ログイン
	 */
	public void setUserLogin(String userLogin) {
		this.userLogin = userLogin;
	}

	/**
	 * URI:パスワード更新ゲッター.
	 *
	 * @return URI:パスワード更新
	 */
	public String getUserPass() {
		return userPass;
	}

	/**
	 * URI:パスワード更新ゲッター.
	 *
	 * @param userId ユーザコード
	 * @return URI:パスワード更新
	 */
	public String getUserPass(String userId) {
		return String.format(userPass, userId);
	}

	/**
	 * URI:パスワード更新セッター.
	 *
	 * @param userPass URI:パスワード更新
	 */
	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}

	/**
	 * URI:アカウント区分ゲッター.
	 *
	 * @return URI:アカウント区分
	 */
	public String getUserStatus() {
		return userStatus;
	}

	/**
	 * URI:アカウント区分セッター.
	 *
	 * @param userStatus URI:アカウント区分
	 */
	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	/**
	 * URI:前捌き端末用プリセット情報ゲッター.
	 *
	 * @return URI:前捌き端末用プリセット情報
	 */
	public String getTerminalpresetManagement() {
		return terminalpresetManagement;
	}

	/**
	 * URI:前捌き端末用プリセット情報セッター.
	 *
	 * @param terminalpresetManagement URI:前捌き端末用プリセット情報
	 */
	public void setTerminalpresetManagement(String terminalpresetManagement) {
		this.terminalpresetManagement = terminalpresetManagement;
	}

	/**
	 * URI:プリセット情報ゲッター.
	 *
	 * @return URI:プリセット情報
	 */
	public String getPresetManagement() {
		return presetManagement;
	}

	/**
	 * URI:プリセット情報セッター.
	 *
	 * @param presetManagement URI:プリセット情報
	 */
	public void setPresetManagement(String presetManagement) {
		this.presetManagement = presetManagement;
	}

	/**
	 * URI:プリセット企画マスタ.
	 *
	 * @return URI:プリセット企画マスタ
	 */
	public String getPresetplanManagement() {
		return presetplanManagement;
	}

	/**
	 * URI:プリセット企画マスタセッター.
	 *
	 * @param presetplanManagement URI:プリセット企画マスタ
	 */
	public void setPresetplanManagement(String presetplanManagement) {
		this.presetplanManagement = presetplanManagement;
	}

	/**
	 * URI:アプリケーション管理マスタゲッター.
	 *
	 * @return URI:アプリケーション管理マスタ
	 */
	public String getAplinfoManagement() {
		return aplinfoManagement;
	}

	/**
	 * URI:アプリケーション管理マスタセッター.
	 *
	 * @param aplinfoManagement URI:アプリケーション管理マスタ
	 */
	public void setAplinfoManagement(String aplinfoManagement) {
		this.aplinfoManagement = aplinfoManagement;
	}

	/**
	 * URI:タブレット機種情報ゲッター.
	 *
	 * @return URI:タブレット機種情報
	 */
	public String getTerminalTablet() {
		return terminalTablet;
	}

	/**
	 * URI:タブレット機種情報セッター.
	 *
	 * @param terminalTablet URI:タブレット機種情報
	 */
	public void setTerminalTablet(String terminalTablet) {
		this.terminalTablet = terminalTablet;
	}

	/**
	 * URI:端末情報ゲッター.
	 *
	 * @return URI:端末情報
	 */
	public String getTerminalinfoManagement() {
		return terminalinfoManagement;
	}

	/**
	 * URI:端末情報セッター.
	 *
	 * @param terminalinfoManagement URI:端末情報
	 */
	public void setTerminalinfoManagement(String terminalinfoManagement) {
		this.terminalinfoManagement = terminalinfoManagement;
	}

	/**
	 * URI:バーコード解析ゲッター.
	 *
	 * @return URI:バーコード解析
	 */
	public String getAnalyze() {
		return analyze;
	}

	/**
	 * URI:バーコード解析セッター.
	 *
	 * @param analyze URI:バーコード解析
	 */
	public void setAnalyze(String analyze) {
		this.analyze = analyze;
	}

	/**
	 * URI:プリセット画像一覧取得ゲッター.
	 *
	 * @return URI:プリセット画像一覧取得
	 */
	public String getPresetimages() {
		return presetimages;
	}

	/**
	 * URI:プリセット画像一覧取得セッター.
	 *
	 * @param presetimages URI:プリセット画像一覧取得
	 */
	public void setPresetimages(String presetimages) {
		this.presetimages = presetimages;
	}

	/**
	 * URI:税情報検索ゲッター.
	 *
	 * @return URI:税情報検索
	 */
	public String getTaxes() {
		return taxes;
	}

	/**
	 * URI:税情報検索セッター.
	 *
	 * @param taxes URI:税情報検索
	 */
	public void setTaxes(String taxes) {
		this.taxes = taxes;
	}

	/**
	 * URI:店舗グループ検索ゲッター.
	 *
	 * @return URI:店舗グループ検索
	 */
	public String getStoreGroups() {
		return storeGroups;
	}

	/**
	 * URI:店舗グループ検索セッター.
	 *
	 * @param storeGroups URI:店舗グループ検索
	 */
	public void setStoreGroups(String storeGroups) {
		this.storeGroups = storeGroups;
	}

	/**
	 * URI:店舗運用形態検索ゲッター.
	 *
	 * @return URI:店舗運用形態検索
	 */
	public String getOperationalForm() {
		return operationalForm;
	}

	/**
	 * URI:店舗運用形態検索セッター.
	 *
	 * @param operationalForm URI:店舗運用形態検索
	 */
	public void setOperationalForm(String operationalForm) {
		this.operationalForm = operationalForm;
	}

	/*
	 * URI:共通表示情報ゲッター.
	 *
	 * @return URI:共通表示情報
	 */
	public String getCommonDisplay() {
		return commonDisplay;
	}

	/**
	 * URI:共通表示情報セッター.
	 *
	 * @param commonDisplay URI:共通表示情報
	 */
	public void setCommonDisplay(String commonDisplay) {
		this.commonDisplay = commonDisplay;
	}

	/**
	 * URI:システムオプション企業管理検索ゲッター.
	 *
	 * @return URI:システムオプション企業管理検索
	 */
	public String getSystemOptions() {
		return systemOptions;
	}

	/**
	 * URI:システムオプション企業管理検索セッター.
	 *
	 * @param systemOptions URI:システムオプション企業管理検索
	 */
	public void setSystemOptions(String systemOptions) {
		this.systemOptions = systemOptions;
	}

	/**
	 * URI:アプリケーション情報検索ゲッター.
	 *
	 * @return URI:アプリケーション情報検索
	 */
	public String getApplicationinfo() {
		return applicationinfo;
	}

	/**
	 * URI:アプリケーション情報検索セッター.
	 *
	 * @param applicationinfo URI:アプリケーション情報検索
	 */
	public void setApplicationinfo(String applicationinfo) {
		this.applicationinfo = applicationinfo;
	}

	/**
	 * URI:企業マスタ検索ゲッター.
	 *
	 * @return URI:企業マスタ検索
	 */
	public String getCorporates() {
		return corporates;
	}

	/**
	 * URI:企業マスタ検索セッター.
	 *
	 * @param configurations_list URI:企業マスタ検索
	 */
	public void setCorporates(String configurations_list) {
		this.corporates = configurations_list;
	}

	/**
	 * URI:利用料金情報取得ゲッター.
	 *
	 * @return URI:利用料金情報取得
	 */
	public String getUsageChargeInfo() {
		return usageChargeInfo;
	}

	/**
	 * URI:利用料金情報取得セッター.
	 *
	 * @param usageChargeInfo URI:利用料金情報取得
	 */
	public void setUsageChargeInfo(String usageChargeInfo) {
		this.usageChargeInfo = usageChargeInfo;
	}

	/**
	 * URI:取引ヘッダー件数取得ゲッター.
	 *
	 * @return URI:取引ヘッダー件数取得
	 */
	public String getTrnHeaderCount() {
		return trnHeaderCount;
	}

	/**
	 * URI:取引ヘッダー件数取得セッター.
	 *
	 * @param trnHeaderCount URI:取引ヘッダー件数取得
	 */
	public void setTrnHeaderCount(String trnHeaderCount) {
		this.trnHeaderCount = trnHeaderCount;
	}

	/**
	 * URI:取引情報取得ゲッター.
	 *
	 * @return transaction
	 */
	public String getTransaction() {
		return transaction;
	}

	/**
	 * URI:取引情報取得セッター.
	 *
	 * @param transaction セットする transaction
	 */
	public void setTransaction(String transaction) {
		this.transaction = transaction;
	}

	/**
	 * URI:データ保持設定ゲッター.
	 *
	 * @return データ保持設定
	 */
	public String getDataRetentionPeriods() {
		return dataRetentionPeriods;
	}

	/**
	 * URI:データ保持設定セッター.
	 *
	 * @param dataRetentionPeriods URI:データ保持設定
	 */
	public void setDataRetentionPeriods(String dataRetentionPeriods) {
		this.dataRetentionPeriods = dataRetentionPeriods;
	}

	/**
	 * URI:契約サービス親マスタゲッター.
	 *
	 * @return URI:契約サービス親マスタ
	 */
	public String getServiceParent() {
		return serviceParent;
	}

	/**
	 * URI:契約サービス親マスタセッター.
	 *
	 * @param serviceParent URI:契約サービス親マスタ
	 */
	public void setServiceParent(String serviceParent) {
		this.serviceParent = serviceParent;
	}

	/**
	 * URI:システムオプションゲッター.
	 *
	 * @return URI:システムオプション
	 */
	public String getSystemoptionsManagement() {
		return systemoptionsManagement;
	}

	/**
	 * URI:システムオプションセッター.
	 *
	 * @param systemoptionsManagement URI:システムオプション
	 */
	public void setSystemoptionsManagement(String systemoptionsManagement) {
		this.systemoptionsManagement = systemoptionsManagement;
	}

	/**
	 * URI:セルフプリセット情報ゲッター.
	 *
	 * @return URI:セルフプリセット情報
	 */
	public String getPresetCaptureManagement() {
		return presetCaptureManagement;
	}

	/**
	 * URI:セルフプリセット情報セッター.
	 *
	 * @param presetCaptureManagement URI:セルフプリセット情報
	 */
	public void setPresetCaptureManagement(String presetCaptureManagement) {
		this.presetCaptureManagement = presetCaptureManagement;
	}

	/**
	 * URI:プリセット情報企画ゲッター.
	 *
	 * @param param パスパラメータ
	 *
	 * @return URI:プリセット情報企画
	 */
	public String getPresetPlanCopyManagement(String param) {
		return String.format(presetPlanCopyManagement, param);
	}

	/**
	 * URI:プリセット情報企画セッター.
	 *
	 * @param presetPlanCopyManagement URI:プリセット情報企画
	 */
	public void setPresetPlanCopyManagement(String presetPlanCopyManagement) {
		this.presetPlanCopyManagement = presetPlanCopyManagement;
	}

	/**
	 * URI:プリセット画像ゲッター.
	 *
	 * @return URI:プリセット画像
	 */
	public String getPresetimagesManagement() {
		return presetimagesManagement;
	}

	/**
	 * URI:プリセット画像セッター.
	 *
	 * @param presetimagesManagement URI:プリセット画像
	 */
	public void setPresetimagesManagement(String presetimagesManagement) {
		this.presetimagesManagement = presetimagesManagement;
	}

	/**
	 * URI:契約サービス子マスタゲッター.
	 *
	 * @return URI:契約サービス子マスタ
	 */
	public String getServiceChild() {
		return serviceChild;
	}

	/**
	 * URI:契約サービス子マスタセッター.
	 *
	 * @param serviceChild URI:契約サービス子マスタ
	 */
	public void setServiceChild(String serviceChild) {
		this.serviceChild = serviceChild;
	}

	/**
	 * URI:契約サービス管理マスタゲッター.
	 *
	 * @return URI:契約サービス管理マスタ
	 */
	public String getServiceManagement() {
		return serviceManagement;
	}

	/**
	 * URI:契約サービス管理マスタセッター.
	 *
	 * @param serviceManagement URI:契約サービス管理マスタ
	 */
	public void setServiceManagement(String serviceManagement) {
		this.serviceManagement = serviceManagement;
	}

	/**
	 * URI:バーコード解析データ件数ゲッター.
	 *
	 * @return URI:バーコード解析データ件数
	 */
	public String getBarcodeCount() {
		return barcodeCount;
	}

	/**
	 * URI:バーコード解析データ件数セッター.
	 *
	 * @param barcodeCount URI:バーコード解析データ件数
	 */
	public void setBarcodeCount(String barcodeCount) {
		this.barcodeCount = barcodeCount;
	}

	/**
	 * URI:商品管理データ件数ゲッター.
	 *
	 * @return URI:商品管理データ件数
	 */
	public String getProductCount() {
		return productCount;
	}

	/**
	 * URI:商品管理データ件数セッター.
	 *
	 * @param productCount URI:商品管理データ件数
	 */
	public void setProductCount(String productCount) {
		this.productCount = productCount;
	}

	/**
	 * URI:前捌き取引管理データ件数ゲッター.
	 *
	 * @return URI:前捌き取引管理データ件数
	 */
	public String getPreTransactionCount() {
		return preTransactionCount;
	}

	/**
	 * URI:前捌き取引管理データ件数セッター.
	 *
	 * @param preTransactionCount URI:前捌き取引管理データ件数
	 */
	public void setPreTransactionCount(String preTransactionCount) {
		this.preTransactionCount = preTransactionCount;
	}

	/**
	 * URI:エージェント管理データ件数ゲッター.
	 *
	 * @return URI:エージェント管理データ件数
	 */
	public String getAgentManagementCount() {
		return agentManagementCount;
	}

	/**
	 * URI:エージェント管理データ件数セッター.
	 *
	 * @param agentManagementCount URI:エージェント管理データ件数
	 */
	public void setAgentManagementCount(String agentManagementCount) {
		this.agentManagementCount = agentManagementCount;
	}

	/**
	 * URI:企業・店舗管理データ件数ゲッター.
	 *
	 * @return URI:企業・店舗管理データ件数
	 */
	public String getCorporateStoreManagementCount() {
		return corporateStoreManagementCount;
	}

	/**
	 * URI:企業・店舗管理データ件数セッター.
	 *
	 * @param corporateStoreManagementCount URI:企業・店舗管理データ件数
	 */
	public void setCorporateStoreManagementCount(String corporateStoreManagementCount) {
		this.corporateStoreManagementCount = corporateStoreManagementCount;
	}

	/**
	 * URI:端末管理データ件数ゲッター.
	 *
	 * @return URI:端末管理データ件数
	 */
	public String getTerminalCount() {
		return terminalCount;
	}

	/**
	 * URI:端末管理データ件数セッター.
	 *
	 * @param terminalCount URI:端末管理データ件数
	 */
	public void setTerminalCount(String terminalCount) {
		this.terminalCount = terminalCount;
	}

	/**
	 * URI:バーコード解析データベースクリアゲッター.
	 *
	 * @return URI:バーコード解析データベースクリア
	 */
	public String getBarcodeClear() {
		return barcodeClear;
	}

	/**
	 * URI:バーコード解析データベースクリアセッター.
	 *
	 * @param barcodeClear URI:バーコード解析データベースクリア
	 */
	public void setBarcodeClear(String barcodeClear) {
		this.barcodeClear = barcodeClear;
	}

	/**
	 * URI:商品管理データベースクリアゲッター.
	 *
	 * @return URI:商品管理データベースクリア
	 */
	public String getProductClear() {
		return productClear;
	}

	/**
	 * URI:商品管理データベースクリアセッター.
	 *
	 * @param productClear URI:商品管理データベースクリア
	 */
	public void setProductClear(String productClear) {
		this.productClear = productClear;
	}

	/**
	 * URI:前捌き取引管理データベースクリアゲッター.
	 *
	 * @return URI:前捌き取引管理データベースクリア
	 */
	public String getPreTransactionClear() {
		return preTransactionClear;
	}

	/**
	 * URI:前捌き取引管理データベースクリアセッター.
	 *
	 * @param preTransactionClear URI:前捌き取引管理データベースクリア
	 */
	public void setPreTransactionClear(String preTransactionClear) {
		this.preTransactionClear = preTransactionClear;
	}

	/**
	 * URI:エージェント管理データベースクリアゲッター.
	 *
	 * @return URI:エージェント管理データベースクリア
	 */
	public String getAgentManagementClear() {
		return agentManagementClear;
	}

	/**
	 * URI:エージェント管理データベースクリアセッター.
	 *
	 * @param agentManagementClear URI:エージェント管理データベースクリア
	 */
	public void setAgentManagementClear(String agentManagementClear) {
		this.agentManagementClear = agentManagementClear;
	}

	/**
	 * URI:企業・店舗管理データベースクリアゲッター.
	 *
	 * @return URI:企業・店舗管理データベースクリア
	 */
	public String getCorporateStoreManagementClear() {
		return corporateStoreManagementClear;
	}

	/**
	 * URI:企業・店舗管理データベースクリアセッター.
	 *
	 * @param corporateStoreManagementClear URI:企業・店舗管理データベースクリア
	 */
	public void setCorporateStoreManagementClear(String corporateStoreManagementClear) {
		this.corporateStoreManagementClear = corporateStoreManagementClear;
	}

	/**
	 * URI:端末管理データベースクリアゲッター.
	 *
	 * @return URI:端末管理データベースクリア
	 */
	public String getTerminalClear() {
		return terminalClear;
	}

	/**
	 * URI:端末管理データベースクリアセッター.
	 *
	 * @param terminalClear URI:端末管理データベースクリア
	 */
	public void setTerminalClear(String terminalClear) {
		this.terminalClear = terminalClear;
	}

	/**
	 * URI:システムオプション(端末管理)ゲッター.
	 *
	 * @return URI:システムオプション(端末管理)
	 */
	public String getTerminalSystemOptions() {
		return terminalSystemOptions;
	}

	/**
	 * URI:システムオプション(端末管理)セッター.
	 *
	 * @param terminalSystemOptions URI:システムオプション(端末管理)
	 */
	public void setTerminalSystemOptions(String terminalSystemOptions) {
		this.terminalSystemOptions = terminalSystemOptions;
	}

	/**
	 * URI:プリセット情報店舗コピーゲッター.
	 *
	 * @return URI:プリセット情報店舗コピー
	 */
	public String getTerminalPresetInfoStoreCopy() {
		return terminalPresetInfoStoreCopy;
	}

	/**
	 * URI:プリセット情報店舗コピーセッター.
	 *
	 * @param terminalPresetInfoStoreCopy URI:プリセット情報店舗コピー
	 */
	public void setTerminalPresetInfoStoreCopy(String terminalPresetInfoStoreCopy) {
		this.terminalPresetInfoStoreCopy = terminalPresetInfoStoreCopy;
	}

	/**
	 * URI:バーコード解析のデータベースゲッター.
	 *
	 * @return URI:バーコード解析のデータベース
	 */
	public String getBarcodeManagement() {
		return barcodeManagement;
	}

	/**
	 * URI:バーコード解析のデータベースセッター.
	 *
	 * @param barcodeManagement URI:バーコード解析のデータベース
	 */
	public void setBarcodeManagement(String barcodeManagement) {
		this.barcodeManagement = barcodeManagement;
	}

	/**
	 * URI:商品管理のデータベースゲッター.
	 *
	 * @return URI:商品管理のデータベース
	 */
	public String getPreProductManagement() {
		return preProductManagement;
	}

	/**
	 * URI:商品管理のデータベースセッター.
	 *
	 * @param preProductManagement URI:商品管理のデータベース
	 */
	public void setPreProductManagement(String preProductManagement) {
		this.preProductManagement = preProductManagement;
	}

	/**
	 * URI:前捌き取引管理のデータベースゲッター.
	 *
	 * @return URI:前捌き取引管理のデータベース
	 */
	public String getPreTransactionManagement() {
		return preTransactionManagement;
	}

	/**
	 * URI:前捌き取引管理のデータベースセッター.
	 *
	 * @param preTransactionManagement URI:商品管理のデータベース
	 */
	public void setPreTransactionManagement(String preTransactionManagement) {
		this.preTransactionManagement = preTransactionManagement;
	}

	/**
	 * URI:エージェント管理のデータベースゲッター.
	 *
	 * @return URI:エージェント管理のデータベース
	 */
	public String getAgentManagement() {
		return agentManagement;
	}

	/**
	 * URI:エージェント管理のデータベースセッター.
	 *
	 * @param agentManagement URI:エージェント管理のデータベース
	 */
	public void setAgentManagement(String agentManagement) {
		this.agentManagement = agentManagement;
	}

	/**
	 * URI:企業・店舗管理のデータベースゲッター.
	 *
	 * @return URI:企業・店舗管理のデータベース
	 */
	public String getCorporateStoreManagement() {
		return corporateStoreManagement;
	}

	/**
	 * URI:企業・店舗管理のデータベースセッター.
	 *
	 * @param corporateStoreManagement URI:企業・店舗管理のデータベース
	 */
	public void setCorporateStoreManagement(String corporateStoreManagement) {
		this.corporateStoreManagement = corporateStoreManagement;
	}

	/**
	 * URI:端末管理のデータベースゲッター.
	 *
	 * @return URI:端末管理のデータベース
	 */
	public String getTerminalManagement() {
		return terminalManagement;
	}

	/**
	 * URI:端末管理のデータベースセッター.
	 *
	 * @param terminalManagement URI:端末管理のデータベース
	 */
	public void setTerminalManagement(String terminalManagement) {
		this.terminalManagement = terminalManagement;
	}

	/**
	 * URI:契約サービスゲッター.
	 *
	 * @return URI:契約サービス
	 */
	public String getContractService() {
		return contractService;
	}

	/**
	 * URI:契約サービスセッター.
	 *
	 * @param contractService URI:契約サービス
	 */
	public void setContractService(String contractService) {
		this.contractService = contractService;
	}

	/**
	 * URI:企業・店舗管理のバケットゲッター.
	 *
	 * @return URI:企業・店舗管理のバケット
	 */
	public String getCorporateStoreBucket() {
		return corporateStoreBucket;
	}

	/**
	 * URI:企業・店舗管理のバケットセッター.
	 *
	 * @param corporateStoreBucket URI:企業・店舗管理のバケット
	 */
	public void setCorporateStoreBucket(String corporateStoreBucket) {
		this.corporateStoreBucket = corporateStoreBucket;
	}

	/**
	 * URI:端末管理のバケットゲッター.
	 *
	 * @return URI:端末管理のバケット
	 */
	public String getTerminalBucket() {
		return terminalBucket;
	}

	/**
	 * URI:端末管理のバケットセッター.
	 *
	 * @param terminalBucket URI:端末管理のバケット
	 */
	public void setTerminalBucket(String terminalBucket) {
		this.terminalBucket = terminalBucket;
	}

	/**
	 * URI:ヘルプ用PDFファイル取得ゲッター.
	 *
	 * @return URI:ヘルプ用PDFファイル取得
	 */
	public String getHelppdf() {
		return helppdf;
	}

	/**
	 * URI:ヘルプ用PDFファイル取得セッター.
	 *
	 * @param helppdf URI:ヘルプ用PDFファイル取得
	 */
	public void setHelppdf(String helppdf) {
		this.helppdf = helppdf;
	}

	/**
	 * URI:値引シール画像取得ゲッター.
	 *
	 * @return URI:値引シール画像取得
	 */
	public String getDiscountstickerimage() {
		return discountstickerimage;
	}

	/**
	 * URI:値引シール画像取得セッター.
	 *
	 * @param discountstickerimage URI:値引シール画像取得
	 */
	public void setDiscountstickerimage(String discountstickerimage) {
		this.discountstickerimage = discountstickerimage;
	}

	/**
	 * レスポンス成功ゲッター
	 *
	 * @return レスポンス成功
	 */
	public String getResponceSuccess() {
		return responceSuccess;
	}

	/**
	 * レスポンス成功INTゲッター
	 *
	 * @return レスポンス成功
	 */
	public int getResponceSuccessInt() {
		return Integer.parseInt(responceSuccess);
	}

	/**
	 * URI:レスポンス成功セッター.
	 *
	 * @param responceSuccess レスポンス成功
	 */
	public void setResponceSuccess(String responceSuccess) {
		this.responceSuccess = responceSuccess;
	}

	/**
	 * 変更計画取得ゲッター
	 *
	 * @return 変更計画取得
	 */
	public String getChangePlansRecords() {
		return changePlansRecords;
	}

	/**
	 * URI:変更計画取得セッター.
	 *
	 * @param changeplansRecords 変更計画取得
	 */
	public void setChangePlansRecords(String changePlansRecords) {
		this.changePlansRecords = changePlansRecords;
	}

	/**
	 * URI:変更計画取得
	 */
	private String changeplansrecordschangeplanname;

	/**
	 * URI:変更計画取得ゲッター
	 *
	 * @return URI:変更計画取得
	 */
	public String getChangeplansrecordschangeplanname() {
		return changeplansrecordschangeplanname;
	}

	/**
	 * URI:変更計画取得セッター
	 *
	 * @param changeplansrecordschangeplanname URI:変更計画取得
	 */
	public void setChangeplansrecordschangeplanname(String changeplansrecordschangeplanname) {
		this.changeplansrecordschangeplanname = changeplansrecordschangeplanname;
	}

	/**
	 * 変更計画実行ゲッター
	 *
	 * @return レスポンス成功
	 */
	public String getChangePlansExecute() {
		return changePlansExecute;
	}

	/**
	 * URI:変更計画実行セッター.
	 *
	 * @param changePlansExecute 変更計画実行
	 */
	public void setChangePlansExecute(String changePlansExecute) {
		this.changePlansExecute = changePlansExecute;
	}

	/**
	 * 変更計画削除ゲッター
	 *
	 * @return 変更計画削除
	 */
	public String getChangePlansDelete() {
		return changePlansDelete;
	}

	/**
	 * URI:変更計画削除セッター.
	 *
	 * @param changePlansDelete 変更計画削除
	 */
	public void setChangePlansDelete(String changePlansDelete) {
		this.changePlansDelete = changePlansDelete;
	}

	/**
	 * 構成情報一覧ゲッター
	 *
	 * @return 構成情報一覧
	 */
	public String getConfigurationsList() {
		return configurationsList;
	}

	/**
	 * URI:構成情報一覧セッター.
	 *
	 * @param configurationsList 構成情報一覧
	 */
	public void setConfigurationsList(String configurationsList) {
		this.configurationsList = configurationsList;
	}

	/**
	 * 構成情報ゲッター
	 *
	 * @return 構成情報
	 */
	public String getConfigurationsNodes() {
		return configurationsNodes;
	}

	/**
	 * URI:構成情報セッター.
	 *
	 * @param configurationsNodes 構成情報
	 */
	public void setConfigurationsNodes(String configurationsNodes) {
		this.configurationsNodes = configurationsNodes;
	}

	/**
	 * 実行結果確認周期
	 */
	private Integer changeplansconfirmcyclesec;

	/**
	 * 実行結果確認周期ゲッター
	 *
	 * @return 実行結果確認周期
	 */
	public Integer getChangeplansconfirmcyclesec() {
		return changeplansconfirmcyclesec;
	}

	/**
	 * 実行結果確認周期セッター
	 *
	 * @param changeplansconfirmcyclesec 実行結果確認周期
	 */
	public void setChangeplansconfirmcyclesec(Integer changeplansconfirmcyclesec) {
		this.changeplansconfirmcyclesec = changeplansconfirmcyclesec;
	}

	/**
	 * 実行結果確認タイムアウト
	 */
	private Integer changeplansconfirmtimeoutsec;

	/**
	 * 実行結果確認タイムアウトゲッター
	 *
	 * @return 実行結果確認タイムアウト
	 */
	public Integer getChangeplansconfirmtimeoutsec() {
		return changeplansconfirmtimeoutsec;
	}

	/**
	 * 実行結果確認タイムアウトセッター
	 *
	 * @param changeplansconfirmtimeoutsec 実行結果確認タイムアウト
	 */
	public void setChangeplansconfirmtimeoutsec(Integer changeplansconfirmtimeoutsec) {
		this.changeplansconfirmtimeoutsec = changeplansconfirmtimeoutsec;
	}

	/**
	 * URI:ログイン
	 */
	private String authorizationlogin;

	/**
	 * ログインゲッター
	 *
	 * @return ログイン
	 */
	public String getAuthorizationlogin() {
		return authorizationlogin;
	}

	/**
	 * URI:ログインセッター.
	 *
	 * @param authorizationlogin ログイン
	 */
	public void setAuthorizationlogin(String authorizationlogin) {
		this.authorizationlogin = authorizationlogin;
	}

	/**
	 * URI:ユーザ情報更新
	 */
	private String authorizationusers;

	/**
	 * ユーザ情報更新ゲッター
	 *
	 * @return ユーザ取得
	 */
	public String getAuthorizationusers() {
		return authorizationusers;
	}

	/**
	 * URI:ユーザ情報更新セッター.
	 *
	 * @param authorizationusers ユーザ情報更新
	 */
	public void setAuthorizationusers(String authorizationusers) {
		this.authorizationusers = authorizationusers;
	}

	/**
	 * URI:ユーザ情報削除
	 */
	private String authorizationusersdeleteuser;

	/**
	 * ユーザ情報削除ゲッター
	 *
	 * @return ユーザ取得
	 */
	public String getAuthorizationusersdeleteuser() {
		return authorizationusersdeleteuser;
	}

	/**
	 * URI:ユーザ情報削除セッター.
	 *
	 * @param authorizationusersdeleteuser ユーザ情報削除
	 */
	public void setAuthorizationusersdeleteuser(String authorizationusersdeleteuser) {
		this.authorizationusersdeleteuser = authorizationusersdeleteuser;
	}

	/**
	 * URI:ユーザ取得
	 */
	private String authorizationusersretrieve;

	/**
	 * ユーザ取得ゲッター
	 *
	 * @return ユーザ取得
	 */
	public String getAuthorizationusersretrieve() {
		return authorizationusersretrieve;
	}

	/**
	 * URI:ユーザ取得セッター.
	 *
	 * @param authorizationusersretrieve ユーザ取得
	 */
	public void setAuthorizationusersretrieve(String authorizationusersretrieve) {
		this.authorizationusersretrieve = authorizationusersretrieve;
	}

	/**
	 * URI:ユーザ情報問い合わせ
	 */
	private String authorizationusersquery;

	/**
	 * ユーザ情報問い合わせゲッター
	 *
	 * @return ユーザ情報問い合わせ
	 */
	public String getAuthorizationusersquery() {
		return authorizationusersquery;
	}

	/**
	 * URI:ユーザ情報問い合わせセッター.
	 *
	 * @param authorizationusersquery ユーザ情報問い合わせ
	 */
	public void setAuthorizationusersquery(String authorizationusersquery) {
		this.authorizationusersquery = authorizationusersquery;
	}

	/**
	 * URI:ロール取得
	 */
	private String authorizationusersrolesretrieve;

	/**
	 * ロール取得ゲッター
	 *
	 * @return ロール取得
	 */
	public String getAuthorizationusersrolesretrieve() {
		return authorizationusersrolesretrieve;
	}

	/**
	 * URI:ロール取得セッター.
	 *
	 * @param authorizationusersrolesretrieve ロール取得
	 */
	public void setAuthorizationusersrolesretrieve(String authorizationusersrolesretrieve) {
		this.authorizationusersrolesretrieve = authorizationusersrolesretrieve;
	}

	/**
	 * URI:ロール更新
	 */
	private String authorizationusersroles;

	/**
	 * ロール更新ゲッター
	 *
	 * @return ロール更新
	 */
	public String getAuthorizationusersroles() {
		return authorizationusersroles;
	}

	/**
	 * URI:ロール更新セッター.
	 *
	 * @param authorizationusersroles ロール更新
	 */
	public void setAuthorizationusersroles(String authorizationusersroles) {
		this.authorizationusersroles = authorizationusersroles;
	}

	/**
	 * URI:ユーザロール関係削除
	 * 
	 * @since [ISSUE 1169]
	 */
	@Setter
	@Getter
	private String authorizationUsersDeleteRoles;

	/**
	 * URI:デバイス情報取得/デバイス情報削除
	 */
	private String devicesdeviceid;

	/**
	 * デバイス情報取得/デバイス情報削除ゲッター
	 *
	 * @return デバイス情報取得/デバイス情報削除
	 */
	public String getDevicesdeviceid() {
		return devicesdeviceid;
	}

	/**
	 * URI:デバイス情報取得/デバイス情報削除セッター.
	 *
	 * @param devicesdeviceid デバイス情報取得/デバイス情報削除
	 */
	public void setDevicesdeviceid(String devicesdeviceid) {
		this.devicesdeviceid = devicesdeviceid;
	}

	/**
	 * URI:デバイス情報更新
	 */
	private String devices;

	/**
	 * デバイス情報更新ゲッター
	 *
	 * @return デバイス情報更新
	 */
	public String getDevices() {
		return devices;
	}

	/**
	 * URI:デバイス情報更新セッター.
	 *
	 * @param devices デバイス情報更新
	 */
	public void setDevices(String devices) {
		this.devices = devices;
	}

	/**
	 * URI:デバイス構成取得
	 */
	private String devicesnodenodeid;

	/**
	 * デバイス構成取得ゲッター
	 *
	 * @return デバイス構成取得
	 */
	public String getDevicesnodenodeid() {
		return devicesnodenodeid;
	}

	/**
	 * URI:デバイス構成取得セッター.
	 *
	 * @param devicesnodedeviceId デバイス構成取得
	 */
	public void setDevicesnodenodeid(String devicesnodenodeid) {
		this.devicesnodenodeid = devicesnodenodeid;
	}

	/**
	 * URI:デバイス情報照会
	 */
	private String devicesquery;

	/**
	 * デバイス情報照会ゲッター
	 *
	 * @return デバイス情報照会
	 */
	public String getDevicesquery() {
		return devicesquery;
	}

	/**
	 * URI:デバイス情報照会セッター.
	 *
	 * @param devicesquery デバイス情報照会
	 */
	public void setDevicesquery(String devicesquery) {
		this.devicesquery = devicesquery;
	}

	/**
	 * URI:エンドポイント状態の照会
	 */
	private String endpointstatusstatus;

	/**
	 * エンドポイント状態の照会ゲッター
	 *
	 * @return エンドポイント状態の照会
	 */
	public String getEndpointstatusstatus() {
		return endpointstatusstatus;
	}

	/**
	 * URI:エンドポイント状態の照会セッター.
	 *
	 * @param endpointstatusstatus エンドポイント状態の照会
	 */
	public void setEndpointstatusstatus(String endpointstatusstatus) {
		this.endpointstatusstatus = endpointstatusstatus;
	}

	/**
	 * URI:カタログ更新
	 */
	private String catalogs;

	/**
	 * URI:カタログ更新ゲッター
	 *
	 * @return URI:カタログ更新
	 */
	public String getCatalogs() {
		return catalogs;
	}

	/**
	 * URI:カタログ更新セッター
	 *
	 * @param catalogs URI:カタログ更新
	 */
	public void setCatalogs(String catalogs) {
		this.catalogs = catalogs;
	}

	/**
	 * URI:カタロググループ更新
	 */
	private String catalogsgroups;

	/**
	 * URI:カタロググループ更新ゲッター
	 *
	 * @return URI:カタロググループ更新
	 */
	public String getCatalogsgroups() {
		return catalogsgroups;
	}

	/**
	 * URI:カタロググループ更新セッター
	 *
	 * @param catalogsgroups URI:カタロググループ更新
	 */
	public void setCatalogsgroups(String catalogsgroups) {
		this.catalogsgroups = catalogsgroups;
	}

	/**
	 * URI:カタログアイテム一覧取得/カタログ_アイテム登録
	 */
	private String catalogscatalognameitems;

	/**
	 * URI:カタログアイテム一覧取得/カタログ_アイテム登録ゲッター
	 *
	 * @return URI:カタログアイテム一覧取得/カタログ_アイテム登録
	 */
	public String getCatalogscatalognameitems() {
		return catalogscatalognameitems;
	}

	/**
	 * URI:カタログアイテム一覧取得/カタログ_アイテム登録セッター
	 *
	 * @param catalogscatalognameitems URI:カタログアイテム一覧取得/カタログ_アイテム登録
	 */
	public void setCatalogscatalognameitems(String catalogscatalognameitems) {
		this.catalogscatalognameitems = catalogscatalognameitems;
	}

	/**
	 * URI:アイテム情報取得/アイテム追加
	 */
	private String catalogscatalognameitemsitemid;

	/**
	 * URI:アイテム情報取得/アイテム追加ゲッター
	 *
	 * @return URI:アイテム情報取得/アイテム追加
	 */
	public String getCatalogscatalognameitemsitemid() {
		return catalogscatalognameitemsitemid;
	}

	/**
	 * URI:アイテム情報取得/アイテム追加セッター
	 *
	 * @param catalogscatalognameitemsitemid URI:アイテム情報取得/アイテム追加
	 */
	public void setCatalogscatalognameitemsitemid(String catalogscatalognameitemsitemid) {
		this.catalogscatalognameitemsitemid = catalogscatalognameitemsitemid;
	}

	/**
	 * URI:pricelist一覧取得/pricelist追加
	 */
	private String pricelists;

	/**
	 * URI:pricelist一覧取得/pricelist追加ゲッター
	 *
	 * @return URI:pricelist一覧取得/pricelist追加
	 */
	public String getPricelists() {
		return pricelists;
	}

	/**
	 * URI:pricelist一覧取得/pricelist追加セッター
	 *
	 * @param pricelists URI:pricelist一覧取得/pricelist追加
	 */
	public void setPricelists(String pricelists) {
		this.pricelists = pricelists;
	}

	/**
	 * URI:pricelist取得
	 */
	private String pricelistspricelistname;

	/**
	 * URI:pricelist取得ゲッター
	 *
	 * @return URI:pricelist取得
	 */
	public String getPricelistspricelistname() {
		return pricelistspricelistname;
	}

	/**
	 * URI:pricelist取得セッター
	 *
	 * @param pricelistspricelistname URI:pricelist取得
	 */
	public void setPricelistspricelistname(String pricelistspricelistname) {
		this.pricelistspricelistname = pricelistspricelistname;
	}

	/**
	 * URI:pricelist商品一覧取得/pricelist商品追加
	 */
	private String pricelistspricelistnameitems;

	/**
	 * URI:pricelist商品一覧取得/pricelist商品追加ゲッター
	 *
	 * @return URI:pricelist商品一覧取得/pricelist商品追加
	 */
	public String getPricelistspricelistnameitems() {
		return pricelistspricelistnameitems;
	}

	/**
	 * URI:pricelist商品一覧取得/pricelist商品追加セッター
	 *
	 * @param pricelistspricelistnameitems URI:pricelist商品一覧取得/pricelist商品追加
	 */
	public void setPricelistspricelistnameitems(String pricelistspricelistnameitems) {
		this.pricelistspricelistnameitems = pricelistspricelistnameitems;
	}

	/**
	 * URI:店舗価格情報取得
	 */
	private String pricelistsnodenodeiditemsskuid;

	/**
	 * URI:店舗価格情報取得ゲッター
	 *
	 * @return URI:店舗価格情報取得
	 */
	public String getPricelistsnodenodeiditemsskuid() {
		return pricelistsnodenodeiditemsskuid;
	}

	/**
	 * URI:店舗価格情報取得セッター
	 *
	 * @param pricelistsnodenodeiditemsskuid URI:店舗価格情報取得
	 */
	public void setPricelistsnodenodeiditemsskuid(String pricelistsnodenodeiditemsskuid) {
		this.pricelistsnodenodeiditemsskuid = pricelistsnodenodeiditemsskuid;
	}

	/**
	 * URI:pricelistレコード取得/pricelistレコード更新/pricelistレコード更新取消
	 */
	private String pricelistsrecordpricelistrecordid;

	/**
	 * URI:pricelistレコード取得/pricelistレコード更新/pricelistレコード更新取消ゲッター
	 *
	 * @return URI:pricelistレコード取得/pricelistレコード更新/pricelistレコード更新取消
	 */
	public String getPricelistsrecordpricelistrecordid() {
		return pricelistsrecordpricelistrecordid;
	}

	/**
	 * URI:pricelistレコード取得/pricelistレコード更新/pricelistレコード更新取消セッター
	 *
	 * @param pricelistsrecordpricelistrecordid
	 *        URI:pricelistレコード取得/pricelistレコード更新/pricelistレコード更新取消
	 */
	public void setPricelistsrecordpricelistrecordid(String pricelistsrecordpricelistrecordid) {
		this.pricelistsrecordpricelistrecordid = pricelistsrecordpricelistrecordid;
	}

	/**
	 * URI:pricelist全商品一覧取得
	 */
	private String pricelistsitems;

	/**
	 * URI:pricelist全商品一覧取得ゲッター
	 *
	 * @return URI:pricelist全商品一覧取得
	 */
	public String getPricelistsitems() {
		return pricelistsitems;
	}

	/**
	 * URI:pricelist全商品一覧取得セッター
	 *
	 * @param pricelistsitems URI:pricelist全商品一覧取得
	 */
	public void setPricelistsitems(String pricelistsitems) {
		this.pricelistsitems = pricelistsitems;
	}

	/**
	 * URI:テーブル情報取得ゲッター
	 *
	 * @return URI:テーブル情報取得
	 */
	public String getTableList() {
		return tableList;
	}

	/**
	 * URI:テーブル情報取得セッター
	 *
	 * @param tableList URI:pテーブル情報取得
	 */
	public void setTableList(String tableList) {
		this.tableList = tableList;
	}

	/**
	 * URI:テーブル情報削除ゲッター
	 *
	 * @param tableList URI:pテーブル情報削除
	 */
	public String getTableListDelete() {
		return tableListDelete;
	}

	/**
	 * URI:テーブル情報削除セッター
	 *
	 * @param tableList URI:pテーブル情報削除
	 */
	public void setTableListDelete(String tableListDelete) {
		this.tableListDelete = tableListDelete;
	}

	public String getPermissionsList() {
		return permissionsList;
	}

	public void setPermissionsList(String permissionsList) {
		this.permissionsList = permissionsList;
	}

	public String getConfigurationsMetadataGroup() {
		return configurationsMetadataGroup;
	}

	public void setConfigurationsMetadataGroup(String configurationsMetadataGroup) {
		this.configurationsMetadataGroup = configurationsMetadataGroup;
	}

	private String pricelistsNodePricelistnameSkuid;

	public String getPricelistsNodePricelistnameSkuid() {
		return pricelistsNodePricelistnameSkuid;
	}

	public void setPricelistsNodePricelistnameSkuid(String pricelistsNodePricelistnameSkuid) {
		this.pricelistsNodePricelistnameSkuid = pricelistsNodePricelistnameSkuid;
	}

	private String permissionsRolename;

	public String getPermissionsRolename() {
		return permissionsRolename;
	}

	public void setPermissionsRolename(String permissionsRolename) {
		this.permissionsRolename = permissionsRolename;
	}

	private String totalizerReport;

	public String getTotalizerReport() {
		return totalizerReport;
	}

	public void setTotalizerReport(String totalizerReport) {
		this.totalizerReport = totalizerReport;
	}

	/**
	 * @return appVersionのgetter.
	 */
	public String getAppVersion() {
		return appVersion;
	}

	/**
	 * @param appVersionのsetter.
	 */
	public void setAppVersion(String appVersion) {
		this.appVersion = appVersion;
	}

	// G001.00.0 Update-Start
	/**
	 * URI:プリセットフォルダ作成
	 */
	@Setter
	@Getter
	private String presetsFolderPost;
	// G001.00.0 Update-End

	/**
	 * URI:プリセットフォルダ削除
	 * 
	 * @since [ISSUE 1169]
	 */
	@Setter
	@Getter
	private String presetsFolderDelete;

	/* *
	 * コシダカ *
	 * KOSHIDAKA */
 
	/* 曜日区分アイテム取得 */
	private String rentalsweekdaydivisionquery;
	public String getRentalsweekdaydivisionquery() {
		return rentalsweekdaydivisionquery;
	}
	public void setRentalsweekdaydivisionquery(String rentalsweekdaydivisionquery) {
		this.rentalsweekdaydivisionquery = rentalsweekdaydivisionquery;
	}
	/* 曜日区分アイテム新規作成/更新 */
	private String rentalsweekdaydivision;
	public String getRentalsweekdaydivision() {
		return rentalsweekdaydivision;
	}
	public void setRentalsweekdaydivision(String rentalsweekdaydivision) {
		this.rentalsweekdaydivision = rentalsweekdaydivision;
	}
	/* 曜日区分アイテム削除 */
	private String rentalsweekdaydivisionnodeid;
	public String getRentalsweekdaydivisionnodeid() {
		return rentalsweekdaydivisionnodeid;
	}
	public void setRentalsweekdaydivisionnodeid(String rentalsweekdaydivisionnodeid) {
		this.rentalsweekdaydivisionnodeid = rentalsweekdaydivisionnodeid;
	}

	/* ルームコースアイテム取得 */
	private String rentalsroomcoursequery;
	public String getRentalsroomcoursequery() {
		return rentalsroomcoursequery;
	}
	public void setRentalsroomcoursequery(String rentalsroomcoursequery) {
		this.rentalsroomcoursequery = rentalsroomcoursequery;
	}
	/* ルームコースアイテム新規作成/更新 */
	private String rentalsroomcourse;
	public String getRentalsroomcourse() {
		return rentalsroomcourse;
	}
	public void setRentalsroomcourse(String rentalsroomcourse) {
		this.rentalsroomcourse = rentalsroomcourse;
	}
	/* ルームコースアイテム削除 */
	private String rentalsroomcoursenodeid;
	public String getRentalsroomcoursenodeid() {
		return rentalsroomcoursenodeid;
	}
	public void setRentalsroomcoursenodeid(String rentalsroomcoursenodeid) {
		this.rentalsroomcoursenodeid = rentalsroomcoursenodeid;
	}

	/* ドリンクコースアイテム取得 */
	private String rentalsdrinkcoursequery;
	public String getRentalsdrinkcoursequery() {
		return rentalsdrinkcoursequery;
	}
	public void setRentalsdrinkcoursequery(String rentalsdrinkcoursequery) {
		this.rentalsdrinkcoursequery = rentalsdrinkcoursequery;
	}
	/* ドリンクコースアイテム新規作成/更新 */
	private String rentalsdrinkcourse;
	public String getRentalsdrinkcourse() {
		return rentalsdrinkcourse;
	}
	public void setRentalsdrinkcourse(String rentalsdrinkcourse) {
		this.rentalsdrinkcourse = rentalsdrinkcourse;
	}
	/* ドリンクコースアイテム削除 */
	private String rentalsdrinkcoursenodeid;
	public String getRentalsdrinkcoursenodeid() {
		return rentalsdrinkcoursenodeid;
	}
	public void setRentalsdrinkcoursenodeid(String rentalsdrinkcoursenodeid) {
		this.rentalsdrinkcoursenodeid = rentalsdrinkcoursenodeid;
	}
	
	/* ルームコース料金アイテム取得 */
	private String rentalsroomcourseratequery;
	public String getRentalsroomcourseratequery() {
		return rentalsroomcourseratequery;
	}
	public void setRentalsroomcourseratequery(String rentalsroomcourseratequery) {
		this.rentalsroomcourseratequery = rentalsroomcourseratequery;
	}
	/* ルームコース料金アイテム新規作成/更新 */
	private String rentalsroomcourserate;
	public String getRentalsroomcourserate() {
		return rentalsroomcourserate;
	}
	public void setRentalsroomcourserate(String rentalsroomcourserate) {
		this.rentalsroomcourserate = rentalsroomcourserate;
	}

	/* 機材アイテム取得 */
	private String rentalsequipmentquery;
	public String getRentalsequipmentquery() {
		return rentalsequipmentquery;
	}
	public void setRentalsequipmentquery(String rentalsequipmentquery) {
		this.rentalsequipmentquery = rentalsequipmentquery;
	}
	/* 機材アイテム新規作成/更新 */
	private String rentalsequipment;
	public String getRentalsequipment() {
		return rentalsequipment;
	}
	public void setRentalsequipment(String rentalsequipment) {
		this.rentalsequipment = rentalsequipment;
	}
	/* 機材アイテム削除 */
	private String rentalsequipmentnodeid;
	public String getRentalsequipmentnodeid() {
		return rentalsequipmentnodeid;
	}
	public void setRentalsequipmentnodeid(String rentalsequipmentnodeid) {
		this.rentalsequipmentnodeid = rentalsequipmentnodeid;
	}

	/* 機材設備アイテム取得 */
	private String rentalsmodelquery;
	public String getRentalsmodelquery() {
		return rentalsmodelquery;
	}
	public void setRentalsmodelquery(String rentalsmodelquery) {
		this.rentalsmodelquery = rentalsmodelquery;
	}
	/* 機材設備アイテム新規作成/更新 */
	private String rentalsmodel;
	public String getRentalsmodel() {
		return rentalsmodel;
	}
	public void setRentalsmodel(String rentalsmodel) {
		this.rentalsmodel = rentalsmodel;
	}
	/* 機材設備アイテム削除 */
	private String rentalsmodelnodeid;
	public String getRentalsmodelnodeid() {
		return rentalsmodelnodeid;
	}
	public void setRentalsmodelnodeid(String rentalsmodelnodeid) {
		this.rentalsmodelnodeid = rentalsmodelnodeid;
	}

	/* 部屋関連情報アイテム取得 */
	private String rentalsroominformationquery;
	public String getRentalsroominformationquery() {
		return rentalsroominformationquery;
	}
	public void setRentalsroominformationquery(String rentalsroominformationquery) {
		this.rentalsroominformationquery = rentalsroominformationquery;
	}
	/* 部屋関連情報アイテム新規作成/更新 */
	private String rentalsroominformation;
	public String getRentalsroominformation() {
		return rentalsroominformation;
	}
	public void setRentalsroominformation(String rentalsroominformation) {
		this.rentalsroominformation = rentalsroominformation;
	}
	/* 部屋関連情報アイテム削除 */
	private String rentalsroominformationnodeid;
	public String getRentalsroominformationnodeid() {
		return rentalsroominformationnodeid;
	}
	public void setRentalsroominformationnodeid(String rentalsroominformationnodeid) {
		this.rentalsroominformationnodeid = rentalsroominformationnodeid;
	}

	/* 部屋情報アイテム取得 */
	private String rentalsroomquery;
	public String getRentalsroomquery() {
		return rentalsroomquery;
	}
	public void setRentalsroomquery(String rentalsroomquery) {
		this.rentalsroomquery = rentalsroomquery;
	}
	/* 部屋情報アイテム新規作成/更新 */
	private String rentalsroom;
	public String getRentalsroom() {
		return rentalsroom;
	}
	public void setRentalsroom(String rentalsroom) {
		this.rentalsroom = rentalsroom;
	}
	/* 部屋情報アイテム削除 */
	private String rentalsroomnodeid;
	public String getRentalsroomnodeid() {
		return rentalsroomnodeid;
	}
	public void setRentalsroomnodeid(String rentalsroomnodeid) {
		this.rentalsroomnodeid = rentalsroomnodeid;
	}

	/* 部屋情報サブアイテム取得 */
	private String rentalsroomsubquery;
	public String getRentalsroomsubquery() {
		return rentalsroomsubquery;
	}
	public void setRentalsroomsubquery(String rentalsroomsubquery) {
		this.rentalsroomsubquery = rentalsroomsubquery;
	}
	/* 部屋情報サブアイテム新規作成/更新 */
	private String rentalsroomsub;
	public String getRentalsroomsub() {
		return rentalsroomsub;
	}
	public void setRentalsroomsub(String rentalsroomsub) {
		this.rentalsroomsub = rentalsroomsub;
	}
	
	/* カレンダーアイテム取得 */
	private String rentalscalendarquery;
	public String getRentalscalendarquery() {
		return rentalscalendarquery;
	}
	public void setRentalscalendarquery(String rentalscalendarquery) {
		this.rentalscalendarquery = rentalscalendarquery;
	}
	/* カレンダーアイテム新規作成/更新 */
	private String rentalscalendar;
	public String getRentalscalendar() {
		return rentalscalendar;
	}
	public void setRentalscalendar(String rentalscalendar) {
		this.rentalscalendar = rentalscalendar;
	}

	/* 会員ランクアイテム取得 */
	private String restaurantsmemberrankquery;
	public String getRestaurantsmemberrankquery() {
		return restaurantsmemberrankquery;
	}
	public void setRestaurantsmemberrankquery(String restaurantsmemberrankquery) {
		this.restaurantsmemberrankquery = restaurantsmemberrankquery;
	}
	/* 会員ランクアイテム新規作成/更新 */
	private String restaurantsmemberrank;
	public String getRestaurantsmemberrank() {
		return restaurantsmemberrank;
	}
	public void setRestaurantsmemberrank(String restaurantsmemberrank) {
		this.restaurantsmemberrank = restaurantsmemberrank;
	}
	/* 会員ランクアイテム削除 */
	private String restaurantsmemberranknodeid;
	public String getRestaurantsmemberranknodeid() {
		return restaurantsmemberranknodeid;
	}
	public void setRestaurantsmemberranknodeid(String restaurantsmemberranknodeid) {
		this.restaurantsmemberranknodeid = restaurantsmemberranknodeid;
	}
	
	/* 年齢区分アイテム取得 */
	private String restaurantsagedivisionquery;
	public String getRestaurantsagedivisionquery() {
		return restaurantsagedivisionquery;
	}
	public void setRestaurantsagedivisionquery(String restaurantsagedivisionquery) {
		this.restaurantsagedivisionquery = restaurantsagedivisionquery;
	}
	/* 年齢区分アイテム新規作成/更新 */
	private String restaurantsagedivision;
	public String getRestaurantsagedivision() {
		return restaurantsagedivision;
	}
	public void setRestaurantsagedivision(String restaurantsagedivision) {
		this.restaurantsagedivision = restaurantsagedivision;
	}
	/* 年齢区分アイテム削除 */
	private String restaurantsagedivisionnodeid;
	public String getRestaurantsagedivisionnodeid() {
		return restaurantsagedivisionnodeid;
	}
	public void setRestaurantsagedivisionnodeid(String restaurantsagedivisionnodeid) {
		this.restaurantsagedivisionnodeid = restaurantsagedivisionnodeid;
	}
	
	/* コンプライアンス情報アイテム取得 */
	private String restaurantscompliancenodeid;
	public String getRestaurantscompliancenodeid() {
		return restaurantscompliancenodeid;
	}
	public void setRestaurantscompliancenodeid(String restaurantscompliancenodeid) {
		this.restaurantscompliancenodeid = restaurantscompliancenodeid;
	}
	/* コンプライアンス情報アイテム新規作成/更新 */
	private String restaurantscompliance;
	public String getRestaurantscompliance() {
		return restaurantscompliance;
	}
	public void setRestaurantscompliance(String restaurantscompliance) {
		this.restaurantscompliance = restaurantscompliance;
	}
	
	/* 券種設定　取得 */
	private String restaurantsticketquery;
	public String getRestaurantsticketquery() {
		return restaurantsticketquery;
	}
	public void setRestaurantsticketquery(String restaurantsticketquery) {
		this.restaurantsticketquery = restaurantsticketquery;
	}
	/* 券種設定　新規作成/更新 */
	private String restaurantsticket;
	public String getRestaurantsticket() {
		return restaurantsticket;
	}
	public void setRestaurantsticket(String restaurantsticket) {
		this.restaurantsticket = restaurantsticket;
	}
	/* 券種設定　削除 */
	private String restaurantsticketnodeid;
	public String getRestaurantsticketnodeid() {
		return restaurantsticketnodeid;
	}
	public void setRestaurantsticketnodeid(String restaurantsticketnodeid) {
		this.restaurantsticketnodeid = restaurantsticketnodeid;
	}
	
	/* フロアマスタ設定　取得 */
	private String restaurantfloorquery;
	public String getRestaurantsfloorquery() {
		return restaurantfloorquery;
	}
	public void setRestaurantsfloorquery(String restaurantfloorquery) {
		this.restaurantfloorquery = restaurantfloorquery;
	}
	/* フロアマスタ設定　新規作成/更新 */
	private String restaurantsfloor;
	public String getRestaurantsfloor() {
		return restaurantsfloor;
	}
	public void setRestaurantsfloor(String restaurantsfloor) {
		this.restaurantsfloor = restaurantsfloor;
	}
	/* フロアマスタ設定　削除 */
	private String restaurantsfloornodeid;
	public String getRestaurantsfloornodeid() {
		return restaurantsfloornodeid;
	}
	public void setRestaurantsfloornodeid(String restaurantsfloornodeid) {
		this.restaurantsfloornodeid = restaurantsfloornodeid;
	}
	
	/* テーブルマスタ設定　取得 */
	private String restauranttablequery;
	public String getRestaurantstablequery() {
		return restauranttablequery;
	}
	public void setRestaurantstablequery(String restauranttablequery) {
		this.restauranttablequery = restauranttablequery;
	}
	/* テーブルマスタ設定　新規作成/更新 */
	private String restaurantstable;
	public String getRestaurantstable() {
		return restaurantstable;
	}
	public void setRestaurantstable(String restaurantstable) {
		this.restaurantstable = restaurantstable;
	}

	/* システム管理固定マスタ設定　取得 */
	private String restaurantssysteminffixsysquery;
	public String getRestaurantssysteminffixsysquery() {
		return restaurantssysteminffixsysquery;
	}
	public void setRestaurantssysteminffixsysquery(String restaurantssysteminffixsysquery) {
		this.restaurantssysteminffixsysquery = restaurantssysteminffixsysquery;
	}

	/* S3bucket S3ファイル取得 */
	private String s3bucketgetfile;
	public String getS3bucketgetfile() {
		return s3bucketgetfile;
	}
	public void setS3bucketgetfile(String s3bucketgetfile) {
		this.s3bucketgetfile = s3bucketgetfile;
	}
	/* S3bucket S3ファイル登録 */
	private String s3bucketcapturefile;
	public String getS3bucketcapturefile() {
		return s3bucketcapturefile;
	}
	public void setS3bucketcapturefile(String s3bucketcapturefile) {
		this.s3bucketcapturefile = s3bucketcapturefile;
	}
	/* S3bucket S3ファイル削除 */
	private String s3bucketdeletefile;
	public String getS3bucketdeletefile() {
		return s3bucketdeletefile;
	}
	public void setS3bucketdeletefile(String s3bucketdeletefile) {
		this.s3bucketdeletefile = s3bucketdeletefile;
	}
	/* S3bucket S3フォルダ作成 */
	private String s3bucketcreatefolder;
	public String getS3bucketcreatefolder() {
		return s3bucketcreatefolder;
	}
	public void setS3bucketcreatefolder(String s3bucketcreatefolder) {
		this.s3bucketcreatefolder = s3bucketcreatefolder;
	}
	/* S3bucket S3フォルダ削除 */
	private String s3bucketdeletefolder;
	public String getS3bucketdeletefolder() {
		return s3bucketdeletefolder;
	}
	public void setS3bucketdeletefolder(String s3bucketdeletefolder) {
		this.s3bucketdeletefolder = s3bucketdeletefolder;
	}

	// KSD V001.000 AS
	/**
	 * URI:税率設定セットのクエリ
	 */
	@Setter
	@Getter
	private String taxSetsTaxes;
	
	@Setter
	@Getter
	private String restaurantsfumenuquery;

	@Setter
	@Getter
	private String restaurantsMcfscpQuery;

	@Setter
	@Getter
	private String restaurantsMcfscpUpdate;

	@Setter
	@Getter
	private String restaurantsMcfscpDelete;

	@Setter
	@Getter
	private String restaurantsSettoolDbselect;
	// KSD V001.000 AE
	
// KSD V001.000 20230928 AS
	@Setter
	@Getter
	private String restaurantsfumenudelete;
// KSD V001.000 20230928 AE
	
	// KSD V001.000 20230821 AS
	/* 暗号化POSパスワード取得 */
	private String authorizationusersretrieveencodepwd;
	public String getAuthorizationusersretrieveencodepwd() {
		return authorizationusersretrieveencodepwd;
	}
	public void setAuthorizationusersretrieveencodepwd(String authorizationusersretrieveencodepwd) {
		this.authorizationusersretrieveencodepwd = authorizationusersretrieveencodepwd;
	}
	// KSD V001.000 20230821 AE

	// KSD V001.000 20230907 AS
	//CSV入出力 taskの新規作成・更新
	private String csvconversiontasks;
	public String getCsvconversiontasks() {
		return csvconversiontasks;
	}
	public void setCsvconversiontasks(String csvconversiontasks) {
		this.csvconversiontasks = csvconversiontasks;
	}
	//CSV入出力 ファイルの送信
	private String csvconversiontaskstaskIdsubmit;
	public String getCsvconversiontaskstaskIdsubmit() {
		return csvconversiontaskstaskIdsubmit;
	}
	public void setCsvconversiontaskstaskIdsubmit(String csvconversiontaskstaskIdsubmit) {
		this.csvconversiontaskstaskIdsubmit = csvconversiontaskstaskIdsubmit;
	}
	//CSV入出力 taskの実行開始
	private String csvconversiontaskstaskIdexecute;
	public String getCsvconversiontaskstaskIdexecute() {
		return csvconversiontaskstaskIdexecute;
	}
	public void setCsvconversiontaskstaskIdexecute(String csvconversiontaskstaskIdexecute) {
		this.csvconversiontaskstaskIdexecute = csvconversiontaskstaskIdexecute;
	}
	//CSV入出力 task情報の取得
	private String csvconversiontasksget;
	public String getCsvconversiontasksget() {
		return csvconversiontasksget;
	}
	public void setCsvconversiontasksget(String csvconversiontasksget) {
		this.csvconversiontasksget = csvconversiontasksget;
	}
	// KSD V001.000 20230907 AE
	// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
	//CSV入出力 ファイルの送信
	private String dataRetentionSettingsNodeAdd;
	public String getDataRetentionSettingsNodeAdd() {
		return dataRetentionSettingsNodeAdd;
	}
	public void setDataRetentionSettingsNodeAdd(String dataRetentionSettingsNodeAdd) {
		this.dataRetentionSettingsNodeAdd = dataRetentionSettingsNodeAdd;
	}
	// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
		
	// KSD V001.000 20231024 AS
	private String entryinitialdata;
	public String getEntryinitialdata() {
		return entryinitialdata;
	}
	public void setEntryinitialdata(String entryinitialdata) {
		this.entryinitialdata = entryinitialdata;
	}
	// KSD V001.000 20231024 AE
	// KSD V001.000 20231031 AS
	private String deletes3storefolder;
	public String getDeletes3storefolder() {
		return deletes3storefolder;
	}
	public void setDeletes3storefolder(String deletes3storefolder) {
		this.deletes3storefolder = deletes3storefolder;
	}
	// KSD V001.000 20231031 AE






}
