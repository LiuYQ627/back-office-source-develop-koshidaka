package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetReservationDateRequestModel {

	public GetReservationDateRequestModel() {
	}

	/**
	 * 店舗ID.
	 */
	private String nodeId;

	/**
	 * 店舗IDゲッター.
	 * 
	 * @return 店舗コードコード
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * 店舗IDセッター.
	 * 
	 * @param storeCd 店舗コード
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * excludeFields.
	 */
	private Boolean excludeFields;

	/**
	 * excludeFieldsゲッター.
	 * 
	 * @return excludeFields
	 */
	public Boolean getExcludeFields() {
		return excludeFields;
	}

	/**
	 * excludeFieldsセッター.
	 * 
	 * @param excludeFields excludeFields
	 */
	public void setExcludeFields(Boolean excludeFields) {
		this.excludeFields = excludeFields;
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
	 * @param type 対象日付Start
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
	 * @return type
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
