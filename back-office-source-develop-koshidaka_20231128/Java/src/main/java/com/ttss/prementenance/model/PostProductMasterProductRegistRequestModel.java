package com.ttss.prementenance.model;

import java.util.List;

import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Range;

import com.ttss.prementenance.utils.validation.ByteSize;

import lombok.Data;

/**
 * 商品マスタ更新リクエスト データモデル.
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
public class PostProductMasterProductRegistRequestModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface PostProductMasterProductRegistRequestKanjiOrder1 {
	}

	public interface PostProductMasterProductRegistRequestKanjiOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ PostProductMasterProductRegistRequestKanjiOrder1.class,
			PostProductMasterProductRegistRequestKanjiOrder2.class })
	public interface GroupKanjiOrder {
	}

	public PostProductMasterProductRegistRequestModel() {
	}

	/**
	 * mode
	 */
	private Integer mode;

	/**
	 * modeゲッター
	 *
	 * @return mode
	 */
	public Integer getMode() {
		return mode;
	}

	/**
	 * modeセッター
	 *
	 * @param mode mode
	 */
	public void setMode(Integer mode) {
		this.mode = mode;
	}

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
	 * 漢字名称
	 */
	@NotEmpty(groups = { PostProductMasterProductRegistRequestKanjiOrder1.class })
	@ByteSize(min = 1, max = 40, fullWidthMin = 1, fullWidthMax = 20, encoding = "Shift-JIS", groups = {
			PostProductMasterProductRegistRequestKanjiOrder2.class })
	private String kanji;

	/**
	 * 漢字名称ゲッター
	 *
	 * @return 漢字名称
	 */
	public String getKanji() {
		return kanji;
	}

	/**
	 * 漢字名称セッター
	 *
	 * @param kanji 漢字名称
	 */
	public void setKanji(String kanji) {
		this.kanji = kanji;
	}

	/**
	 * 売単価
	 */
	@Range(min = 0, max = 99999999)
	private Integer price;

	/**
	 * 売単価ゲッター
	 *
	 * @return 売単価
	 */
	public Integer getPrice() {
		return price;
	}

	/**
	 * 売単価セッター
	 *
	 * @param price 売単価
	 */
	public void setPrice(Integer price) {
		this.price = price;
	}

	/**
	 * 商品区分
	 */
	private String productToNotRecordSales;

	/**
	 * 商品区分ゲッター
	 *
	 * @return 商品区分
	 */
	public String getProductToNotRecordSales() {
		return productToNotRecordSales;
	}

	/**
	 * 商品区分セッター
	 *
	 * @param productToNotRecordSales 商品区分
	 */
	public void setProductToNotRecordSales(String productToNotRecordSales) {
		this.productToNotRecordSales = productToNotRecordSales;
	}

	/**
	 * 年齢確認商品
	 */
	private Integer ageToBuy;

	/**
	 * 年齢確認商品ゲッター
	 *
	 * @return 年齢確認商品
	 */
	public Integer getAgeToBuy() {
		return ageToBuy;
	}

	/**
	 * 年齢確認商品セッター
	 *
	 * @param ageToBuy 年齢確認商品
	 */
	public void setAgeToBuy(Integer ageToBuy) {
		this.ageToBuy = ageToBuy;
	}

	/**
	 * 割引区分
	 */
	private String nonDivision;

	/**
	 * 割引区分ゲッター
	 *
	 * @return 割引区分
	 */
	public String getNonDivision() {
		return nonDivision;
	}

	/**
	 * 割引区分セッター
	 *
	 * @param nonDivision 割引区分
	 */
	public void setNonDivision(String nonDivision) {
		this.nonDivision = nonDivision;
	}

	/**
	 * 値引区分
	 */
	private Boolean discountable;

	/**
	 * 値引区分ゲッター
	 *
	 * @return 値引区分
	 */
	public Boolean getDiscountable() {
		return discountable;
	}

	/**
	 * 値引区分セッター
	 *
	 * @param discountable 値引区分
	 */
	public void setDiscountable(Boolean discountable) {
		this.discountable = discountable;
	}
    // G001.00.0 Update-Start
	/**
	 * 売変区分
	 */
//	private Boolean priceOverrideAllowed;
	private Boolean priceChangeOperation;

	/**
	 * 売変区分ゲッター
	 *
	 * @return 売変区分
	 */
	public Boolean getPriceChangeOperation() {
		return priceChangeOperation;
	}

	/**
	 * 売変区分セッター
	 *
	 * @param priceChangeOperation 売変区分
	 */
	public void setPriceChangeOperation(Boolean priceChangeOperation) {
		this.priceChangeOperation = priceChangeOperation;
	}
    // G001.00.0 Update -End
	/**
	 * 販売開始日
	 */
	private String startDate;

	/**
	 * 販売開始日ゲッター
	 *
	 * @return 販売開始日
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * 販売開始日セッター
	 *
	 * @param startDate 販売開始日
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * 販売終了日
	 */
	private String endDate;

	/**
	 * 販売終了日ゲッター
	 *
	 * @return 販売終了日
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * 販売終了日セッター
	 *
	 * @param endDate 販売終了日
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * priceListsレコードid
	 */
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

	private String taxCode;

	//private String[] productTaxCodes;
	private List<String> productTaxCodes;

	public String getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	//public String[] getProductTaxCodes() {
	public List<String> getProductTaxCodes() {
		return productTaxCodes;
	}

	//public void setProductTaxCodes(String[] productTaxCodes) {
	public void setProductTaxCodes(List<String> productTaxCodes) {
		this.productTaxCodes = productTaxCodes;
	}

	/**
	 * カナ名称
	 */
	private String kana;

	/**
	 * レシート印字名称
	 */
	@ByteSize(fullWidthMin = 1, fullWidthMax = 20, encoding = "Shift-JIS", groups = {
			PostProductMasterProductRegistRequestKanjiOrder2.class })
	private String receipt;

	private Integer receiptPrintType;
	private Integer productType;
	private Integer pricedownType;
	private Integer priceChangeType;
	private Integer discountParType;
	private Integer priceRequiredType;
	private Integer dutyFreeType;
	private Integer sellStopType;

	@Range(min = 0, max = 99999999)
	private Integer sellPrice;
	private Integer cost;
	private Integer manufacturerPrice;
	// CS #1577
	//private String paymentType;
	private String[] paymentType;
	// CE #1577
	private String priceId;

// KSD V001.000 20230925 AS
	//groupName名称
	private String linkCode;
// KSD V001.000 20230925 AE
	
}
























