package com.ttss.prementenance.model;


import lombok.Data;

/**
 * endpoint-statusエンドポイント状態の照会レスポンス データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class EndpointStatusStatusResponseModel {
	public EndpointStatusStatusResponseModel() {}

	/**
	 * deviceRecord
	 */
	private DevicesCommonModel deviceRecord = new DevicesCommonModel();
	/**
	 * deviceRecordゲッター
	 *
	 * @return deviceRecord
	 */
	public DevicesCommonModel getDeviceRecord() {
		return deviceRecord;
	}
	/**
	 * deviceRecordセッター
	 *
	 * @param deviceRecord deviceRecord
	 */
	public void setDeviceRecord(DevicesCommonModel deviceRecord) {
		this.deviceRecord = deviceRecord;
	}

	/**
	 * endpointStatus
	 */
	private EndpintStatusCommonModel endpointStatus = new EndpintStatusCommonModel();
	/**
	 * endpointStatusゲッター
	 *
	 * @return endpointStatus
	 */
	public EndpintStatusCommonModel getEndpointStatus() {
		return endpointStatus;
	}
	/**
	 * endpointStatusセッター
	 *
	 * @param endpointStatus endpointStatus
	 */
	public void setEndpointStatus(EndpintStatusCommonModel endpointStatus) {
		this.endpointStatus = endpointStatus;
	}

}

