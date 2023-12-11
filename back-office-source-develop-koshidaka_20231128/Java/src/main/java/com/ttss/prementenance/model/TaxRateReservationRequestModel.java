package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 税率設定　データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class TaxRateReservationRequestModel {
	public TaxRateReservationRequestModel() {
	}

	/**
	 * id
	 */
	private String id;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * nodeId.
	 */
	private String nodeId;

	/**
	 * nodeIdゲッター.
	 * 
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * nodeIdセッター.
	 * 
	 * @param nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * type.
	 */
	private String type;

	/**
	 * typeゲッター.
	 * 
	 * @return type
	 */
	public String getType() {
		return type;
	}

	/**
	 * typeセッター.
	 * 
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * executionDate.
	 */
	private String executionDate;

	/**
	 * executionDateゲッター.
	 * 
	 * @return executionDate
	 */
	public String getExecutionDate() {
		return executionDate;
	}

	/**
	 * executionDateセッター.
	 * 
	 * @param executionDate
	 */
	public void setExecutionDate(String executionDate) {
		this.executionDate = executionDate;
	}

}
