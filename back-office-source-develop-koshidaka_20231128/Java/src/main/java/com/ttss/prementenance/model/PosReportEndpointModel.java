package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
* 担当店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class PosReportEndpointModel {
	public PosReportEndpointModel() {
	}

	/**
	 * endpointId
	 */
	private String endpointId;

	/**
	 * endpointIdゲッター.
	 *
	 * @return endpointId
	 */
	public String getEndpointId() {
		return endpointId;
	}

	/**
	 * endpointIdセッター.
	 *
	 * @param endpointId
	 */
	public void setEndpointId(String endpointId) {
		this.endpointId = endpointId;
	}

	/**
	 * data
	 */
	private List<PosReportItemModel> data;

	/**
	 * dataゲッター.
	 *
	 * @return data
	 */
	public List<PosReportItemModel> getData() {
		return data;
	}

	/**
	 * dataセッター.
	 *
	 * @param data
	 */
	public void setData(List<PosReportItemModel> data) {
		this.data = data;
	}
}
