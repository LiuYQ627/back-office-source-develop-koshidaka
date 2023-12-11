package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Authorizationユーザロール取得リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthorizationPosOperationPermissionRequestModel {
	public AuthorizationPosOperationPermissionRequestModel() {
	}

	private boolean transactionSearch;
	private boolean changeReserve;
	private boolean percentOff;
	private boolean registerMinus;
	private boolean withdrawal;
	private boolean percentExtra;
	private boolean salesChange;
	private boolean cancellation;
	private boolean audit;
	private boolean report;
	private boolean deposit;
	private boolean exchange;
	private boolean amountOff;
	private boolean calculate;
	private boolean returnValue;

	// KSD V001.000 AS
	
	/*
	 * 釣銭機在高点検
	 */
	private boolean changeMachineInventoryCheck;
	
	/*
	 * 入金機回収
	 */
	private boolean changeMachineRemaining;
	
	/*
	 * 釣銭機接続／切離
	 */
	private boolean changeMachineConnectDisconnect;

	/*
	 * 手持在高入力
	 */
	private boolean amountInput;

	/*
	 * OESプログラム送信
	 */
	private boolean oesProg;

	/*
	 * OES設定送信
	 */
	private boolean oesSet;

	/*
	 * 一部訂正
	 */
	private boolean partCorrcet;

	/*
	 * 締め訂正
	 */
	private boolean tendCorrcet;

	/*
	 * 未会計オ一ダ`一取消
	 */
	private boolean unpaidDelete;
	
	/*
	 * OES時刻同期
	 */
	private boolean oesTime;

	// KSD V001.000 AE

	// public String getTransactionSearch() {
	// return transactionSearch;
	// }
	//
	// public void setTransactionSearch(String transactionSearch) {
	// this.transactionSearch = transactionSearch;
	// }
	//
	// public String getChangeReserve() {
	// return changeReserve;
	// }
	//
	// public void setChangeReserve(String changeReserve) {
	// this.changeReserve = changeReserve;
	// }
	//
	// public String getPercentOff() {
	// return percentOff;
	// }
	//
	// public void setPercentOff(String percentOff) {
	// this.percentOff = percentOff;
	// }
	//
	// public String getRegisterMinus() {
	// return registerMinus;
	// }
	//
	// public void setRegisterMinus(String registerMinus) {
	// this.registerMinus = registerMinus;
	// }
	//
	// public String getWithdrawal() {
	// return withdrawal;
	// }
	//
	// public void setWithdrawal(String withdrawal) {
	// this.withdrawal = withdrawal;
	// }
	//
	// public String getPercentExtra() {
	// return percentExtra;
	// }
	//
	// public void setPercentExtra(String percentExtra) {
	// this.percentExtra = percentExtra;
	// }
	//
	// public String getSalesChange() {
	// return salesChange;
	// }
	//
	// public void setSalesChange(String salesChange) {
	// this.salesChange = salesChange;
	// }
	//
	// public String getCancellation() {
	// return cancellation;
	// }
	//
	// public void setCancellation(String cancellation) {
	// this.cancellation = cancellation;
	// }
	//
	// public String getAudit() {
	// return audit;
	// }
	//
	// public void setAudit(String audit) {
	// this.audit = audit;
	// }
	//
	// public String getReport() {
	// return report;
	// }
	//
	// public void setReport(String report) {
	// this.report = report;
	// }
	//
	// public String getDeposit() {
	// return deposit;
	// }
	//
	// public void setDeposit(String deposit) {
	// this.deposit = deposit;
	// }
	//
	// public String getExchange() {
	// return exchange;
	// }
	//
	// public void setExchange(String exchange) {
	// this.exchange = exchange;
	// }
	//
	// public String getAmountOff() {
	// return amountOff;
	// }
	//
	// public void setAmountOff(String amountOff) {
	// this.amountOff = amountOff;
	// }
	//
	// public String getCalculate() {
	// return calculate;
	// }
	//
	// public void setCalculate(String calculate) {
	// this.calculate = calculate;
	// }
	//
	// public String getReturnValue() {
	// return returnValue;
	// }
	//
	// public void setReturnValue(String returnValue) {
	// this.returnValue = returnValue;
	// }

}
