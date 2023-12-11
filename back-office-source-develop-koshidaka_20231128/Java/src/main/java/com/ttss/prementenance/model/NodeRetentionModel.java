// KSD V001.000 AS
package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * データ保持設定情報のノード保持モデル
 * 
 * @author E.J.Mesa(AWS)
 * @version 1.0.0
 */
@Data
public class NodeRetentionModel {
	public NodeRetentionModel() {
	}

	private long version;
	private String groupName;
	private List<NodeRetentionItemModel> nodes;
	private String lastModifiedTimestamp;
	private String createTimestamp;
	private String _id;

}
// KSD V001.000 AE
