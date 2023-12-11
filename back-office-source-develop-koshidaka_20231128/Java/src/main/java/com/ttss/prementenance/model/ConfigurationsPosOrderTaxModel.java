package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * OFFLINE_TAX_RATES データモデル データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsPosOrderTaxModel {
	public ConfigurationsPosOrderTaxModel() {}

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

	// 20221128 ADD S TEC.Gotou #std1150#note_347949, #std983#note_347949
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
	 * @return type
	 */
	public void setType(String type) {
		this.type = type;
	}

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
	 * @return group
	 */
	public void setGroup(String group) {
		this.group = group;
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
	 * @return subGroup
	 */
	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}
	// 20221128 ADD E TEC.Gotou #std1150#note_347949, #std983#note_347949

	/**
	 * value
	 */
	private ConfigurationsPosOrderColumnModel value = new ConfigurationsPosOrderColumnModel();
	/**
	 * valueゲッター
	 *
	 * @return value
	 */
	public ConfigurationsPosOrderColumnModel getValue() {
		return value;
	}
	/**
	 * valueセッター
	 *
	 * @param value value
	 */
	public void setValue(ConfigurationsPosOrderColumnModel value) {
		this.value = value;
	}

}

