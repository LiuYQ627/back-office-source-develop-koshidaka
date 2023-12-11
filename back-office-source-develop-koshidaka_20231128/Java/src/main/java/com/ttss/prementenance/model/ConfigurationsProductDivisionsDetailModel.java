// KSD V001.000 AS
package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* 商品分類階層設定詳細データモデル.
*
* @author 
* @version 
*/
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsProductDivisionsDetailModel {
  public ConfigurationsProductDivisionsDetailModel() {}

	/**
	 * 項番
	 */
	private Long order;
	/**
	 * 項番ゲッター.
	 *
	 * @return 項番
	 */
	public Long getOrder() {
		return order;
	}
	/**
	 * 項番セッター.
	 *
	 * @param order 項番
	 */
	public void setOrder(Long order) {
		this.order = order;
	}

	/**
	 * 分類No
	 */
	private Long productClassificationNumber;
	/**
	 * 分類Noゲッター.
	 *
	 * @return 分類No
	 */
	public Long getProductClassificationNumber() {
		return productClassificationNumber;
	}
	/**
	 * 分類Noセッター.
	 *
	 * @param productClassificationNumber 分類No
	 */
	public void setProductClassificationNumber(Long productClassificationNumber) {
		this.productClassificationNumber = productClassificationNumber;
	}

	/**
	 * 商品構成名.
	 */
	private String productName;
	/**
	 * 商品構成名ゲッター.
	 *
	 * @return 商品構成名
	 */
	public String getProductName() {
		return productName;
	}
	/**
	 * 商品構成名セッター.
	 *
	 * @param productName 数量
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * 商品構成コードの桁数
	 */
	private Long length;
	/**
	 * 商品構成コードの桁数ゲッター.
	 *
	 * @return 桁数
	 */
	public Long getLength() {
		return length;
	}
	/**
	 * 商品構成コードの桁数セッター.
	 *
	 * @param length 桁数
	 */
	public void setLength(Long length) {
		this.length = length;
	}

	/**
	 * 最上位構成フラグ
	 */
	private Boolean usedFlg;
	/**
	 * 最上位構成フラグゲッター.
	 *
	 * @return 最上位構成フラグ
	 */
	public Boolean getUsedFlg() {
		return usedFlg;
	}
	/**
	 * 最上位構成フラグセッター.
	 *
	 * @param usedFlg 最上位構成フラグ
	 */
	public void setUsedFlg(Boolean usedFlg) {
		this.usedFlg = usedFlg;
	}

	/**
	 * 登録種別.
	 */
	private String registrationType;
	/**
	 * 登録種別ゲッター.
	 *
	 * @return 商品構成名
	 */
	public String getRegistrationType() {
		return registrationType;
	}
	/**
	 * 登録種別セッター.
	 *
	 * @param registrationType 登録種別
	 */
	public void setRegistrationType(String registrationType) {
		this.registrationType = registrationType;
	}
}
// KSD V001.000 AE
