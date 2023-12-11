// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
package com.ttss.prementenance.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 * 保持期間外データ情報へNode追加リクエストモデル
 * 
 * @author J.araki(SW)
 * @version 1.0.0
 */
@Data
public class PostDataRetentionNodeAddRequestModel {
	public PostDataRetentionNodeAddRequestModel() {}

	// 追加対象NodeId
	@NotNull
	private String nodeId;

	// 保有日数
	@NotNull
	private Integer nodeRetentionPeriod;

}
// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
