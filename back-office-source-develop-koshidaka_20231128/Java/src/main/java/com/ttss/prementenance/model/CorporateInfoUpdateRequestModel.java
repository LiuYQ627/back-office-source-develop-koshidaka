package com.ttss.prementenance.model;

import com.ttss.prementenance.utils.validation.ByteMax;
import com.ttss.prementenance.utils.validation.ByteSize;
import java.util.List;
import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * 企業マスタ更新 企業情報 データモデル.
 *
 * @author TSS 可知 徹生
 * @version 1.0.0
 */
@Data
public class CorporateInfoUpdateRequestModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface CorporateInfoUpdateRequestNameOrder1 {
	}

	public interface CorporateInfoUpdateRequestNameOrder2 {
	}

	public interface CorporateInfoUpdateRequestPostNoOrder1 {
	}

	public interface CorporateInfoUpdateRequestPostNoOrder2 {
	}

	public interface CorporateInfoUpdateRequestTelNoOrder1 {
	}

	public interface CorporateInfoUpdateRequestTelNoOrder2 {
	}

	public interface CorporateInfoUpdateRequestFaxNoOrder1 {
	}

	public interface CorporateInfoUpdateRequestFaxNoOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ CorporateInfoUpdateRequestNameOrder1.class,
			CorporateInfoUpdateRequestNameOrder2.class })
	public interface GroupNameOrder {
	}

	@GroupSequence({ CorporateInfoUpdateRequestPostNoOrder1.class,
			CorporateInfoUpdateRequestPostNoOrder2.class })
	public interface GroupPostNoOrder {
	}

	@GroupSequence({ CorporateInfoUpdateRequestTelNoOrder1.class,
			CorporateInfoUpdateRequestTelNoOrder2.class })
	public interface GroupTelNoOrder {
	}

	@GroupSequence({ CorporateInfoUpdateRequestFaxNoOrder1.class,
			CorporateInfoUpdateRequestFaxNoOrder2.class })
	public interface GroupFaxNoOrder {
	}

	public CorporateInfoUpdateRequestModel() {
	}

	/**
	 * 企業コード.
	 */
	private String businessUnitCd;

	/**
	 * 名称.
	 */
	@NotEmpty(groups = { CorporateInfoUpdateRequestNameOrder1.class })
	@ByteSize(min = 1, max = 30, fullWidthMin = 1, fullWidthMax = 15, encoding = "Shift-JIS", groups = {
			CorporateInfoUpdateRequestNameOrder2.class })
	private String name;

	/**
	 * 郵便番号.
	 */
	@Size(max = 8, groups = { CorporateInfoUpdateRequestPostNoOrder1.class })
	@Pattern(regexp = "^[0-9-]*$", message = "{validation.Pattern.NumWithHyphen.message}", groups = {
			CorporateInfoUpdateRequestPostNoOrder2.class })
	private String postNo;

	/**
	 * 住所.
	 */
	@ByteMax(value = 40, fullWidthValue = 20, encoding = "Shift-JIS")
	private String address;

	/**
	 * 電話番号.
	 */
	@Size(max = 16, groups = { CorporateInfoUpdateRequestTelNoOrder1.class })
	@Pattern(regexp = "^[0-9-]*$", message = "{validation.Pattern.NumWithHyphen.message}", groups = {
			CorporateInfoUpdateRequestTelNoOrder2.class })
	private String telNo;

	/**
	 * FAX番号.
	 */
	@Size(max = 16, groups = { CorporateInfoUpdateRequestFaxNoOrder1.class })
	@Pattern(regexp = "^[0-9-]*$", message = "{validation.Pattern.NumWithHyphen.message}", groups = {
			CorporateInfoUpdateRequestFaxNoOrder2.class })
	private String faxNo;

	/**
	 * 契約代表者名.
	 */
	@ByteMax(value = 30, fullWidthValue = 15, encoding = "Shift-JIS")
	private String contractRepresentativeName;

	/**
	 * 請求日付.
	 */
	private Integer billingDate;

	/**
	 * 請求確定時刻.
	 */
	private Integer billingTime;

	/**
	 * 利用開始月.
	 */
	@DateTimeFormat(pattern = "yyyyMM")
	private String useStartMonth;

	/**
	 * 利用終了月.
	 */
	@DateTimeFormat(pattern = "yyyyMM")
	private String useEndMonth;

	/**
	 * 契約サービス情報リスト.
	 */
	private List<ContractServiceModel> contractServices;

	/**
	 * 変更計画バージョン.
	 */
	private Integer referenceVersion;

	/**
	 * 変更計画名称.
	 */
	private String changePlanName;

	/**
	 * インボイス発行事業者.
	 */
	@ByteSize(max = 30, fullWidthMin = 1, fullWidthMax = 15, encoding = "Shift-JIS", groups = {
			CorporateInfoUpdateRequestNameOrder2.class })
	private String invoiceIssueName;

	/**
	 * スマートレシート連携企業コード.
	 */
	@Size(max = 16, groups = { CorporateInfoUpdateRequestFaxNoOrder1.class })
	@Pattern(regexp = "^[0-9]*$", message = "{validation.Pattern.AlphaNumOnly.message}")
	private String smartReceiptCode;

	/**
	 * 登録事業者番号.
	 */
	@Size(max = 16, groups = { CorporateInfoUpdateRequestFaxNoOrder1.class })
	@Pattern(regexp = "^[a-zA-Z0-9]*$", message = "{validation.Pattern.AlphaNum.message}")
	private String registerBusinessCode;

	/**
	 * 企業コードゲッター.
	 *
	 * @return 企業コード
	 */
	public String getBusinessUnitCd() {
		return businessUnitCd;
	}

	/**
	 * 企業コードセッター.
	 *
	 * @param businessUnitCd 企業コード
	 */
	public void setBusinessUnitCd(String businessUnitCd) {
		this.businessUnitCd = businessUnitCd;
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
	 * 電話番号ゲッター.
	 *
	 * @return 電話番号
	 */
	public String getTelNo() {
		return telNo;
	}

	/**
	 * 電話番号セッター.
	 *
	 * @param telNo 電話番号
	 */
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	/**
	 * FAX番号ゲッター.
	 *
	 * @return FAX番号
	 */
	public String getFaxNo() {
		return faxNo;
	}

	/**
	 * FAX番号セッター.
	 *
	 * @param faxNo FAX番号
	 */
	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}

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
	 * @param billingTime 請求確定時刻
	 */
	public void setBillingTime(Integer billingTime) {
		this.billingTime = billingTime;
	}

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
	 * @param useEndMonth 利用終了月
	 */
	public void setUseEndMonth(String useEndMonth) {
		this.useEndMonth = useEndMonth;
	}

	/**
	 * 契約サービス情報リストゲッター.
	 *
	 * @return 契約サービス情報リスト
	 */
	public List<ContractServiceModel> getContractServices() {
		return contractServices;
	}

	/**
	 * 契約サービス情報リストセッター.
	 *
	 * @param contractServices 契約サービス情報リスト
	 */
	public void setcontractServices(List<ContractServiceModel> contractServices) {
		this.contractServices = contractServices;
	}

	/**
	 * 変更計画バージョンゲッター.
	 *
	 * @return 変更計画バージョン
	 */
	public Integer getReferenceVersion() {
		return referenceVersion;
	}

	/**
	 * 変更計画バージョンセッター.
	 *
	 * @param referenceVersion 変更計画バージョン
	 */
	public void setReferenceVersion(Integer referenceVersion) {
		this.referenceVersion = referenceVersion;
	}

	/**
	 * 変更計画名称ゲッター.
	 *
	 * @return 変更計画名称
	 */
	public String getChangePlanName() {
		return changePlanName;
	}

	/**
	 * 変更計画名称セッター.
	 *
	 * @param changePlanName 変更計画名称
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	// KSD V001.000 AS
	private ConfigurationsDetailModel configurations = new ConfigurationsDetailModel();
	// KSD V001.000 AE

}
