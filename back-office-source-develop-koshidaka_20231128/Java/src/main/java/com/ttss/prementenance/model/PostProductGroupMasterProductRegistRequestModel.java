package com.ttss.prementenance.model;

import com.ttss.prementenance.utils.validation.ByteSize;
import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;
import lombok.Data;
import java.util.List;

/**
 * 商品構成マスタ更新リクエスト データモデル.
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
public class PostProductGroupMasterProductRegistRequestModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface PostProductGroupMasterProductRegistRequestKanjiOrder1 {
	}

	public interface PostProductGroupMasterProductRegistRequestKanjiOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ PostProductGroupMasterProductRegistRequestKanjiOrder1.class,
			PostProductGroupMasterProductRegistRequestKanjiOrder2.class })
	public interface GroupKanjiOrder {
	}

	public PostProductGroupMasterProductRegistRequestModel() {
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
	 * リンクするグループ名
	 */
	private String parentName;
	/**
	 * リンクするグループ名ゲッター
	 *
	 * @return リンクするグループ名
	 */
	public String getParentName() {
		return parentName;
	}
	/**
	 * リンクするグループ名セッター
	 *
	 * @param parentName リンクするグループ名
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * リンクするコード
	 */
	private String parentId;
	/**
	 * リンクするコードゲッター
	 *
	 * @return リンクするコード
	 */
	public String getParentId() {
		return parentId;
	}
	/**
	 * リンクするコードセッター
	 *
	 * @param parentId リンクするコード
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/**
	 * 分類No.
	 */
	@Range(min=1, max=8)
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
	 * 漢字名称
	 */
	@NotEmpty(groups = { PostProductGroupMasterProductRegistRequestKanjiOrder1.class })
	@ByteSize(min = 1, max = 40, fullWidthMin = 1, fullWidthMax = 20, encoding = "Shift-JIS", groups = {
			PostProductGroupMasterProductRegistRequestKanjiOrder2.class })
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
	 * POS売上税区分
	 */
	private List<String> productTaxCodes;
	/**
	 * POS売上税区分ゲッター
	 *
	 * @return POS売上税区分
	 */
	public List<String> getProductTaxCodes() {
		return productTaxCodes;
	}
	/**
	 * POS売上税区分セッター
	 *
	 * @param productTaxCodes POS売上税区分
	 */
	public void setProductTaxCodes(List<String> productTaxCodes) {
		this.productTaxCodes = productTaxCodes;
	}

	/**
	 * 商品区分
	 */
	private Long productClassification;
	/**
	 * 商品区分ゲッター
	 *
	 * @return 商品区分
	 */
	public Long getProductClassification() {
		return productClassification;
	}
	/**
	 * 商品区分セッター
	 *
	 * @param productClassification 商品区分
	 */
	public void setProductClassification(Long productClassification) {
		this.productClassification = productClassification;
	}

	/**
	 * 年齢確認商品
	 */
	private Long ageToBuy;
	/**
	 * 年齢確認商品ゲッター
	 *
	 * @return 年齢確認商品
	 */
	public Long getAgeToBuy() {
		return ageToBuy;
	}
	/**
	 * 年齢確認商品セッター
	 *
	 * @param ageToBuy 年齢確認商品
	 */
	public void setAgeToBuy(Long ageToBuy) {
		this.ageToBuy = ageToBuy;
	}

	/**
	 * アイテム値割引区分
	 */
	private Boolean discountable;
	/**
	 * アイテム値割引区分ゲッター
	 *
	 * @return アイテム値割引区分
	 */
	public Boolean getDiscountable() {
		return discountable;
	}
	/**
	 * アイテム値割引区分セッター
	 *
	 * @param discountable アイテム値割引区分
	 */
	public void setDiscountable(Boolean discountable) {
		this.discountable = discountable;
	}

	/**
	 * アイテム売変区分
	 */
	private Boolean priceChangeOperation;
	/**
	 * アイテム売変区分ゲッター
	 *
	 * @return アイテム売変区分
	 */
	public Boolean getPriceChangeOperation() {
		return priceChangeOperation;
	}
	/**
	 * アイテム売変区分セッター
	 *
	 * @param priceChangeOperation アイテム売変区分
	 */
	public void setPriceChangeOperation(Boolean priceChangeOperation) {
		this.priceChangeOperation = priceChangeOperation;
	}

	/**
	 * 小計値引割引対象
	 */
	private Boolean subTotalDiscountable;
	/**
	 * 小計値引割引対象ゲッター
	 *
	 * @return 小計値引割引対象
	 */
	public Boolean getSubTotalDiscountable() {
		return subTotalDiscountable;
	}
	/**
	 * 小計値引割引対象セッター
	 *
	 * @param subTotalDiscountable 小計値引割引対象
	 */
	public void setSubTotalDiscountable(Boolean subTotalDiscountable) {
		this.subTotalDiscountable = subTotalDiscountable;
	}

	/**
	 * 決済種別
	 */
	private String[] paymentType;
	/**
	 * 決済種別ゲッター
	 *
	 * @return 決済種別
	 */
	public String[] getPaymentType() {
		return paymentType;
	}
	/**
	 * 決済種別セッター
	 *
	 * @param paymentType 決済種別
	 */
	public void setSaymentType(String[] paymentType) {
		this.paymentType = paymentType;
	}

	/**
	 * 免税区分
	 */
	private Long dutyFreeClassification;
	/**
	 * 免税区分ゲッター
	 *
	 * @return 免税区分
	 */
	public Long getDutyFreeClassification() {
		return dutyFreeClassification;
	}
	/**
	 * 免税区分セッター
	 *
	 * @param dutyFreeClassification 免税区分
	 */
	public void setDutyFreeClassification(Long dutyFreeClassification) {
		this.dutyFreeClassification = dutyFreeClassification;
	}

	/**
	 * 販売停止区分
	 */
	private Boolean notForSale;
	/**
	 * 販売停止区分ゲッター
	 *
	 * @return 販売停止区分
	 */
	public Boolean getNotForSale() {
		return notForSale;
	}
	/**
	 * 販売停止区分セッター
	 *
	 * @param notForSale 販売停止区分
	 */
	public void setNotForSale(Boolean notForSale) {
		this.notForSale = notForSale;
	}

	/**
	 * 金額強制入力
	 */
	private Boolean priceRequired;
	/**
	 * 金額強制入力ゲッター
	 *
	 * @return 金額強制入力
	 */
	public Boolean getPriceRequired() {
		return priceRequired;
	}
	/**
	 * 金額強制入力セッター
	 *
	 * @param priceRequired 金額強制入力
	 */
	public void setPriceRequired(Boolean priceRequired) {
		this.priceRequired = priceRequired;
	}

}
