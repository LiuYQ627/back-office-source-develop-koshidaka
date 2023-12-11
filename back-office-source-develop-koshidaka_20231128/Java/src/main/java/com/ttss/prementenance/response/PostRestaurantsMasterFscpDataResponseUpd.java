// KSD V001.000 20230905 AS
package com.ttss.prementenance.response;

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
public class PostRestaurantsMasterFscpDataResponseUpd {
    
    private ApiCommonResponseModel result = new ApiCommonResponseModel();
    
    private Map<String, Object> responseModel;

}
// KSD V001.000 20230905 AE
