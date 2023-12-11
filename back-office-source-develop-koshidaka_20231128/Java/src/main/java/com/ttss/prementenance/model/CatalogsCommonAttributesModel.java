package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通Attributes データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonAttributesModel {
	public CatalogsCommonAttributesModel() {}

	/**
	 * companyPrefix
	 */
	private String companyPrefix;
	/**
	 * companyPrefixゲッター
	 *
	 * @return companyPrefix
	 */
	public String getCompanyPrefix() {
		return companyPrefix;
	}
	/**
	 * companyPrefixセッター
	 *
	 * @param companyPrefix companyPrefix
	 */
	public void setCompanyPrefix(String companyPrefix) {
		this.companyPrefix = companyPrefix;
	}

	/**
	 * RETURN_LIMIT_DAYS
	 */
	private Integer RETURN_LIMIT_DAYS;
	/**
	 * RETURN_LIMIT_DAYSゲッター
	 *
	 * @return RETURN_LIMIT_DAYS
	 */
	public Integer getRETURN_LIMIT_DAYS() {
		return RETURN_LIMIT_DAYS;
	}
	/**
	 * RETURN_LIMIT_DAYSセッター
	 *
	 * @param RETURN_LIMIT_DAYS RETURN_LIMIT_DAYS
	 */
	public void setRETURN_LIMIT_DAYS(Integer RETURN_LIMIT_DAYS) {
		this.RETURN_LIMIT_DAYS = RETURN_LIMIT_DAYS;
	}

	/**
	 * familyCode
	 */
	private String familyCode;
	/**
	 * familyCodeゲッター
	 *
	 * @return familyCode
	 */
	public String getFamilyCode() {
		return familyCode;
	}
	/**
	 * familyCodeセッター
	 *
	 * @param familyCode familyCode
	 */
	public void setFamilyCode(String familyCode) {
		this.familyCode = familyCode;
	}

}

