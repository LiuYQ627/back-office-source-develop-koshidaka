// KSD V001.000 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * データ保持設定情報を更新する
 * 
 * @author E.J.Mesa(AWS)
 * @version 1.0.0
 */
@Data
public class UpdateDataRetentionSettingsModel {
	public UpdateDataRetentionSettingsModel(){
	}

	private String nodeId;
	private long nodeRetentionPeriod;
	private String groupName;

}
// KSD V001.000 AE
