// KSD V001.000 AS
package com.ttss.prementenance.request;

import com.ttss.prementenance.model.ConfigurationsChangePlanModel;
import com.ttss.prementenance.model.DisplayNameModel;

import lombok.Data;

/**
 * 税金セットの更新モデル.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class TaxSetsUpdateRequest {

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
	private Long version;
	private String lastModifiedTimestamp;
	private String createTimestamp;
	private String roundingMode;
	private String startDateTime;
	private String taxSet;
	private Long reducedTax;
	private ConfigurationsChangePlanModel changePlan;

}
// KSD V001.000 AE
