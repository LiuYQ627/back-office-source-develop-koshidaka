package com.ttss.prementenance.model;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

/**
 * 売価変更リクエスト データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class PutPriceChangeProductPriceChangeRequestModel {
	public PutPriceChangeProductPriceChangeRequestModel() {}

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
	 * 売価
	 */
	@Range(min = 0, max = 99999999)
	private Integer price;
	/**
	 * 売価ゲッター
	 *
	 * @return 売価
	 */
	public Integer getPrice() {
		return price;
	}
	/**
	 * 売価セッター
	 *
	 * @param price 売価
	 */
	public void setPrice(Integer price) {
		this.price = price;
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

	/**
	 * 売価変更開始日
	 */
	private String startDate;
	/**
	 * 売価変更開始日ゲッター
	 *
	 * @return 売価変更開始日
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * 売価変更開始日セッター
	 *
	 * @param startDate 売価変更開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 売価変更終了日
	 */
	private String endDate;
	/**
	 * 売価変更終了日ゲッター
	 *
	 * @return 売価変更終了日
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * 売価変更終了日セッター
	 *
	 * @param endDate 売価変更終了日
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
}

