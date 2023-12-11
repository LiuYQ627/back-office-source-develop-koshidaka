// KSD V001.000 AS
package com.ttss.prementenance.request;

import lombok.Data;

/**
 * データ保持設定情報
 * 
 * @author E.J.Mesa(AWS)
 * @version 1.0.0
 */
@Data
public class GetDataRetentionSettingsRequestModel {
	public GetDataRetentionSettingsRequestModel () {
	}

	private String groupName;
}
// KSD V001.000 AE
