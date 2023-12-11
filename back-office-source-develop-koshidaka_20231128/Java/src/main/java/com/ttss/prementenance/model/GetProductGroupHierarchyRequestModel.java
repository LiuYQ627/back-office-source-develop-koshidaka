package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 商品構成マスタリンク階層取得 リクエストパラメータ データモデル.
 * @author
 * @version 1.0.0
 */

@Data
public class GetProductGroupHierarchyRequestModel {

	public GetProductGroupHierarchyRequestModel() {
	}

	/**
	 * 店舗カタログ名.
	 */
	@NotEmpty
	private String catalogName;
	/**
	 * 店舗カタログ名ゲッター.
	 *
	 * @return 店舗カタログ名
	 */
	public String getCatalogName() {
		return catalogName;
	}
	/**
	 * 店舗カタログ名セッター.
	 *
	 * @param catalogName 店舗カタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	/**
	 * 取得対象グループ名.
	 */
	@NotEmpty
	private String groupName;
	/**
	 * 取得対象グループ名ゲッター.
	 *
	 * @return 取得対象グループ名
	 */
	public String getGroupName() {
		return groupName;
	}
	/**
	 * 取得対象グループ名セッター.
	 *
	 * @param groupName 取得対象グループ名
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/**
	 * 取得階層数
	 */
	@NotNull
	private Long level;
	/**
	 * 取得階層数ゲッター.
	 *
	 * @return 取得階層数
	 */
	public Long getLevel() {
		return level;
	}
	/**
	 * 取得階層数セッター.
	 *
	 * @param level 取得階層数
	 */
	public void setLevel(Long level) {
		this.level = level;
	}

}
