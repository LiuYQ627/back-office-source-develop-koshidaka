package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * BUSINESS_DAY_TIME データモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsBusinessDayTimeModel {
	public ConfigurationsBusinessDayTimeModel() {}

	/**
	 * group
	 */
	private String group;
	/**
	 * groupゲッター
	 *
	 * @return group
	 */
	public String getGroup() {
		return group;
	}
	/**
	 * groupセッター
	 *
	 * @param group group
	 */
	public void setGroup(String group) {
		this.group = group;
	}

	/**
	 * version
	 */
	private Integer version;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Integer getVersion() {
		return version;
	}
	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Integer version) {
		this.version = version;
	}

	/**
	 * type
	 */
	private String type;
	/**
	 * typeゲッター
	 *
	 * @return type
	 */
	public String getType() {
		return type;
	}
	/**
	 * typeセッター
	 *
	 * @param type type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * inherited
	 */
	private Boolean inherited;
	/**
	 * inheritedゲッター
	 *
	 * @return inherited
	 */
	public Boolean getInherited() {
		return inherited;
	}
	/**
	 * inheritedセッター
	 *
	 * @param inherited inherited
	 */
	public void setInherited(Boolean inherited) {
		this.inherited = inherited;
	}

	/**
	 * description
	 */
	private CommonDefaultModel description = new CommonDefaultModel();
	/**
	 * descriptionゲッター
	 *
	 * @return description
	 */
	public CommonDefaultModel getDescription() {
		return description;
	}
	/**
	 * descriptionセッター
	 *
	 * @param description description
	 */
	public void setDescription(CommonDefaultModel description) {
		this.description = description;
	}

	/**
	 * subGroup
	 */
	private String subGroup;
	/**
	 * subGroupゲッター
	 *
	 * @return subGroup
	 */
	public String getSubGroup() {
		return subGroup;
	}
	/**
	 * subGroupセッター
	 *
	 * @param subGroup subGroup
	 */
	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}

	/**
	 * name
	 */
	private String name;
	/**
	 * nameゲッター
	 *
	 * @return name
	 */
	public String getName() {
		return name;
	}
	/**
	 * nameセッター
	 *
	 * @param name name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * value
	 */
	private String value;
	/**
	 * valueゲッター
	 *
	 * @return value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * valueセッター
	 *
	 * @param value value
	 */
	public void setValue(String value) {
		this.value = value;
	}

}

