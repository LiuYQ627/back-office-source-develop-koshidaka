package com.ttss.prementenance.model;


import lombok.Data;

/**
 * endpoint-statusエンドポイント状態の照会リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EndpointStatusStatusRequestModel {
	public EndpointStatusStatusRequestModel() {}

	/**
	 * deviceId
	 */
	private String deviceId;
	/**
	 * deviceIdゲッター
	 *
	 * @return deviceId
	 */
	public String getDeviceId() {
		return deviceId;
	}
	/**
	 * deviceIdセッター
	 *
	 * @param deviceId deviceId
	 */
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	/**
	 * operatorId
	 */
	private String operatorId;
	/**
	 * operatorIdゲッター
	 *
	 * @return operatorId
	 */
	public String getOperatorId() {
		return operatorId;
	}
	/**
	 * operatorIdセッター
	 *
	 * @param operatorId operatorId
	 */
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}

	/**
	 * transactionIdtransactionId
	 */
	private String transactionIdtransactionId;
	/**
	 * transactionIdtransactionIdゲッター
	 *
	 * @return transactionIdtransactionId
	 */
	public String getTransactionIdtransactionId() {
		return transactionIdtransactionId;
	}
	/**
	 * transactionIdtransactionIdセッター
	 *
	 * @param transactionIdtransactionId transactionIdtransactionId
	 */
	public void setTransactionIdtransactionId(String transactionIdtransactionId) {
		this.transactionIdtransactionId = transactionIdtransactionId;
	}

}

