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
@JsonIgnoreProperties(ignoreUnknown = true)
public class CatalogsCommonAllowableTimeOfSaleModel {
	public CatalogsCommonAllowableTimeOfSaleModel() {
	}

	/**
	 * 適用開始日
	 */
	private String startDate;

	/**
	 * 適用開始日ゲッター
	 *
	 * @return 適用開始日
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * 適用開始日セッター
	 *
	 * @param startDate 適用開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 適用終了日
	 */
	private String endDate;

}
