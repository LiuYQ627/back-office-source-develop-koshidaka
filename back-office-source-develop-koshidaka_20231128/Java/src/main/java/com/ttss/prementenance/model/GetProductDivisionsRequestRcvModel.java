// KSD V001.000 AS
package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
* 商品分類階層設定検索 リクエストパラメータ データモデル.
*
* @author 
* @version 
*/
@Data
public class GetProductDivisionsRequestRcvModel {

	public GetProductDivisionsRequestRcvModel() {
	}

	/**
	 * 店舗コード.
	 */
	@NotEmpty
	private String nodeId;
	/**
	 * 店舗コードゲッター.
	 *
	 * @return 店舗コード
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * 店舗コードセッター.
	 *
	 * @param nodeId 店舗コード
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
}
// KSD V001.000 AE

