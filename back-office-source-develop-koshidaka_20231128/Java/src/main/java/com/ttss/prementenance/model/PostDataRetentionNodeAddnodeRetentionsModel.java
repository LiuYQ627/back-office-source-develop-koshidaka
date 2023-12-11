// KSD V001.000 AS issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
package com.ttss.prementenance.model;
import java.util.List;

import lombok.Data;

/**
 * 保持期間外データ情報へNode追加（nodeRetentions）
 * 
 * @author J.araki(SW)
 * @version 1.0.0
 */
@Data
public class PostDataRetentionNodeAddnodeRetentionsModel {

	private long version;
	private String id;
	private String groupName;
	private List<DataRetentionSettingsNodeModel> nodes;
	private String LastModifiedUserId;
	private String LastModifiedTimestamp;
	private String CreateTimestamp;

}
// KSD V001.000 AE issue#1349:企業を追加する時に、tgcp_data_management_data_retention_settingsにNode設定を追加する対応
