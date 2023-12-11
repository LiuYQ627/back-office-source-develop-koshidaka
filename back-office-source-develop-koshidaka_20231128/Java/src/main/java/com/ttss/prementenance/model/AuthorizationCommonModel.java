package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;
import lombok.Data;

/**
 * Authorization共通 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthorizationCommonModel {
	public AuthorizationCommonModel() {
	}

	/**
	 * 作成時のタイムスタンプ
	 */
	private String createTimestamp;

	/**
	 * 作成時のタイムスタンプゲッター
	 *
	 * @return 作成時のタイムスタンプ
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}

	/**
	 * 作成時のタイムスタンプセッター
	 *
	 * @param createTimestamp 作成時のタイムスタンプ
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * 最終修正時のタイムスタンプ
	 */
	private String lastModifiedTimestamp;

	/**
	 * 最終修正時のタイムスタンプゲッター
	 *
	 * @return 最終修正時のタイムスタンプ
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}

	/**
	 * 最終修正時のタイムスタンプセッター
	 *
	 * @param lastModifiedTimestamp 最終修正時のタイムスタンプ
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * バージョン
	 */
	private Long version;

	/**
	 * バージョンゲッター
	 *
	 * @return バージョン
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * バージョンセッター
	 *
	 * @param version バージョン
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	/**
	 * 最終修正時のユーザID
	 */
	private String lastModifiedUserId;

	/**
	 * 最終修正時のユーザIDゲッター
	 *
	 * @return 最終修正時のユーザID
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}

	/**
	 * 最終修正時のユーザIDセッター
	 *
	 * @param lastModifiedUserId 最終修正時のユーザID
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * ユーザID
	 */
	private String id;

	/**
	 * ユーザIDゲッター
	 *
	 * @return ユーザID
	 */
	public String getId() {
		return id;
	}

	/**
	 * ユーザIDセッター
	 *
	 * @param id ユーザID
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 責任者No
	 */
	private String username;

	/**
	 * 責任者Noゲッター
	 *
	 * @return 責任者No
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 責任者Noセッター
	 *
	 * @param username 責任者No
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * パスワード
	 */
	private String password;

	/**
	 * パスワードゲッター
	 *
	 * @return パスワード
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * パスワードセッター
	 *
	 * @param password パスワード
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * ユーザの名前
	 */
	private String firstName;

	/**
	 * ユーザの名前ゲッター
	 *
	 * @return ユーザの名前
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * ユーザの名前セッター
	 *
	 * @param firstName ユーザの名前
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * ユーザの苗字
	 */
	private String lastName;

	/**
	 * ユーザの苗字 ゲッター
	 *
	 * @return ユーザの苗字
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * ユーザの苗字 セッター
	 *
	 * @param lastName ユーザの苗字
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * ユーザの誕生年月日
	 */
	private String birthdate;

	/**
	 * ユーザの誕生年月日ゲッター
	 *
	 * @return ユーザの誕生年月日
	 */
	public String getBirthdate() {
		return birthdate;
	}

	/**
	 * ユーザの誕生年月日セッター
	 *
	 * @param birthdate ユーザの誕生年月日
	 */
	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	/**
	 * ユーザの住所
	 */
	private CommonAddressModel address = new CommonAddressModel();

	/**
	 * ユーザの住所ゲッター
	 *
	 * @return ユーザの住所
	 */
	public CommonAddressModel getAddress() {
		return address;
	}

	/**
	 * ユーザの住所セッター
	 *
	 * @param address ユーザの住所
	 */
	public void setAddress(CommonAddressModel address) {
		this.address = address;
	}

	/**
	 * authorities
	 */
	private Map<String, String> authorities;

	/**
	 * authoritiesゲッター
	 *
	 * @return authorities
	 */
	public Map<String, String> getAuthorities() {
		return authorities;
	}

	/**
	 * authoritiesセッター
	 *
	 * @param authorities authorities
	 */
	public void setAuthorities(Map<String, String> authorities) {
		this.authorities = authorities;
	}

	/**
	 * locale
	 */
	private String locale;

	/**
	 * localeゲッター
	 *
	 * @return locale
	 */
	public String getLocale() {
		return locale;
	}

	/**
	 * localeセッター
	 *
	 * @param locale locale
	 */
	public void setLocale(String locale) {
		this.locale = locale;
	}

	/**
	 * rightHanded
	 */
	private Boolean rightHanded;

	/**
	 * rightHandedゲッター
	 *
	 * @return rightHanded
	 */
	public Boolean getRightHanded() {
		return rightHanded;
	}

	/**
	 * rightHandedセッター
	 *
	 * @param rightHanded rightHanded
	 */
	public void setRightHanded(Boolean rightHanded) {
		this.rightHanded = rightHanded;
	}

	/**
	 * sessionTimeout
	 */
	private Integer sessionTimeout;

	/**
	 * sessionTimeoutゲッター
	 *
	 * @return sessionTimeout
	 */
	public Integer getSessionTimeout() {
		return sessionTimeout;
	}

	/**
	 * sessionTimeoutセッター
	 *
	 * @param sessionTimeout sessionTimeout
	 */
	public void setSessionTimeout(Integer sessionTimeout) {
		this.sessionTimeout = sessionTimeout;
	}

	/**
	 * usingSystemTimeout
	 */
	private Boolean usingSystemTimeout;

	/**
	 * usingSystemTimeoutゲッター
	 *
	 * @return usingSystemTimeout
	 */
	public Boolean getUsingSystemTimeout() {
		return usingSystemTimeout;
	}

	/**
	 * usingSystemTimeoutセッター
	 *
	 * @param usingSystemTimeout usingSystemTimeout
	 */
	public void setUsingSystemTimeout(Boolean usingSystemTimeout) {
		this.usingSystemTimeout = usingSystemTimeout;
	}

	/**
	 * バスワード変更通算秒
	 */
	private Long passwordSetTS;

	/**
	 * バスワード変更通算秒ゲッター
	 *
	 * @return バスワード変更通算秒
	 */
	public Long getPasswordSetTS() {
		return passwordSetTS;
	}

	/**
	 * バスワード変更通算秒セッター
	 *
	 * @param passwordSetTS バスワード変更通算秒
	 */
	public void setPasswordSetTS(Long passwordSetTS) {
		this.passwordSetTS = passwordSetTS;
	}

	/**
	 * passwordResetRequired
	 */
	private Boolean passwordResetRequired;

	/**
	 * passwordResetRequiredゲッター
	 *
	 * @return passwordResetRequired
	 */
	public Boolean getPasswordResetRequired() {
		return passwordResetRequired;
	}

	/**
	 * passwordResetRequiredセッター
	 *
	 * @param passwordResetRequired passwordResetRequired
	 */
	public void setPasswordResetRequired(Boolean passwordResetRequired) {
		this.passwordResetRequired = passwordResetRequired;
	}

	/**
	 * パスワード有効期限（日）
	 */
	private Long passwordExpirationDays;
	private Long passwordExpirationDate;

	/**
	 * パスワード有効期限（日）ゲッター
	 *
	 * @return パスワード有効期限（日）
	 */
	public Long getPasswordExpirationDays() {
		return passwordExpirationDays;
	}

	/**
	 * パスワード有効期限（日）セッター
	 *
	 * @param passwordExpirationDays パスワード有効期限（日）
	 */
	public void setPasswordExpirationDays(Long passwordExpirationDays) {
		this.passwordExpirationDays = passwordExpirationDays;
	}

	/**
	 * inactive
	 */
	private Boolean inactive;

	/**
	 * inactiveゲッター
	 *
	 * @return inactive
	 */
	public Boolean getInactive() {
		return inactive;
	}

	/**
	 * inactiveセッター
	 *
	 * @param inactive inactive
	 */
	public void setInactive(Boolean inactive) {
		this.inactive = inactive;
	}

	/**
	 * usernameLowercase
	 */
	private String usernameLowercase;

	/**
	 * usernameLowercaseゲッター
	 *
	 * @return usernameLowercase
	 */
	public String getUsernameLowercase() {
		return usernameLowercase;
	}

	/**
	 * usernameLowercaseセッター
	 *
	 * @param usernameLowercase usernameLowercase
	 */
	public void setUsernameLowercase(String usernameLowercase) {
		this.usernameLowercase = usernameLowercase;
	}

	/**
	 * responsibleStore
	 */
	private String responsibleStore;

	/**
	 * responsibleStoreゲッター
	 *
	 * @return responsibleStore
	 */
	public String getResponsibleStore() {
		return responsibleStore;
	}

	/**
	 * responsibleStoreセッター
	 *
	 * @param responsibleStore responsibleStore
	 */
	public void setResponsibleStore(String responsibleStore) {
		this.responsibleStore = responsibleStore;
	}

	/**
	 * accessAuthority
	 */
	private String accessAuthority;

	/**
	 * accessAuthorityゲッター
	 *
	 * @return accessAuthority
	 */
	public String getAccessAuthority() {
		return accessAuthority;
	}

	/**
	 * accessAuthorityセッター
	 *
	 * @param accessAuthority accessAuthority
	 */
	public void setAccessAuthority(String accessAuthority) {
		this.accessAuthority = accessAuthority;
	}

	/**
	 * affiliationStore
	 */
	private String affiliationStore;

	/**
	 * affiliationStoreゲッター
	 *
	 * @return affiliationStore
	 */
	public String getAffiliationStore() {
		return affiliationStore;
	}

	/**
	 * affiliationStoreセッター
	 *
	 * @param affiliationStore affiliationStore
	 */
	public void setAffiliationStore(String affiliationStore) {
		this.affiliationStore = affiliationStore;
	}

	/**
	 * posPrintingName
	 */
	private String posPrintingName;

	/**
	 * posPrintingNameゲッター
	 *
	 * @return posPrintingName
	 */
	public String getPosPrintingName() {
		return posPrintingName;
	}

	/**
	 * posPrintingNameセッター
	 *
	 * @param posPrintingName posPrintingName
	 */
	public void setPosPrintingName(String posPrintingName) {
		this.posPrintingName = posPrintingName;
	}

	/**
	 * posPassword
	 */
	private String posPassword;

	/**
	 * posPasswordゲッター
	 *
	 * @return posPassword
	 */
	public String getPosPassword() {
		return posPassword;
	}

	/**
	 * posPasswordセッター
	 *
	 * @param posPassword posPassword
	 */
	public void setPosPassword(String posPassword) {
		this.posPassword = posPassword;
	}

	/**
	 * headquartersPermission
	 */
	private boolean headquartersPermission;

	/**
	 * headquartersPermissionゲッター
	 *
	 * @return headquartersPermission
	 */
	// public String getHeadquartersPermission() {
	// return headquartersPermission;
	// }
	//
	// /**
	// * headquartersPermissionセッター
	// *
	// * @param headquartersPermission headquartersPermission
	// */
	// public void setHeadquartersPermission(b headquartersPermission) {
	// this.headquartersPermission = headquartersPermission;
	// }

	/**
	 * posOperationPermission
	 */
	@JsonProperty("posOperationPermission")
	private AuthorizationPosOperationPermissionRequestModel posOperationPermission;

	/**
	 * posOperationPermissionゲッター
	 *
	 * @return posOperationPermission
	 */
	public AuthorizationPosOperationPermissionRequestModel getPosOperationPermission() {
		return posOperationPermission;
	}

	/**
	 * posOperationPermissionセッター
	 *
	 * @param posOperationPermission posOperationPermission
	 */
	public void setPosOperationPermission(
			AuthorizationPosOperationPermissionRequestModel posOperationPermission) {
		this.posOperationPermission = posOperationPermission;
	}

	/**
	 * personInChargeCode
	 */
	private String personInChargeCode;

	/**
	 * personInChargeCodeゲッター
	 *
	 * @return personInChargeCode
	 */
	public String getPersonInChargeCode() {
		return personInChargeCode;
	}

	/**
	 * personInChargeCodeセッター
	 *
	 * @param personInChargeCode personInChargeCode
	 */
	public void setPersonInChargeCode(String personInChargeCode) {
		this.personInChargeCode = personInChargeCode;
	}

	/**
	 * notes
	 */
	private String notes;

	/**
	 * notesゲッター
	 *
	 * @return notes
	 */
	public String getNotes() {
		return notes;
	}

	/**
	 * notesセッター
	 *
	 * @param notes notes
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}

	/**
	 * no_locale_on_purpose
	 */
	private String no_locale_on_purpose;

	/**
	 * no_locale_on_purposeゲッター
	 *
	 * @return no_locale_on_purpose
	 */
	public String getNo_locale_on_purpose() {
		return no_locale_on_purpose;
	}

	/**
	 * no_locale_on_purposeセッター
	 *
	 * @param no_locale_on_purpose no_locale_on_purpose
	 */
	public void setNo_locale_on_purpose(String no_locale_on_purpose) {
		this.no_locale_on_purpose = no_locale_on_purpose;
	}

	private Short transactionSearch;
	private Short changeReserve;
	private Short percentOff;
	private Short registerMinus;
	private Short withdrawal;
	private Short percentExtra;
	private Short salesChange;
	private Short cancellation;
	private Short audit;
	private Short report;
	private Short deposit;
	private Short exchange;
	private Short amountOff;
	private Short calculate;
	private Short returnValue;
	private Integer passwordErrorCount;

	private String posUserName;
	private String homeNodeId;
	private String belongStoreText;
	private String chargeCdText;
	private List<String> responsibleStores;
	private List<UserAccessModel> userAccessModelList;

	/**
	 * 画面表示用
	 *
	 * @return
	 */
	public String getDisplayCode() {
		if (username != null && username.length() > 15) {
			return username.substring(15);
		}
		return username;
	}

}
