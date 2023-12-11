package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 商品構成のリンク階層を取得するAPIサービスのリクエストパラメータ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class CatalogsGroupsHierarchyRequestModel {
	public CatalogsGroupsHierarchyRequestModel() {}

	/**
	 * 対象商品構成名
	 */
	private String groupName;
	/**
	 * 対象商品構成名ゲッター
	 *
	 * @return groupName
	 */
	public String getGroupName() {
		return groupName;
	}
	/**
	 * 対象商品構成名セッター
	 *
	 * @param groupName 対象商品構成名
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/**
	 * 取得階層数
	 */
	private Long level;
	/**
	 * 取得階層数ゲッター
	 *
	 * @return 取得階層数
	 */
	public Long getLevel() {
		return level;
	}
	/**
	 * 取得階層数セッター
	 *
	 * @param level 取得階層数
	 */
	public void setLevel(Long level) {
		this.level = level;
	}

}
