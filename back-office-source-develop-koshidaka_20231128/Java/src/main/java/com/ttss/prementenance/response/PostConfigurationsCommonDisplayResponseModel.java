// KSD V001.000 AS
package com.ttss.prementenance.response;
import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.ConfigurationCloudposDetailModel;

import lombok.Data;

/**
 * Configurations CommonDisplay取得レスポンスモデル データモデル.
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class PostConfigurationsCommonDisplayResponseModel {
	public PostConfigurationsCommonDisplayResponseModel() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	
	/**
	 * レスポンスモデル
	 */
	private ConfigurationCloudposDetailModel responseModel;
	
}
// KSD V001.000 AE
