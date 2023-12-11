// KSD V001.000 AS
package com.ttss.prementenance.response;

import java.util.HashMap;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * レストランマスタデータのレスポンスモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 * 
 */
@Data
public class PostRestaurantsSetToolDbSelectResponse {
    
    private ApiCommonResponseModel result = new ApiCommonResponseModel();
    private Map<String, Object> responseModel = new HashMap<String, Object>();

}
// KSD V001.000 AE
