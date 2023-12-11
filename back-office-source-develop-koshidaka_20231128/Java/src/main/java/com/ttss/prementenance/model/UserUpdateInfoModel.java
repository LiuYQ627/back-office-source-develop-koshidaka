package com.ttss.prementenance.model;

import java.util.List;

import javax.validation.GroupSequence;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;
import org.springframework.util.StringUtils;

import com.ttss.prementenance.utils.validation.ByteSize;

import lombok.Data;

// ==============================================================================
// 機能概要：ユーザマスタ更新 ユーザ情報 データモデル
// 作成者：TSS 岩崎 由佳子
// 作成年月日：2020/11/11
// 備考：
// ==============================================================================

/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230109 litie(Neusoft)     G001.00.0  issue課題#1232を対応します.
 * 20230609 wangchunmei(Neusoft)     G002.00.0  issue課題#1672を対応します.
 * 20230628 wangchunmei(Neusoft)     G003.00.0  issue課題alp#3498を対応します.
 */

/**
 * ユーザマスタ更新 ユーザ情報 データモデル.
 *
 * @author TSS 早川 剛生
 * @version 1.0.0
 */
@Data
public class UserUpdateInfoModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface UserUpdateInfoNameOrder1 {
	}

	public interface UserUpdateInfoNameOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ UserUpdateInfoNameOrder1.class, UserUpdateInfoNameOrder2.class })
	public interface GroupNameOrder {
	}

	public UserUpdateInfoModel() {
	}

	/**
	 * ユーザID.
	 */
	@Size(min = 1, max = 50)
	@Pattern(regexp = "^[a-zA-Z0-9]*$")
	private String userId;

	/**
	 * 名称.
	 */
	@NotEmpty(groups = { UserUpdateInfoNameOrder1.class })
	@ByteSize(min = 1, max = 20, fullWidthMin = 1, fullWidthMax = 10, encoding = "Shift-JIS", groups = {
			UserUpdateInfoNameOrder2.class })
	private String name;

	/**
	 * パスワード更新フラグ.
	 */
	@Range(min = 0, max = 1)
	private short passwordUpdateFlg;

	/**
	 * パスワード.
	 */
	// G001.00.0 Update-Start
	// @Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	// G001.00.0 Update-End
	private String password;

	/**
	 * ロールコード.
	 */
	// @NotNull
	private Integer roleCd;

	/**
	 * パスワード有効期限.
	 */
	@Range(min = 1, max = 99)
	private short passwordExpirationDate;

	/**
	 * 所属店舗コード.
	 */
	// @NotNull
	private String belongStoreCd;

	/**
	 * 本部権限.
	 */
	// @Range(min = 0, max = 1)
	private short headquartersPermission;

	/**
	 * 担当店舗情報.
	 */
	private List<ChargeStoreCdModel> chargeStoreCds;

	/**
	 * posOperationPermission
	 */
	private AuthorizationPosOperationPermissionRequestModel posOperationPermission;

	/**
	 * 値引.
	 */
	private short amountOff;

	/**
	 * 割引.
	 */
	private short percentOff;

	/**
	 * 売変.
	 */
	private short salesChange;

	/**
	 * 取引中止.
	 */
	private short cancellation;

	/**
	 * 入金.
	 */
	private short deposit;

	/**
	 * 出金.
	 */
	private short withdrawal;

	/**
	 * 釣銭準備金入力.
	 */
	private short changeReserve;

	/**
	 * レポート.
	 */
	private short report;

	/**
	 * 取引検索.
	 */
	private short transactionSearch;

	/**
	 * レジマイナス.
	 */
	private short registerMinus;

	/**
	 * 返品.
	 */
	private short returnValue;

	/**
	 * 監査.
	 */
	private short audit;

	/**
	 * 清算.
	 */
	private short calculate;

	/**
	 * 責任者No.
	 */
	private String username;

	/**
	 * POS印字名称.
	 */
	private String posPrintingName;

	/**
	 * POSパスワード.
	 */
	// G001.00.0 Update-Start
	// @Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	// G001.00.0 Update-End
	private String posPassword;

	/**
	 * 責任者No.
	 */
	@Size(max = 8)
	@Pattern(regexp = "^[0-9]*$", message = "{validation.Pattern.AlphaNumOnly.message}")
	private String posUserName;

	// G002.00.0 Add-Start
	@Range(min = 0, max = 1)
	private short posPasswordUpdateFlg;
	// G002.00.0 Add-End

	// G003.00.0 Add-Start
	private Long passwordSetTS;
	// G003.00.0 Add-End

	// KSD V001.000 AS
	/*
	 * 両替権限
	 */
	private short exchange;

	/*
	 * 釣銭機在高点検
	 */
	private short changeMachineInventoryCheck;
	
	/*
	 * 入金機回収
	 */
	private short changeMachineRemaining;
	
	/*
	 * 釣銭機接続／切離
	 */
	private short changeMachineConnectDisconnect;
	
	/*
	 * 手持在高入力
	 */
	private short amountInput;

	/*
	 * OESプログラム送信
	 */
	private short oesProg;

	/*
	 * OES設定送信
	 */
	private short oesSet;

	/*
	 * 一部訂正
	 */
	private short partCorrcet;

	/*
	 * 締め訂正
	 */
	private short tendCorrcet;

	/*
	 * 未会計オ一ダ`一取消
	 */
	private short unpaidDelete;

	/*
	 * OES時刻同期
	 */
	private short oesTime;

	// KSD V001.000 AE

	/**
	 * ユーザIDゲッター.
	 *
	 * @return ユーザID
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
	 * パスワード更新フラグゲッター.
	 *
	 * @return パスワード更新フラグ
	 */
	public short getPasswordUpdateFlg() {
		return passwordUpdateFlg;
	}

	/**
	 * パスワード更新フラグセッター.
	 *
	 * @param passwordUpdateFlg パスワード更新フラグ
	 */
	public void setPasswordUpdateFlg(short passwordUpdateFlg) {
		this.passwordUpdateFlg = passwordUpdateFlg;
	}

	/**
	 * パスワードゲッター.
	 *
	 * @return パスワード
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * パスワードセッター.
	 *
	 * @param password パスワード
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * ロールコードゲッター.
	 *
	 * @return ロールコード
	 */
	public Integer getRoleCd() {
		return roleCd;
	}

	/**
	 * ロールコードセッター.
	 *
	 * @param roleCd ロールコード
	 */
	public void setRoleCd(Integer roleCd) {
		this.roleCd = roleCd;
	}

	/**
	 * パスワード有効期限ゲッター.
	 *
	 * @return パスワード有効期限
	 */
	public short getPasswordExpirationDate() {
		return passwordExpirationDate;
	}

	/**
	 * パスワード有効期限セッター.
	 *
	 * @param passwordExpirationDate パスワード有効期限
	 */
	public void setPasswordExpirationDate(short passwordExpirationDate) {
		this.passwordExpirationDate = passwordExpirationDate;
	}

	// /**
	// * 所属店舗コードゲッター.
	// *
	// * @return 所属店舗コード
	// */
	// public Integer getBelongStoreCd() {
	// return belongStoreCd;
	// }
	//
	// /**
	// * 所属店舗コードセッター.
	// *
	// * @param belongStoreCd 所属店舗コード
	// */
	// public void setBelongStoreCd(Integer belongStoreCd) {
	// this.belongStoreCd = belongStoreCd;
	// }

	// /**
	// * 本部権限ゲッター.
	// *
	// * @return headquartersAuthority
	// */
	// public short getHeadquartersAuthority() {
	// return headquartersAuthority;
	// }

	// /**
	// * 本部権限セッター.
	// *
	// * @param headquartersAuthority 本部権限
	// */
	// public void setHeadquartersAuthority(short headquartersAuthority) {
	// this.headquartersAuthority = headquartersAuthority;
	// }
	//
	// /**
	// * 担当店舗情報ゲッター.
	// *
	// * @return chargeStoreCds
	// */
	// public List<ChargeStoreCdModel> getChargeStoreCds() {
	// return chargeStoreCds;
	// }

	/**
	 * 担当店舗情報セッター.
	 *
	 * @param chargeStoreCds 担当店舗情報
	 */
	public void setChargeStoreCds(List<ChargeStoreCdModel> chargeStoreCds) {
		this.chargeStoreCds = chargeStoreCds;
	}

	/**
	 * モード（更新/新規）.
	 */
	private short mode;

	/**
	 * モード（更新/新規）ゲッター.
	 *
	 * @return モード（更新/新規）
	 */
	public short getMode() {
		return mode;
	}

	/**
	 * モード（更新/新規）セッター.
	 *
	 * @param mode モード（更新/新規）
	 */
	public void setMode(short mode) {
		this.mode = mode;
	}

	/**
	 * id.
	 */
	private String id;

	/**
	 * idゲッター.
	 *
	 * @return id
	 */
	public String getId() {
		return id;
	}

	/**
	 * idセッター.
	 *
	 * @param id id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * version.
	 */
	private Long version;

	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * versionセッター.
	 *
	 * @param version version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	public AuthorizationPosOperationPermissionRequestModel getPosOperationPermission() {
		return posOperationPermission;
	}

	public void setPosOperationPermission(
			AuthorizationPosOperationPermissionRequestModel posOperationPermission) {
		this.posOperationPermission = posOperationPermission;
	}

	public short getAmountOff() {
		return amountOff;
	}

	public void setAmountOff(short amountOff) {
		this.amountOff = amountOff;
	}

	public short getPercentOff() {
		return percentOff;
	}

	public void setPercentOff(short percentOff) {
		this.percentOff = percentOff;
	}

	public short getSalesChange() {
		return salesChange;
	}

	public void setSalesChange(short salesChange) {
		this.salesChange = salesChange;
	}

	public short getCancellation() {
		return cancellation;
	}

	public void setCancellation(short cancellation) {
		this.cancellation = cancellation;
	}

	public short getDeposit() {
		return deposit;
	}

	public void setDeposit(short deposit) {
		this.deposit = deposit;
	}

	public short getWithdrawal() {
		return withdrawal;
	}

	public void setWithdrawal(short withdrawal) {
		this.withdrawal = withdrawal;
	}

	public short getChangeReserve() {
		return changeReserve;
	}

	public void setChangeReserve(short changeReserve) {
		this.changeReserve = changeReserve;
	}

	public short getReport() {
		return report;
	}

	public void setReport(short report) {
		this.report = report;
	}

	public short getTransactionSearch() {
		return transactionSearch;
	}

	public void setTransactionSearch(short transactionSearch) {
		this.transactionSearch = transactionSearch;
	}

	public short getRegisterMinus() {
		return registerMinus;
	}

	public void setRegisterMinus(short registerMinus) {
		this.registerMinus = registerMinus;
	}

	public short getReturnValue() {
		return returnValue;
	}

	public void setReturnValue(short returnValue) {
		this.returnValue = returnValue;
	}

	public short getAudit() {
		return audit;
	}

	public void setAudit(short audit) {
		this.audit = audit;
	}

	public short getCalculate() {
		return calculate;
	}

	public void setCalculate(short calculate) {
		this.calculate = calculate;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPosPrintingName() {
		return posPrintingName;
	}

	public void setPosPrintingName(String posPrintingName) {
		this.posPrintingName = posPrintingName;
	}

	public String getPosPassword() {
		return posPassword;
	}

	public void setPosPassword(String posPassword) {
		this.posPassword = posPassword;
	}

	@NotEmpty
	private String accessAuthority;

	@AssertTrue(message = "{javax.validation.constraints.NotNull.message}")
	public boolean isBelogStore() {
		if (headquartersPermission == 0) {
			if (belongStoreCd == null || StringUtils.isEmpty(belongStoreCd)) {
				return false;
			}
		}
		return true;
	}

	@AssertTrue(message = "{javax.validation.constraints.NotNull.message}")
	public boolean isChargeStore() {
		if (headquartersPermission == 1) {
			if (chargeStoreCds == null || chargeStoreCds.size() == 0) {
				return false;
			}
		}
		return true;
	}
}
