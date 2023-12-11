package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * 商品構成のリンク階層を取得するAPIサービスのレスポンスパラメータ データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class CatalogsGroupsHierarchyResponseModel {
	public CatalogsGroupsHierarchyResponseModel() {}

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
	 * リンク階層情報
	 */
	private List<CatalogsGroupsHierarchyLinkHierarchyModel> linkHierarchy;
	/**
	 * リンク階層情報ゲッター
	 *
	 * @return リンク階層情報
	 */
	public List<CatalogsGroupsHierarchyLinkHierarchyModel> getLinkHierarchy() {
		return linkHierarchy;
	}
	/**
	 * リンク階層情報セッター
	 *
	 * @param linkHierarchy リンク階層情報
	 */
	public void setLinkHierarchy(List<CatalogsGroupsHierarchyLinkHierarchyModel> linkHierarchy) {
		this.linkHierarchy = linkHierarchy;
	}

}
