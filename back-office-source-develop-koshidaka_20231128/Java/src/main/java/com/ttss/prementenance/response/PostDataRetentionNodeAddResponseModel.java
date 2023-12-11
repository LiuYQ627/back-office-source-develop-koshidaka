// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
package com.ttss.prementenance.response;

import java.util.List;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.PostDataRetentionNodeAddModel;

import lombok.Data;

/**
 * 保持期間外データ情報へNode追加
 * 
 * @author J.araki(SW)
 * @version 1.0.0
 */
@Data
public class PostDataRetentionNodeAddResponseModel {

    private ApiCommonResponseModel result = new ApiCommonResponseModel();
    private List<PostDataRetentionNodeAddModel> responseModel;
    
}
// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
