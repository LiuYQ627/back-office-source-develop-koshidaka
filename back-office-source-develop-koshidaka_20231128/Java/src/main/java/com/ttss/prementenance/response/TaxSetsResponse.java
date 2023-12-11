// KSD V001.000 AS
package com.ttss.prementenance.response;

import java.util.List;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.TaxSetsModel;

import lombok.Data;

/**
 * 税セットの応答.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class TaxSetsResponse {

	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	private List<TaxSetsModel> responseModel;

	public TaxSetsResponse() {}

}
// KSD V001.000 AE