// KSD V001.000 AS
package com.ttss.prementenance.request;
import lombok.Data;

/**
 * Configurations CommonDisplayリクエストモデル データモデル.
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
public class PostConfigurationsCommonDisplayRequestModel {
	public PostConfigurationsCommonDisplayRequestModel() {}

	/**
	 * リクエストモデル
	 */
	private ConfigurationsCommonDisplayRequestModel requestModel = new ConfigurationsCommonDisplayRequestModel();

}
// KSD V001.000 ES
