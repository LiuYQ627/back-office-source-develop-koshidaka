// KSD V001.000 AS
package com.ttss.prementenance.response;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.GetDataRetentionSettingsModel;

import lombok.Data;

/**
 * データ保持設定情報レスポンスモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class GetDataRetentionSettingsResponseModel {

    private ApiCommonResponseModel result = new ApiCommonResponseModel();
    private GetDataRetentionSettingsModel responseModel;
    
}
// KSD V001.000 AE
