package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;
import lombok.Data;

/**
 * 商品構成マスタ削除リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostProductMasterProductGroupDeleteRequestModel {
	public PostProductMasterProductGroupDeleteRequestModel() {}

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
	 * 商品構成コード
	 */
	@NotEmpty
	private String productId;
	/**
	 * 商品構成コードゲッター
	 *
	 * @return 商品構成コード
	 */
	public String getProductId() {
		return productId;
	}
	/**
	 * 商品構成コードセッター
	 *
	 * @param productId 商品構成コード
	 */
	public void setProductId(String productId) {
		this.productId = productId;
	}

	/**
	 * 分類No.
	 */
	@Range(min=1, max=8)
	private Long productClassificationNumber;
	/**
	 * 分類No.ゲッター
	 *
	 * @return productClassificationNumber
	 */
	public Long getProductClassificationNumber() {
		return productClassificationNumber;
	}
	/**
	 * 分類No.セッター
	 *
	 * @param productClassificationNumber 分類No.
	 */
	public void setProductClassificationNumber(Long productClassificationNumber) {
		this.productClassificationNumber = productClassificationNumber;
	}

}

