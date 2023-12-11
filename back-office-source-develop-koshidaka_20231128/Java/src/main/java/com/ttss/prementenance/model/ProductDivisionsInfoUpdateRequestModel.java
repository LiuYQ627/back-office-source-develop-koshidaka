package com.ttss.prementenance.model;

import com.ttss.prementenance.utils.validation.ByteSize;
import java.util.List;
import javax.validation.GroupSequence;
import javax.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;
import lombok.Data;

/**
 * 商品分類階層設定更新 情報 データモデル.
 *
 * @author 
 * @version 
 */
@Data
public class ProductDivisionsInfoUpdateRequestModel {

	// チェック順序用インタフェース（２つ以上チェック項目がある項目数分用意し、それぞれに設定）
	public interface ProductDivisionsInfoUpdateRequestNameOrder1 {
	}

	public interface ProductDivisionsInfoUpdateRequestNameOrder2 {
	}

	// 順序を指定したグループの定義
	@GroupSequence({ ProductDivisionsInfoUpdateRequestNameOrder1.class,
			ProductDivisionsInfoUpdateRequestNameOrder2.class })
	public interface GroupNameOrder {
	}

	public ProductDivisionsInfoUpdateRequestModel() {
	}

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
	 * 分類No.
	 */
	@Range(min = 1, max = 8)
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
//	@NotEmpty(groups = { ProductDivisionsInfoUpdateRequestNameOrder1.class })
	@ByteSize(min = 0, max = 32, fullWidthMin = 0, fullWidthMax = 16, encoding = "Shift-JIS", groups = {
			ProductDivisionsInfoUpdateRequestNameOrder2.class })
	private String productName;
	/**
	 * 商品構成名ゲッター.
	 *
	 * @return 名称
	 */
	public String getProductName() {
		return productName;
	}
	/**
	 * 商品構成名セッター.
	 *
	 * @param productName 商品構成名
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * 商品構成コードの桁数.
	 */
	@Range(min = 0, max = 6)
	private Long length;
	/**
	 * 商品構成コードの桁数ゲッター.
	 *
	 * @return 商品構成コードの桁数
	 */
	public Long getLength() {
		return length;
	}
	/**
	 * 商品構成コードの桁数セッター.
	 *
	 * @param length 商品構成コードの桁数
	 */
	public void setLength(Long length) {
		this.length = length;
	}

	/**
	 * 利用フラグ.
	 */
	private Boolean usedFlg;
	/**
	 * 利用フラグゲッター.
	 *
	 * @return 利用フラグ
	 */
	public Boolean getUsedFlg() {
		return usedFlg;
	}
	/**
	 * 利用フラグセッター.
	 *
	 * @param usedFlg 利用フラグ
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
	 * @return 登録種別
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
