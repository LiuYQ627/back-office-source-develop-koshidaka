package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * カタロググループリクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsGroupRequestModel {
	public CatalogsGroupRequestModel() {}

	/**
	 * カタログ名
	 */
	private String catalogName;
	/**
	 * カタログ名ゲッター
	 *
	 * @return カタログ名
	 */
	public String getCatalogName() {
		return catalogName;
	}
	/**
	 * カタログ名セッター
	 *
	 * @param catalogName カタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

}

