// KSD V001.000 AS 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
package com.ttss.prementenance.model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * TAX_SETS データモデル データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationsTaxSetsModel {
    public ConfigurationsTaxSetsModel() {}

	// version -----------------------------------------//
	/**
	 * version
	 */
	private String version;
	/**
	 * versionゲッター.
	 *
	 * @return version
	 */
	public String getVersion() {
		return version;
	}
	/**
	 * versionセッター.
	 *
	 * @param version
	 */
	public void setVersion(String version) {
		this.version = version;
	}
	// version -----------------------------------------//


	// type --------------------------------------------//
	/**
	 * type
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
	// type --------------------------------------------//


	// inherited ---------------------------------------//
	/**
	 * inherited
	 */
	private String inherited;
	/**
	 * inheritedゲッター.
	 *
	 * @return inherited
	 */
	public String getInherited() {
		return inherited;
	}
	/**
	 * inheritedセッター.
	 *
	 * @param inherited
	 */
	public void setInherited(String inherited) {
		this.inherited = inherited;
	}
	// inherited ---------------------------------------//


	// group -------------------------------------------//
	/**
	 * group
	 */
	private String group;
	/**
	 * groupゲッター.
	 *
	 * @return group
	 */
	public String getGroup() {
		return group;
	}
	/**
	 * group.
	 *
	 * @param group
	 */
	public void setGroup(String group) {
		this.group = group;
	}
	// group -------------------------------------------//


	// subGroup-----------------------------------------//
	/**
	 * subGroup
	 */
	private String subGroup;
	/**
	 * subGroupゲッター.
	 *
	 * @return subGroup
	 */
	public String getSubGroup() {
		return subGroup;
	}
	/**
	 * subGroup.
	 *
	 * @param subGroup
	 */
	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}
	// subGroup-----------------------------------------//


	// name --------------------------------------------//
	/**
	 * name
	 */
	private String name;
	/**
	 * nameゲッター.
	 *
	 * @return name
	 */
	public String getName() {
		return name;
	}
	/**
	 * name.
	 *
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}
	// name --------------------------------------------//


	// value -------------------------------------------//
	/**
	 * value
	 */
	private List<ConfigurationsTaxSetsDetailModel> value;
	/**
	 * valueゲッター.
	 *
	 * @return value
	 */
	public List<ConfigurationsTaxSetsDetailModel> getValue() {
		return value;
	}
	/**
	 * value.
	 *
	 * @param value
	 */
	public void setValue(List<ConfigurationsTaxSetsDetailModel> value) {
		this.value = value;
	}
	// value -------------------------------------------//

}
// KSD V001.000 AE 2023.09.19 issue#1253 企業追加時にconfiguration下にTAX_SETSが作成されていない不具合
