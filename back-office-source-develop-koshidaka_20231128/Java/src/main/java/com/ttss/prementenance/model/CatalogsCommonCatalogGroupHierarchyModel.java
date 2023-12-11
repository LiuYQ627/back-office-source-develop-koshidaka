package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通CatalogGroupHierarchy データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonCatalogGroupHierarchyModel {
	public CatalogsCommonCatalogGroupHierarchyModel() {}

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
	 * displayName
	 */
	private CatalogsCommonDisplayNameModel displayName = new CatalogsCommonDisplayNameModel();
	/**
	 * displayNameゲッター
	 *
	 * @return displayName
	 */
	public CatalogsCommonDisplayNameModel getDisplayName() {
		return displayName;
	}
	/**
	 * displayNameセッター
	 *
	 * @param displayName displayName
	 */
	public void setDisplayName(CatalogsCommonDisplayNameModel displayName) {
		this.displayName = displayName;
	}

}

