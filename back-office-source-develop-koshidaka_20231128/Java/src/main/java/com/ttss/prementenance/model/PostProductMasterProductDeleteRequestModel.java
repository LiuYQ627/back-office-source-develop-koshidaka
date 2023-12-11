package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;

import lombok.Data;

/**
 * 商品マスタ削除リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PostProductMasterProductDeleteRequestModel {
	public PostProductMasterProductDeleteRequestModel() {}

	/**
	 * nodeId
	 */
	@NotEmpty
	private String nodeId;
	/**
	 * nodeIdゲッター
	 *
	 * @return nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * nodeIdセッター
	 *
	 * @param nodeId nodeId
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * バーコード
	 */
	@NotEmpty
	private String itemId;
	/**
	 * バーコードゲッター
	 *
	 * @return バーコード
	 */
	public String getItemId() {
		return itemId;
	}
	/**
	 * バーコードセッター
	 *
	 * @param itemId バーコード
	 */
	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	/**
	 * priceListsレコードid
	 */
	@NotEmpty
	private String pricelistRecordId;
	/**
	 * priceListsレコードidゲッター
	 *
	 * @return priceListsレコードid
	 */
	public String getPricelistRecordId() {
		return pricelistRecordId;
	}
	/**
	 * priceListsレコードidセッター
	 *
	 * @param pricelistRecordId priceListsレコードid
	 */
	public void setPricelistRecordId(String pricelistRecordId) {
		this.pricelistRecordId = pricelistRecordId;
	}
// KSD V001.000 20230925 AS
	//groupName名称
	private String linkCode;
// KSD V001.000 20230925 AE

}

