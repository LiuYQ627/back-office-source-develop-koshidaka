// KSD V001.000 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * ノード保持モデルのノード保持アイテム モデル
 * 
 * @author E.J.Mesa(AWS)
 * @version 1.0.0
 */
@Data
public class NodeRetentionItemModel {
	public NodeRetentionItemModel(){
	}

	private String nodeId;
	private long nodeRetentionPeriod;

}
// KSD V001.000 AE
