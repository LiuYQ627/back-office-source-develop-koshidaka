package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * 構成情報 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsModel {
	public ConfigurationsModel() {
	}

	/**
	 * バージョン.
	 */
	private Integer version;

	/**
	 * バージョンゲッター.
	 *
	 * @return バージョン
	 */
	public Integer getVersion() {
		return version;
	}

	/**
	 * バージョンセッター.
	 *
	 * @param version バージョン
	 */
	public void setVersion(Integer version) {
		this.version = version;
	}

	/**
	 * 電話番号.
	 */
	private String phone;

	/**
	 * 電話番号ゲッター.
	 *
	 * @return 電話番号
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * 電話番号セッター.
	 *
	 * @param phone 電話番号
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * 緯度（未使用）.
	 */
	private String latitude;

	/**
	 * 緯度ゲッター.
	 *
	 * @return 緯度
	 */
	public String getLatitude() {
		return latitude;
	}

	/**
	 * 緯度セッター.
	 *
	 * @param latitude 緯度
	 */
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	/**
	 * 経度（未使用）.
	 */
	private String longitude;

	/**
	 * 経度ゲッター.
	 *
	 * @return 経度
	 */
	public String getLongitude() {
		return longitude;
	}

	/**
	 * 経度セッター.
	 *
	 * @param longitude 経度
	 */
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	/**
	 * アドレス.
	 */
	private ConfigurationsAddressModel address;

	/**
	 * アドレスゲッター.
	 *
	 * @return アドレス
	 */
	public ConfigurationsAddressModel getAddress() {
		return address;
	}

	/**
	 * アドレスセッター.
	 *
	 * @param address アドレス
	 */
	public void setAddress(ConfigurationsAddressModel address) {
		this.address = address;
	}

	/**
	 * システムノード.
	 */
	private Boolean isSystemNode;

	/**
	 * システムノードゲッター.
	 *
	 * @return システムノード
	 */
	public Boolean getIsSystemNode() {
		return isSystemNode;
	}

	/**
	 * システムノードセッター.
	 *
	 * @param isSystemNode システムノード
	 */
	public void setIsSystemNode(Boolean isSystemNode) {
		this.isSystemNode = isSystemNode;
	}

	/**
	 * トピック同期.
	 */
	private Boolean synchronizeTopics;

	/**
	 * トピック同期ゲッター.
	 *
	 * @return トピック同期
	 */
	public Boolean getSynchronizeTopics() {
		return synchronizeTopics;
	}

	/**
	 * トピック同期セッター.
	 *
	 * @param synchronizeTopics トピック同期
	 */
	public void setSynchronizeTopics(Boolean synchronizeTopics) {
		this.synchronizeTopics = synchronizeTopics;
	}

	/**
	 * 集荷許可.
	 */
	private Boolean allowPickup;

	/**
	 * 集荷許可ゲッター.
	 *
	 * @return 集荷許可
	 */
	public Boolean getAllowPickup() {
		return allowPickup;
	}

	/**
	 * 集荷許可セッター.
	 *
	 * @param allowPickup 集荷許可
	 */
	public void setAllowPickup(Boolean allowPickup) {
		this.allowPickup = allowPickup;
	}

	/**
	 * 構成.
	 */
	private ConfigurationsDetailModel configurations;

	/**
	 * 構成ゲッター.
	 *
	 * @return 構成
	 */
	public ConfigurationsDetailModel getConfigurations() {
		return configurations;
	}

	/**
	 * 構成セッター.
	 *
	 * @param configurations 構成
	 */
	public void setConfigurations(ConfigurationsDetailModel configurations) {
		this.configurations = configurations;
	}

	/**
	 * 表示名称.
	 */
	private CommonDefaultModel displayName;

	/**
	 * 表示名称ゲッター.
	 *
	 * @return 表示名称
	 */
	public CommonDefaultModel getDisplayName() {
		return displayName;
	}

	/**
	 * 表示名称セッター.
	 *
	 * @param displayName 表示名称
	 */
	public void setDisplayName(CommonDefaultModel displayName) {
		this.displayName = displayName;
	}

	/**
	 * 親ノードID.
	 */
	private String parentName;

	/**
	 * 親ノードIDゲッター.
	 *
	 * @return 親ノードID
	 */
	public String getParentName() {
		return parentName;
	}

	/**
	 * 親ノードIDセッター.
	 *
	 * @param parentName 親ノードID
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * ノードID.
	 */
	private String name;

	/**
	 * ノードIDゲッター.
	 *
	 * @return ノードID
	 */
	public String getName() {
		return name;
	}

	/**
	 * ノードIDセッター.
	 *
	 * @param name ノードID
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * ファックス.
	 */
	private String fax;

	/**
	 * ファックスゲッター.
	 *
	 * @return ファックス
	 */
	public String getFax() {
		return fax;
	}

	/**
	 * ファックスセッター.
	 *
	 * @param fax ファックス
	 */
	public void setFax(String fax) {
		this.fax = fax;
	}

	/**
	 * 登録事業者番号.
	 */
	private String registerBusinessCode;

	/**
	 * 登録事業者番号ゲッター.
	 *
	 * @return 登録事業者番号
	 */
	public String getRegisterBusinessCode() {
		return registerBusinessCode;
	}

	/**
	 * 登録事業者番号セッター.
	 *
	 * @param registerBusinessCode 登録事業者番号
	 */
	public void setRegisterBusinessCode(String registerBusinessCode) {
		this.registerBusinessCode = registerBusinessCode;
	}

	/**
	 * 契約代表者名.
	 */
	private String contractRepresentativeName;

	/**
	 * 契約代表者名ゲッター.
	 *
	 * @return 契約代表者名
	 */
	public String getContractRepresentativeName() {
		return contractRepresentativeName;
	}

	/**
	 * 契約代表者名セッター.
	 *
	 * @param contractRepresentativeName 契約代表者名
	 */
	public void setContractRepresentativeName(String contractRepresentativeName) {
		this.contractRepresentativeName = contractRepresentativeName;
	}

	/**
	 * スマートレシート連携企業コード.
	 */
	private String smartReceiptCode;

	/**
	 * スマートレシート連携企業コードゲッター.
	 *
	 * @return スマートレシート連携企業コード
	 */
	public String getSmartReceiptCode() {
		return smartReceiptCode;
	}

	/**
	 * スマートレシート連携企業コードセッター.
	 *
	 * @param smartReceiptCode スマートレシート連携企業コード
	 */
	public void setSmartReceiptCode(String smartReceiptCode) {
		this.smartReceiptCode = smartReceiptCode;
	}

	/**
	 * インボイス発行事業者.
	 */
	@JsonProperty("invoiceIssueName")
	private String invoiceIssueName;

	/**
	 * インボイス発行事業者ゲッター.
	 *
	 * @return インボイス発行事業者
	 */
	public String getInvoiceIssueName() {
		return invoiceIssueName;
	}

	/**
	 * インボイス発行事業者セッター.
	 *
	 * @param invoiceIssueName インボイス発行事業者
	 */
	public void setInvoiceIssueName(String invoiceIssueName) {
		this.invoiceIssueName = invoiceIssueName;
	}

	/**
	 * インボイス登録番号.
	 */
	private String invoiceCode;

	/**
	 * インボイス登録番号ゲッター.
	 *
	 * @return インボイス登録番号
	 */
	public String getInvoiceCode() {
		return invoiceCode;
	}

	/**
	 * インボイス登録番号セッター.
	 *
	 * @param invoiceCode インボイス登録番号
	 */
	public void setInvoiceCode(String invoiceCode) {
		this.invoiceCode = invoiceCode;
	}

	/**
	 * 請求日付.
	 */
	private Integer billingDate;

	/**
	 * 請求日付ゲッター.
	 *
	 * @return 請求日付
	 */
	public Integer getBillingDate() {
		return billingDate;
	}

	/**
	 * 請求日付セッター.
	 *
	 * @param billingDate 請求日付
	 */
	public void setBillingDate(Integer billingDate) {
		this.billingDate = billingDate;
	}

	/**
	 * 請求確定時刻.
	 */
	private Integer billingTime;

	/**
	 * 請求確定時刻ゲッター.
	 *
	 * @return 請求確定時刻
	 */
	public Integer getBillingTime() {
		return billingTime;
	}

	/**
	 * 請求確定時刻セッター.
	 *
	 * @param billingDTime 請求確定時刻
	 */
	public void setBillingTime(Integer billingTime) {
		this.billingTime = billingTime;
	}

	/**
	 * 利用開始月.
	 */
	private String useStartMonth;

	/**
	 * 利用開始月ゲッター.
	 *
	 * @return 利用開始月
	 */
	public String getUseStartMonth() {
		return useStartMonth;
	}

	/**
	 * 利用開始月セッター.
	 *
	 * @param useStartMonth 利用開始月
	 */
	public void setUseStartMonth(String useStartMonth) {
		this.useStartMonth = useStartMonth;
	}

	/**
	 * 利用終了月.
	 */
	private String useEndMonth;

	/**
	 * 利用終了月ゲッター.
	 *
	 * @return 利用終了月
	 */
	public String getUseEndMonth() {
		return useEndMonth;
	}

	/**
	 * 利用終了月セッター.
	 *
	 * @param useEndtMonth 利用終了月
	 */
	public void setUseEndMonth(String useEndMonth) {
		this.useEndMonth = useEndMonth;
	}

	/**
	 * 運用形態.
	 */
	private Short operationForm;

	/**
	 * 運用形態ゲッター.
	 *
	 * @return 運用形態
	 */
	public Short getOperationForm() {
		return operationForm;
	}

	/**
	 * 運用形態セッター.
	 *
	 * @param operationForm 運用形態
	 */
	public void setOperationForm(Short operationForm) {
		this.operationForm = operationForm;
	}

	/**
	 * イートイン.
	 */
	private Integer eatIn;

	/**
	 * イートインゲッター.
	 *
	 * @return イートイン
	 */
	public Integer getEatIn() {
		return eatIn;
	}

	/**
	 * イートインセッター.
	 *
	 * @param eatIn イートイン
	 */
	public void setEatIn(Integer eatIn) {
		this.eatIn = eatIn;
	}

	/**
	 * 表示優先順.
	 */
	private Short displayOrder;

	/**
	 * 表示優先順ゲッター.
	 *
	 * @return 表示優先順
	 */
	public Short getDisplayOrder() {
		return displayOrder;
	}

	/**
	 * 表示優先順セッター.
	 *
	 * @param displayOrder 表示優先順
	 */
	public void setDisplayOrder(Short displayOrder) {
		this.displayOrder = displayOrder;
	}

	/**
	 * 変更計画
	 */
	private ConfigurationsChangePlanModel changePlan;

	/**
	 * 変更計画ゲッター.
	 *
	 * @return 変更計画
	 */
	public ConfigurationsChangePlanModel getChangePlan() {
		return changePlan;
	}

	/**
	 * 変更計画セッター.
	 *
	 * @param changePlan 変更計画
	 */
	public void setChangePlan(ConfigurationsChangePlanModel changePlan) {
		this.changePlan = changePlan;
	}

	/**
	 * 作成日時
	 */
	private String createTimestamp;

	/**
	 * 作成日時ゲッター.
	 *
	 * @return 作成日時
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}

	/**
	 * 作成日時セッター.
	 *
	 * @param createTimestamp 作成日時
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * 最終更新者.
	 */
	private String lastModifiedUserId;

	/**
	 * 最終更新者ゲッター.
	 *
	 * @return 最終更新者
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}

	/**
	 * 最終更新者セッター.
	 *
	 * @param lastModifiedUserId 最終更新者
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * 親削除状態.
	 */
	private Boolean parentDeleted;

	/**
	 * 親削除状態ゲッター.
	 *
	 * @return 親削除状態
	 */
	public Boolean getParentDeleted() {
		return parentDeleted;
	}

	/**
	 * 親削除状態セッター.
	 *
	 * @param parentDeleted 親削除状態
	 */
	public void setParentDeleted(Boolean parentDeleted) {
		this.parentDeleted = parentDeleted;
	}

	/**
	 * 最終更新日.
	 */
	private String lastModifiedTimestamp;

	/**
	 * 最終更新日ゲッター.
	 *
	 * @return 最終更新日
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}

	/**
	 * 最終更新日セッター.
	 *
	 * @param lastModifiedTimestamp 最終更新日
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	// KSD V001.000 AS
	/**
	 * 店舗グループ１.
	 */
	private Long storeGroup1;

	/**
	 * 店舗グループ２.
	 */
	private Long storeGroup2;
	// KSD V001.000 AE

}
