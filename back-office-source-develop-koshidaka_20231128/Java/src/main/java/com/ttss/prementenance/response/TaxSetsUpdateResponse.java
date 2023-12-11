// KSD V001.000 AS
package com.ttss.prementenance.response;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * 税金セットの更新応答.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class TaxSetsUpdateResponse {

	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	private String responseModel;

}
// KSD V001.000 AE
