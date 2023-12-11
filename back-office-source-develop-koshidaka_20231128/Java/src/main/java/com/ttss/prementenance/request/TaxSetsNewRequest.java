// KSD V001.000 AS
package com.ttss.prementenance.request;

import com.ttss.prementenance.model.ConfigurationsChangePlanModel;

import lombok.Data;

/**
 * 税金セットの更新モデル.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class TaxSetsNewRequest {

	private String name;
	private ConfigurationsChangePlanModel changePlan;

}
// KSD V001.000 AE
