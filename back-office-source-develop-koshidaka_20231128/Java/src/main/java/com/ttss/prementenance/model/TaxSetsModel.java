// KSD V001.000 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * 税セットモデル.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 *
 */
@Data
public class TaxSetsModel {

	private String nodeId;
	private String type;
	private DisplayNameModel displayName;
	private String taxType;
	private String jurisdictionName;
	private String taxSource;
	private String jurisdictionType;
	private double rate;
	private String originalTaxSource;
	private String rateType;
	private String indicator;
	private String name;
	private String taxMark;
	private double version;
	private String lastModifiedTimestamp;
	private String createTimestamp;
	private String roundingMode;
	private String startDateTime;
	private String taxSet;
	private Long reducedTax;
	// KSD V001.000 AS 税率設定の取得がエラーになる（暫定対応）
	private String lastModifiedUserId;
	// KSD V001.000 AE 税率設定の取得がエラーになる（暫定対応）
	
}
// KSD V001.000 AE
