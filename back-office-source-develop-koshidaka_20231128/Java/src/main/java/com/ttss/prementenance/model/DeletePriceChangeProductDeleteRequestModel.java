package com.ttss.prementenance.model;


import lombok.Data;

/**
 * 商品削除リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class DeletePriceChangeProductDeleteRequestModel {
	public DeletePriceChangeProductDeleteRequestModel() {}

	/**
	 * 店舗コード(21)
	 */
	private String nodeId;
	/**
	 * 店舗コード(21)ゲッター
	 *
	 * @return 店舗コード(21)
	 */
	public String getNodeId() {
		return nodeId;
	}
	/**
	 * 店舗コード(21)セッター
	 *
	 * @param nodeId 店舗コード(21)
	 */
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	/**
	 * 売価変更No(10)
	 */
	private String priceChangeNo;
	/**
	 * 売価変更No(10)ゲッター
	 *
	 * @return 売価変更No(10)
	 */
	public String getPriceChangeNo() {
		return priceChangeNo;
	}
	/**
	 * 売価変更No(10)セッター
	 *
	 * @param priceChangeNo 売価変更No(10)
	 */
	public void setPriceChangeNo(String priceChangeNo) {
		this.priceChangeNo = priceChangeNo;
	}

	/**
	 * 売価変更名称
	 */
	private String priceChangeName;
	/**
	 * 売価変更名称ゲッター
	 *
	 * @return 売価変更名称
	 */
	public String getPriceChangeName() {
		return priceChangeName;
	}
	/**
	 * 売価変更名称セッター
	 *
	 * @param priceChangeName 売価変更名称
	 */
	public void setPriceChangeName(String priceChangeName) {
		this.priceChangeName = priceChangeName;
	}

	/**
	 * 実行計画名
	 */
	private String changePlanName;
	/**
	 * 実行計画名ゲッター
	 *
	 * @return 実行計画名
	 */
	public String getChangePlanName() {
		return changePlanName;
	}
	/**
	 * 実行計画名セッター
	 *
	 * @param changePlanName 実行計画名
	 */
	public void setChangePlanName(String changePlanName) {
		this.changePlanName = changePlanName;
	}

	/**
	 * JANコード(14)
	 */
	private String skuId;
	/**
	 * JANコード(14)ゲッター
	 *
	 * @return JANコード(14)
	 */
	public String getSkuId() {
		return skuId;
	}
	/**
	 * JANコード(14)セッター
	 *
	 * @param skuId JANコード(14)
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	/**
	 * 商品情報
	 */
	private PriceChangeProductResponseModel productModel = new PriceChangeProductResponseModel();
	/**
	 * 商品情報ゲッター
	 *
	 * @return 商品情報
	 */
	public PriceChangeProductResponseModel getProductModel() {
		return productModel;
	}
	/**
	 * 商品情報セッター
	 *
	 * @param productModel 商品情報
	 */
	public void setProductModel(PriceChangeProductResponseModel productModel) {
		this.productModel = productModel;
	}

}

