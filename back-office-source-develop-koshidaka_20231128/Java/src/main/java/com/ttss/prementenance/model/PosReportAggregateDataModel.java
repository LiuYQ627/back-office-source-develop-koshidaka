package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
* POSレポート出力 AggregateDataモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class PosReportAggregateDataModel {
	public PosReportAggregateDataModel() {
	}

	/**
	 * storeName
	 */
	private String storeName;

	/**
	 * storeNameゲッター.
	 *
	 * @return storeName
	 */
	public String getStoreName() {
		return storeName;
	}

	/**
	 * storeNameセッター.
	 *
	 * @param storeName
	 */
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	/**
	 * endpoints
	 */
	private List<PosReportEndpointModel> endpoints;

	/**
	 * endpointsゲッター.
	 *
	 * @return endpoints
	 */
	public List<PosReportEndpointModel> getEndpoints() {
		return endpoints;
	}

	/**
	 * endpointsセッター.
	 *
	 * @param endpoints
	 */
	public void setEndpoints(List<PosReportEndpointModel> endpoints) {
		this.endpoints = endpoints;
	}

}
