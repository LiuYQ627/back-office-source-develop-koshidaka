// KSD V001.000 AS
package com.ttss.prementenance.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 商品分類階層設定データモデル.
*
* @author 
* @version 
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsProductDivisionsModel {
  public ConfigurationsProductDivisionsModel() {}

	/**
	 * グループ.
	 */
	private String group;
	/**
	 * グループゲッター.
	 *
	 * @return グループ
	 */
	public String getGroup() {
		return group;
	}
	/**
	 * グループセッター.
	 *
	 * @param group グループ
	 */
	public void setGroup(String group) {
		this.group = group;
	}

	/**
	 * サブグループ.
	 */
	private String subGroup;
	/**
	 * サブグループゲッター.
	 *
	 * @return サブグループ
	 */
	public String getSubGroup() {
		return subGroup;
	}
	/**
	 * サブグループセッター.
	 *
	 * @param subGroup サブグループ
	 */
	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}

	/**
	 * タイプ.
	 */
	private String type;
	/**
	 * タイプゲッター.
	 *
	 * @return タイプ
	 */
	public String getType() {
		return type;
	}
	/**
	 * タイプセッター.
	 *
	 * @param type タイプ
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * 名称.
	 */
	private String name;
	/**
	 * 名称ゲッター.
	 *
	 * @return 名称
	 */
	public String getName() {
		return name;
	}
	/**
	 * 名称セッター.
	 *
	 * @param name 名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 設定リスト
	 */
	private List<ConfigurationsProductDivisionsDetailModel> value;
	/**
	 * 設定リストゲッター.
	 *
	 * @return 設定リスト
	 */
	public List<ConfigurationsProductDivisionsDetailModel> getValue() {
		return value;
	}
	/**
	 * 設定リストセッター.
	 *
	 * @param value サブグループ
	 */
	public void setValue(List<ConfigurationsProductDivisionsDetailModel> value) {
		this.value = value;
	}
}
// KSD V001.000 AE

