package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;
import lombok.Data;

/**
 * Catalogs共通商品構成マスタ データモデル.
 *
 * @author
 * @version 1.0.0
 */
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CatalogsCommonProductGroupModel {
	public CatalogsCommonProductGroupModel() {
	}

	/**
	 * 実行計画
	 */
	private CatalogsCommonChangePlanModel changePlan = new CatalogsCommonChangePlanModel();
	/**
	 * 実行計画ゲッター
	 *
	 * @return 実行計画
	 */
	public CatalogsCommonChangePlanModel getChangePlan() {
		return changePlan;
	}
	/**
	 * 実行計画セッター
	 *
	 * @param changePlan 実行計画
	 */
	public void setChangePlan(CatalogsCommonChangePlanModel changePlan) {
		this.changePlan = changePlan;
	}

	/**
	 * 商品が属するカタログ名
	 */
	private String catalogName;
	/**
	 * 商品が属するカタログ名ゲッター
	 *
	 * @return 商品が属するカタログ名
	 */
	public String getCatalogName() {
		return catalogName;
	}
	/**
	 * 商品が属するカタログ名セッター
	 *
	 * @param catalogName 商品が属するカタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	/**
	 * 商品が属するグループ名
	 */
	private String name;
	/**
	 * 商品が属するグループ名ゲッター
	 *
	 * @return 商品が属するグループ名
	 */
	public String getName() {
		return name;
	}
	/**
	 * 商品が属するグループ名セッター
	 *
	 * @param name 商品が属するグループ名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * リンクグループ名
	 */
	private String parentName;
	/**
	 * リンクグループ名ゲッター
	 *
	 * @return リンクグループ名
	 */
	public String getParentName() {
		return parentName;
	}
	/**
	 * リンクグループ名セッター
	 *
	 * @param parentName リンクグループ名
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * リンクコード
	 */
	private String parentId;
	/**
	 * リンクコードゲッター
	 *
	 * @return リンクコード
	 */
	public String getParentId() {
		return parentId;
	}
	/**
	 * リンクコードセッター
	 *
	 * @param parentId リンクコード
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/**
	 * 分類No.
	 */
	private Long productClassificationNumber;
	/**
	 * 分類No.ゲッター
	 *
	 * @return 分類No.
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

	/**
	 * 商品構成コード
	 */
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
	 * 名称
	 */
	private CatalogsCommonDisplayNameModel displayName = new CatalogsCommonDisplayNameModel();
	/**
	 * 名称ゲッター
	 *
	 * @return 名称
	 */
	public CatalogsCommonDisplayNameModel getDisplayName() {
		return displayName;
	}
	/**
	 * 名称セッター
	 *
	 * @param displayName 名称
	 */
	public void setDisplayName(CatalogsCommonDisplayNameModel displayName) {
		this.displayName = displayName;
	}

	/**
	 * attributes
	 */
	private Map<String, String> attributes;
	/**
	 * attributesゲッター
	 *
	 * @return attributes
	 */
	public Map<String, String> getAttributes() {
		return attributes;
	}
	/**
	 * attributesセッター
	 *
	 * @param attributes attributes
	 */
	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}

	/**
	 * namedAttributes
	 */
	private CatalogsCommonProductGroupNamedAttributesModel namedAttributes = new CatalogsCommonProductGroupNamedAttributesModel();
	/**
	 * namedAttributesゲッター
	 *
	 * @return namedAttributes
	 */
	public CatalogsCommonProductGroupNamedAttributesModel getNamedAttributes() {
		return namedAttributes;
	}
	/**
	 * namedAttributesセッター
	 *
	 * @param namedAttributes namedAttributes
	 */
	public void setNamedAttributes(CatalogsCommonProductGroupNamedAttributesModel namedAttributes) {
		this.namedAttributes = namedAttributes;
	}


	/**
	 * version
	 */
	private Integer version;
	/**
	 * versionゲッター
	 *
	 * @return version
	 */
	public Integer getVersion() {
		return version;
	}
	/**
	 * versionセッター
	 *
	 * @param version version
	 */
	public void setVersion(Integer version) {
		this.version = version;
	}

	/**
	 * UOM
	 */
	@JsonProperty("UOM")
	private String UOM;
	/**
	 * UOMゲッター
	 *
	 * @return UOM
	 */
	@JsonProperty("UOM")
	public String getUOM() {
		return UOM;
	}
	/**
	 * UOMセッター
	 *
	 * @param UOM UOM
	 */
	@JsonProperty("UOM")
	public void setUOM(String UOM) {
		this.UOM = UOM;
	}

	/**
	 * createTimestamp
	 */
	private String createTimestamp;
	/**
	 * createTimestampゲッター
	 *
	 * @return createTimestamp
	 */
	public String getCreateTimestamp() {
		return createTimestamp;
	}
	/**
	 * createTimestampセッター
	 *
	 * @param createTimestamp createTimestamp
	 */
	public void setCreateTimestamp(String createTimestamp) {
		this.createTimestamp = createTimestamp;
	}

	/**
	 * lastModifiedTimestamp
	 */
	private String lastModifiedTimestamp;
	/**
	 * lastModifiedTimestampゲッター
	 *
	 * @return lastModifiedTimestamp
	 */
	public String getLastModifiedTimestamp() {
		return lastModifiedTimestamp;
	}
	/**
	 * lastModifiedTimestampセッター
	 *
	 * @param lastModifiedTimestamp lastModifiedTimestamp
	 */
	public void setLastModifiedTimestamp(String lastModifiedTimestamp) {
		this.lastModifiedTimestamp = lastModifiedTimestamp;
	}

	/**
	 * extends
	 */
	@JsonProperty("extends")
	private Boolean extendsValue;
	/**
	 * extendsゲッター
	 *
	 * @return extends
	 */
	@JsonProperty("extends")
	public Boolean getExtendsValue() {
		return extendsValue;
	}
	/**
	 * extendsセッター
	 *
	 * @param extendsValue extends
	 */
	@JsonProperty("extends")
	public void setExtendsValue(Boolean extendsValue) {
		this.extendsValue = extendsValue;
	}

	/**
	 * isBundle
	 */
	private Boolean isBundle;
	/**
	 * isBundleゲッター
	 *
	 * @return isBundle
	 */
	public Boolean getIsBundle() {
		return isBundle;
	}
	/**
	 * isBundleセッター
	 *
	 * @param isBundle isBundle
	 */
	public void setIsBundle(Boolean isBundle) {
		this.isBundle = isBundle;
	}

	/**
	 * isUOMTypeEach
	 */
	private Boolean isUOMTypeEach;
	/**
	 * isUOMTypeEachゲッター
	 *
	 * @return isUOMTypeEach
	 */
	public Boolean getIsUOMTypeEach() {
		return isUOMTypeEach;
	}
	/**
	 * isUOMTypeEachセッター
	 *
	 * @param isUOMTypeEach isUOMTypeEach
	 */
	public void setIsUOMTypeEach(Boolean isUOMTypeEach) {
		this.isUOMTypeEach = isUOMTypeEach;
	}

	/**
	 * lastModifiedUserId
	 */
	private String lastModifiedUserId;
	/**
	 * lastModifiedUserIdゲッター
	 *
	 * @return lastModifiedUserId
	 */
	public String getLastModifiedUserId() {
		return lastModifiedUserId;
	}
	/**
	 * lastModifiedUserIdセッター
	 *
	 * @param lastModifiedUserId lastModifiedUserId
	 */
	public void setLastModifiedUserId(String lastModifiedUserId) {
		this.lastModifiedUserId = lastModifiedUserId;
	}

	/**
	 * allowableTimeOfSale
	 */
	private CatalogsCommonAllowableTimeOfSaleModel allowableTimeOfSale;
	/**
	 * allowableTimeOfSaleゲッター
	 *
	 * @return allowableTimeOfSale
	 */
	public CatalogsCommonAllowableTimeOfSaleModel getAllowableTimeOfSale() {
		return allowableTimeOfSale;
	}
	/**
	 * allowableTimeOfSaleセッター
	 *
	 * @param allowableTimeOfSale allowableTimeOfSale
	 */
	public void setAllowableTimeOfSale(CatalogsCommonAllowableTimeOfSaleModel allowableTimeOfSale) {
		this.allowableTimeOfSale = allowableTimeOfSale;
	}

}
