package com.ttss.prementenance.model;


import lombok.Data;

/**
 * endpoint-status共通 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EndpintStatusCommonModel {
	public EndpintStatusCommonModel() {}

	/** AS #1415 tillId不足
	/**
	 * tillID
	 */
	private String tillId;
	/**
	 * tillIdゲッター
	 *
	 * @return tillId
	 */
	public String getTillId() {
		return tillId;
	}
	/**
	 * tillIDセッター
	 *
	 * @param tillId tillId
	 */
	public void setTillId(String tillId) {
		this.tillId = tillId;
	}
	/** AE #1415 tillID不足 **/
	
	/**
	 * createTimestamp
	 */
	private String createTimestamp;
	/**
	 * createTimestampゲッター
	 *
	 * @return createTimestamp
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}
	/**
	 * createTimestampセッター
	 *
	 * @param createTimestamp createTimestamp
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * lastModifiedTimestamp
	 */
	private String lastModifiedTimestamp;
	/**
	 * lastModifiedTimestampゲッター
	 *
	 * @return lastModifiedTimestamp
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}
	/**
	 * lastModifiedTimestampセッター
	 *
	 * @param lastModifiedTimestamp lastModifiedTimestamp
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * version
	 */
	private Long version;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Long getVersion() {
		return version;
	}
	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	/**
	 * lastModifiedUserId
	 */
	private String lastModifiedUserId;
	/**
	 * lastModifiedUserIdゲッター
	 *
	 * @return lastModifiedUserId
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}
	/**
	 * lastModifiedUserIdセッター
	 *
	 * @param lastModifiedUserId lastModifiedUserId
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

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
	 * transactionId
	 */
	private String transactionId;
	/**
	 * transactionIdゲッター
	 *
	 * @return transactionId
	 */
	public String getTransactionId() {
		return transactionId;
	}
	/**
	 * transactionIdセッター
	 *
	 * @param transactionId transactionId
	 */
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
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
	 * 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）[terminationState, afterStarting, idleState, registering]
	 */
	private String status;
	/**
	 * 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）[terminationState, afterStarting, idleState, registering]ゲッター
	 *
	 * @return 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）[terminationState, afterStarting, idleState, registering]
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）[terminationState, afterStarting, idleState, registering]セッター
	 *
	 * @param status 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）[terminationState, afterStarting, idleState, registering]
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * トレーニングモード
	 */
	private Boolean trainingMode;
	/**
	 * トレーニングモードゲッター
	 *
	 * @return トレーニングモード
	 */
	public Boolean getTrainingMode() {
		return trainingMode;
	}
	/**
	 * トレーニングモードセッター
	 *
	 * @param trainingMode トレーニングモード
	 */
	public void setTrainingMode(Boolean trainingMode) {
		this.trainingMode = trainingMode;
	}

	// KSD V001.000 AS issue#1203対応
	/**
	 * サービスモード
	 */
	private Boolean serviceMode;
	/**
	 * サービスモードゲッター
	 *
	 * @return サービスモード
	 */
	public Boolean getServiceMode() {
		return serviceMode;
	}
	/**
	 * サービスモードセッター
	 *
	 * @param trainingMode サービスモード
	 */
	public void setServiceMode(Boolean serviceMode) {
		this.serviceMode = serviceMode;
	}
	// KSD V001.000 AE issue#1203対応
}

