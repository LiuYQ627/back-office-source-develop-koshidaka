package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 商品構成コード条件抽出APIサービスのリクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostCatalogsCatalogNameGroupsItemsQueryRequestModel {
	public PostCatalogsCatalogNameGroupsItemsQueryRequestModel() {
		setQueryMode("ALL");
		setQueryLimit(50L);
	}

	/**
	 * 所属ノードID
	 */
	private String nodeId;
	/**
	 * 所属ノードIDゲッター
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * 所属ノードIDセッター
	 *
	 * @param nodeId 所属ノードID
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 検索条件
	 */
	private String keyword;
	/**
	 * 検索条件ゲッター
	 *
	 * @return 検索条件
	 */
	public String getKeyword() {
		return keyword;
	}
	/**
	 * 検索条件セッター
	 *
	 * @param keyword 検索条件※JSON形式
	 */
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	/**
	 * 検索モード※FIRST_MATCH/NEWEST/ALL （デフォルトはALL）
	 */
	private String queryMode;
	/**
	 * 検索モードゲッター
	 *
	 * @return 検索モード
	 */
	public String getQueryMode() {
		return queryMode;
	}
	/**
	 * 検索モードセッター
	 *
	 * @param queryMode 検索モード
	 */
	public void setQueryMode(String queryMode) {
		this.queryMode = queryMode;
	}

	/**
	 * 検索件数制限※0は全件 （デフォルトは50）
	 */
	private Long queryLimit;
	/**
	 * 検索件数制限ゲッター
	 *
	 * @return 検索件数制限
	 */
	public Long getQueryLimit() {
		return queryLimit;
	}
	/**
	 * 検索件数制限セッター
	 *
	 * @param queryLimit 検索件数制限
	 */
	public void setQueryLimit(Long queryLimit) {
		this.queryLimit = queryLimit;
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

}
