// KSD V001.000 AS
package com.ttss.prementenance.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ttss.prementenance.model.ApiCommonResponseModel;

import lombok.Data;

/**
 * レストランFSCPマスタデータのレスポンスモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 * 
 */
@Data
public class PostRestaurantsMasterFscpDataResponse {
    
    private ApiCommonResponseModel result = new ApiCommonResponseModel();
    
    private List<Map<String, Object>> responseModel = new ArrayList<Map<String, Object>>();

}
// KSD V001.000 AE
