package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;
import lombok.Data;

/**
 * Catalogs共通 データモデル.
 *
 * @author
 * @version 1.0.0
 */
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230103  bai.ry(Neusoft)  G001.00.0  issue課題#1343を対応します.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CatalogsCommonModel {
	public CatalogsCommonModel() {
	}

	/**
	 * name
	 */
	private String name;

	/**
	 * nameゲッター
	 *
	 * @return name
	 */
	public String getName() {
		return name;
	}

	/**
	 * nameセッター
	 *
	 * @param name name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * parentName
	 */
	private String parentName;

	/**
	 * parentNameゲッター
	 *
	 * @return parentName
	 */
	public String getParentName() {
		return parentName;
	}

	/**
	 * parentNameセッター
	 *
	 * @param parentName parentName
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * namedAttributes
	 */
	private CatalogsCommonNamedAttributesModel namedAttributes = new CatalogsCommonNamedAttributesModel();

	/**
	 * namedAttributesゲッター
	 *
	 * @return namedAttributes
	 */
	public CatalogsCommonNamedAttributesModel getNamedAttributes() {
		return namedAttributes;
	}

	/**
	 * namedAttributesセッター
	 *
	 * @param namedAttributes namedAttributes
	 */
	public void setNamedAttributes(CatalogsCommonNamedAttributesModel namedAttributes) {
		this.namedAttributes = namedAttributes;
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
	 * カタログ名
	 */
	private String catalogName;

	/**
	 * カタログ名ゲッター
	 *
	 * @return カタログ名
	 */
	public String getCatalogName() {
		return catalogName;
	}

	/**
	 * カタログ名セッター
	 *
	 * @param catalogName カタログ名
	 */
	public void setCatalogName(String catalogName) {
		this.catalogName = catalogName;
	}

	/**
	 * カタロググループ名
	 */
	private String groupName;

	/**
	 * カタロググループ名ゲッター
	 *
	 * @return カタロググループ名
	 */
	public String getGroupName() {
		return groupName;
	}

	/**
	 * カタロググループ名セッター
	 *
	 * @param groupName カタロググループ名
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/**
	 * catalogGroupHierarchy
	 */
	private List<CatalogsCommonCatalogGroupHierarchyModel> catalogGroupHierarchy;

	/**
	 * catalogGroupHierarchyゲッター
	 *
	 * @return catalogGroupHierarchy
	 */
	public List<CatalogsCommonCatalogGroupHierarchyModel> getCatalogGroupHierarchy() {
		return catalogGroupHierarchy;
	}

	/**
	 * catalogGroupHierarchyセッター
	 *
	 * @param catalogGroupHierarchy catalogGroupHierarchy
	 */
	public void setCatalogGroupHierarchy(
			List<CatalogsCommonCatalogGroupHierarchyModel> catalogGroupHierarchy) {
		this.catalogGroupHierarchy = catalogGroupHierarchy;
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
	 * 税区分
	 */
	private List<String> productTaxCodes;

	/**
	 * 税区分ゲッター
	 *
	 * @return 税区分
	 */
	public List<String> getProductTaxCodes() {
		return productTaxCodes;
	}

	/**
	 * 税区分セッター
	 *
	 * @param productTaxCodes 税区分
	 */
	public void setProductTaxCodes(List<String> productTaxCodes) {
		this.productTaxCodes = productTaxCodes;
	}

	private String taxCodes;

	public String getTaxCodes() {
		if (productTaxCodes != null) {
			return productTaxCodes.get(0);
		}
		return "";
	}

	/**
	 * 年齢確認商品(対象:20)
	 */
	private Integer ageToBuy;

	/**
	 * 年齢確認商品(対象:20)ゲッター
	 *
	 * @return 年齢確認商品(対象:20)
	 */
	public Integer getAgeToBuy() {
		return ageToBuy;
	}

	/**
	 * 年齢確認商品(対象:20)セッター
	 *
	 * @param ageToBuy 年齢確認商品(対象:20)
	 */
	public void setAgeToBuy(Integer ageToBuy) {
		this.ageToBuy = ageToBuy;
	}

	/**
	 * バーコード
	 */
	private String productId;

	/**
	 * バーコードゲッター
	 *
	 * @return バーコード
	 */
	public String getProductId() {
		return productId;
	}

	/**
	 * バーコードセッター
	 *
	 * @param productId バーコード
	 */
	public void setProductId(String productId) {
		this.productId = productId;
	}

	/**
	 * inventoryMinimumThreshold
	 */
	private Long inventoryMinimumThreshold;

	/**
	 * inventoryMinimumThresholdゲッター
	 *
	 * @return inventoryMinimumThreshold
	 */
	public Long getInventoryMinimumThreshold() {
		return inventoryMinimumThreshold;
	}

	/**
	 * inventoryMinimumThresholdセッター
	 *
	 * @param inventoryMinimumThreshold inventoryMinimumThreshold
	 */
	public void setInventoryMinimumThreshold(Long inventoryMinimumThreshold) {
		this.inventoryMinimumThreshold = inventoryMinimumThreshold;
	}

	/**
	 * paymentRestrictions
	 */
	private CatalogsCommonPaymentRestrictionsModel paymentRestrictions = new CatalogsCommonPaymentRestrictionsModel();

	/**
	 * paymentRestrictionsゲッター
	 *
	 * @return paymentRestrictions
	 */
	public CatalogsCommonPaymentRestrictionsModel getPaymentRestrictions() {
		return paymentRestrictions;
	}

	/**
	 * paymentRestrictionsセッター
	 *
	 * @param paymentRestrictions paymentRestrictions
	 */
	public void setPaymentRestrictions(CatalogsCommonPaymentRestrictionsModel paymentRestrictions) {
		this.paymentRestrictions = paymentRestrictions;
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
	 * categories
	 */
	private List<String> categories;

	/**
	 * categoriesゲッター
	 *
	 * @return categories
	 */
	public List<String> getCategories() {
		return categories;
	}

	/**
	 * categoriesセッター
	 *
	 * @param categories categories
	 */
	public void setCategories(List<String> categories) {
		this.categories = categories;
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
	 * aliases
	 */
	private List<CatalogsCommonAliasesModel> aliases;

	/**
	 * aliasesゲッター
	 *
	 * @return aliases
	 */
	public List<CatalogsCommonAliasesModel> getAliases() {
		return aliases;
	}

	/**
	 * aliasesセッター
	 *
	 * @param aliases aliases
	 */
	public void setAliases(List<CatalogsCommonAliasesModel> aliases) {
		this.aliases = aliases;
	}

	/**
	 * description
	 */
	private CommonDefaultModel description = new CommonDefaultModel();

	/**
	 * descriptionゲッター
	 *
	 * @return description
	 */
	public CommonDefaultModel getDescription() {
		return description;
	}

	/**
	 * descriptionセッター
	 *
	 * @param description description
	 */
	public void setDescription(CommonDefaultModel description) {
		this.description = description;
	}

	/**
	 * 表示名
	 */
	private CatalogsCommonDisplayNameModel displayName = new CatalogsCommonDisplayNameModel();

	/**
	 * 表示名ゲッター
	 *
	 * @return 表示名
	 */
	public CatalogsCommonDisplayNameModel getDisplayName() {
		return displayName;
	}

	/**
	 * 表示名セッター
	 *
	 * @param displayName 表示名
	 */
	public void setDisplayName(CatalogsCommonDisplayNameModel displayName) {
		this.displayName = displayName;
	}

	/**
	 * 商品識別子
	 */
	private String skuId;

	/**
	 * 商品識別子ゲッター
	 *
	 * @return 商品識別子
	 */
	public String getSkuId() {
		return skuId;
	}

	/**
	 * 商品識別子セッター
	 *
	 * @param skuId 商品識別子
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	/**
	 * isDepositItem
	 */
	private Boolean isDepositItem;

	/**
	 * isDepositItemゲッター
	 *
	 * @return isDepositItem
	 */
	public Boolean getIsDepositItem() {
		return isDepositItem;
	}

	/**
	 * isDepositItemセッター
	 *
	 * @param isDepositItem isDepositItem
	 */
	public void setIsDepositItem(Boolean isDepositItem) {
		this.isDepositItem = isDepositItem;
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
	 * 売変区分
	 */
	private Boolean discountable;

	/**
	 * 売変区分ゲッター
	 *
	 * @return 売変区分
	 */
	public Boolean getDiscountable() {
		return discountable;
	}

	/**
	 * 売変区分セッター
	 *
	 * @param discountable 売変区分
	 */
	public void setDiscountable(Boolean discountable) {
		this.discountable = discountable;
	}

	/**
	 * notForSale
	 */
	private Boolean notForSale;

	/**
	 * notForSaleゲッター
	 *
	 * @return notForSale
	 */
	public Boolean getNotForSale() {
		return notForSale;
	}

	/**
	 * notForSaleセッター
	 *
	 * @param notForSale notForSale
	 */
	public void setNotForSale(Boolean notForSale) {
		this.notForSale = notForSale;
	}

	/**
	 * priceRequired
	 */
	private Boolean priceRequired;

	/**
	 * priceRequiredゲッター
	 *
	 * @return priceRequired
	 */
	public Boolean getPriceRequired() {
		return priceRequired;
	}

	/**
	 * priceRequiredセッター
	 *
	 * @param priceRequired priceRequired
	 */
	public void setPriceRequired(Boolean priceRequired) {
		this.priceRequired = priceRequired;
	}

	/**
	 * serialRequired
	 */
	private Boolean serialRequired;

	/**
	 * serialRequiredゲッター
	 *
	 * @return serialRequired
	 */
	public Boolean getSerialRequired() {
		return serialRequired;
	}

	/**
	 * serialRequiredセッター
	 *
	 * @param serialRequired serialRequired
	 */
	public void setSerialRequired(Boolean serialRequired) {
		this.serialRequired = serialRequired;
	}

	/**
	 * quantityRequired
	 */
	private Boolean quantityRequired;

	/**
	 * quantityRequiredゲッター
	 *
	 * @return quantityRequired
	 */
	public Boolean getQuantityRequired() {
		return quantityRequired;
	}

	/**
	 * quantityRequiredセッター
	 *
	 * @param quantityRequired quantityRequired
	 */
	public void setQuantityRequired(Boolean quantityRequired) {
		this.quantityRequired = quantityRequired;
	}

	/**
	 * 免税区分
	 */
	private Boolean taxExempt;

	/**
	 * 免税区分ゲッター
	 *
	 * @return 免税区分
	 */
	public Boolean getTaxExempt() {
		return taxExempt;
	}

	/**
	 * 免税区分セッター
	 *
	 * @param taxExempt 免税区分
	 */
	public void setTaxExempt(Boolean taxExempt) {
		this.taxExempt = taxExempt;
	}

	// G001.00.0 Update-Start
	/**
	 * priceChangeOperation
	 */
//	private Boolean priceOverrideAllowed;
	private Boolean priceChangeOperation;
	/**
	 * priceChangeOperation ゲッター
	 *
	 * @return priceChangeOperation
	 */
	public Boolean getPriceChangeOperation() {
		return priceChangeOperation;
	}

	/**
	 * priceChangeOperation セッター
	 *
	 * @param priceChangeOperation priceChangeOperation
	 */
	public void setPriceChangeOperation(Boolean priceChangeOperation) {
		this.priceChangeOperation = priceChangeOperation;
	}
    // G001.00.0 Update-End
	/**
	 * itemInventoryMethod
	 */
	private String itemInventoryMethod;

	/**
	 * itemInventoryMethodゲッター
	 *
	 * @return itemInventoryMethod
	 */
	public String getItemInventoryMethod() {
		return itemInventoryMethod;
	}

	/**
	 * itemInventoryMethodセッター
	 *
	 * @param itemInventoryMethod itemInventoryMethod
	 */
	public void setItemInventoryMethod(String itemInventoryMethod) {
		this.itemInventoryMethod = itemInventoryMethod;
	}

	/**
	 * isDepartmentItem
	 */
	private Boolean isDepartmentItem;

	/**
	 * isDepartmentItemゲッター
	 *
	 * @return isDepartmentItem
	 */
	public Boolean getIsDepartmentItem() {
		return isDepartmentItem;
	}

	/**
	 * isDepartmentItemセッター
	 *
	 * @param isDepartmentItem isDepartmentItem
	 */
	public void setIsDepartmentItem(Boolean isDepartmentItem) {
		this.isDepartmentItem = isDepartmentItem;
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
	 * レシート印字区分
	 */
	private boolean receiptPrint;

	/**
	 * 商品区分
	 */
	private Integer productClassification;

	/**
	 * 小計値引割引対象
	 */
	private boolean subTotalDiscountable;

	/**
	 * 免税区分
	 */
	private Integer dutyFreeClassification;

	private CatalogsCommonAllowableTimeOfSaleModel allowableTimeOfSale;

}
