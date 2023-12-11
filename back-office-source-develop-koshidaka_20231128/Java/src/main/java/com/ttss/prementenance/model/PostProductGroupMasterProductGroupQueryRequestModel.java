package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 商品マスタ検索リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostProductGroupMasterProductGroupQueryRequestModel {
	public PostProductGroupMasterProductGroupQueryRequestModel() {
		setQueryMode("ALL");
		setQueryLimit(50L);
	}

	/**
	 * nodeId
	 */
	@NotEmpty
	private String nodeId;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * queryMode
	 */
	private String queryMode;
	/**
	 * queryModeゲッター
	 *
	 * @return queryMode
	 */
	public String getQueryMode() {
		return queryMode;
	}
	/**
	 * queryModeセッター
	 *
	 * @param queryMode queryMode
	 */
	public void setQueryMode(String queryMode) {
		this.queryMode = queryMode;
	}

	/**
	 * queryLimit
	 */
	private Long queryLimit;
	/**
	 * queryLimitゲッター
	 *
	 * @return queryLimit
	 */
	public Long getQueryLimit() {
		return queryLimit;
	}
	/**
	 * queryLimitセッター
	 *
	 * @param queryLimit queryLimit
	 */
	public void setQueryLimit(Long queryLimit) {
		this.queryLimit = queryLimit;
	}

	/**
	 * searchParams
	 */
	private String searchParams;
	/**
	 * searchParamsゲッター
	 *
	 * @return searchParams
	 */
	public String getSearchParams() {
		return searchParams;
	}
	/**
	 * searchParamsセッター
	 *
	 * @param searchParams searchParams
	 */
	public void setSearchParams(String searchParams) {
		this.searchParams = searchParams;
	}

}

