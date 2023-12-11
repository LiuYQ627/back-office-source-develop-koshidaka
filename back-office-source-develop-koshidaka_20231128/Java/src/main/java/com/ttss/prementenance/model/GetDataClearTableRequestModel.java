package com.ttss.prementenance.model;

import lombok.Data;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20231121  wupsh(Neusoft)    G001.00.0  issue課題#1877を対応します.
 */
@Data
public class GetDataClearTableRequestModel {
	/** 店舗コード */
	private String storeCd;
	// G001.00.0 Add-Start
	/** テーブル種別 */
	private Integer tableCategory;
	// G001.00.0 Add-End
}
