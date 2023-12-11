package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 変更計画共通結果 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class ChangePlanResultCommonModel {
	public ChangePlanResultCommonModel() {}

	/**
	 * nodesUpdated
	 */
	private Integer nodesUpdated;
	/**
	 * nodesUpdatedゲッター
	 *
	 * @return nodesUpdated
	 */
	public Integer getNodesUpdated() {
		return nodesUpdated;
	}
	/**
	 * nodesUpdatedセッター
	 *
	 * @param nodesUpdated nodesUpdated
	 */
	public void setNodesUpdated(Integer nodesUpdated) {
		this.nodesUpdated = nodesUpdated;
	}

	/**
	 * nodesDeleted
	 */
	private Integer nodesDeleted;
	/**
	 * nodesDeletedゲッター
	 *
	 * @return nodesDeleted
	 */
	public Integer getNodesDeleted() {
		return nodesDeleted;
	}
	/**
	 * nodesDeletedセッター
	 *
	 * @param nodesDeleted nodesDeleted
	 */
	public void setNodesDeleted(Integer nodesDeleted) {
		this.nodesDeleted = nodesDeleted;
	}

	/**
	 * executingService
	 */
	private String executingService;
	/**
	 * executingServiceゲッター
	 *
	 * @return executingService
	 */
	public String getExecutingService() {
		return executingService;
	}
	/**
	 * executingServiceセッター
	 *
	 * @param executingService executingService
	 */
	public void setExecutingService(String executingService) {
		this.executingService = executingService;
	}

}

