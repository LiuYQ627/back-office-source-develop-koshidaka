// KSD V001.000 20231027 AS
package com.ttss.prementenance.response;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * 故障理由の応答
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class FailureReasonResponse {

	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	private String responseModel;

}
// KSD V001.000 20231027 AE
