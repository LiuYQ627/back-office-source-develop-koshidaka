package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * アイテム情報リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCatalogNameItemsItemIdRequestModel {
	public CatalogsCatalogNameItemsItemIdRequestModel() {}

	/**
	 * sparse
	 */
	private Boolean sparse;
	/**
	 * sparseゲッター
	 *
	 * @return sparse
	 */
	public Boolean getSparse() {
		return sparse;
	}
	/**
	 * sparseセッター
	 *
	 * @param sparse sparse
	 */
	public void setSparse(Boolean sparse) {
		this.sparse = sparse;
	}

	/**
	 * FALLTHROUGH
	 */
	private Boolean FALLTHROUGH;
	/**
	 * FALLTHROUGHゲッター
	 *
	 * @return FALLTHROUGH
	 */
	public Boolean getFALLTHROUGH() {
		return FALLTHROUGH;
	}
	/**
	 * FALLTHROUGHセッター
	 *
	 * @param FALLTHROUGH FALLTHROUGH
	 */
	public void setFALLTHROUGH(Boolean FALLTHROUGH) {
		this.FALLTHROUGH = FALLTHROUGH;
	}

	/**
	 * changePlanName
	 */
	private String changePlanName;
	/**
	 * changePlanNameゲッター
	 *
	 * @return changePlanName
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * changePlanNameセッター
	 *
	 * @param changePlanName changePlanName
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * groupName
	 */
	private String groupName;
	/**
	 * groupNameゲッター
	 *
	 * @return groupName
	 */
	public String getGroupName() {
		return groupName;
	}
	/**
	 * groupNameセッター
	 *
	 * @param groupName groupName
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

}

