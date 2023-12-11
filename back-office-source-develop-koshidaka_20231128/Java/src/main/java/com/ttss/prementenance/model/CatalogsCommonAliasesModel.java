package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通Aliases データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonAliasesModel {
	public CatalogsCommonAliasesModel() {}

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

