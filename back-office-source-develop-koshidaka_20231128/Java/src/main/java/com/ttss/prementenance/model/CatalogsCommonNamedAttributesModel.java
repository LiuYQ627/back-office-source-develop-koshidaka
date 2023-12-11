package com.ttss.prementenance.model;

import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Catalogs共通namedAttributes データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CatalogsCommonNamedAttributesModel {
	public CatalogsCommonNamedAttributesModel() {}

	/**
	 * productTaxCodes
	 */
	private List<String> productTaxCodes;
	/**
	 * productTaxCodesゲッター
	 *
	 * @return productTaxCodes
	 */
	public List<String> getProductTaxCodes() {
		return productTaxCodes;
	}
	/**
	 * productTaxCodesセッター
	 *
	 * @param productTaxCodes productTaxCodes
	 */
	public void setProductTaxCodes(List<String> productTaxCodes) {
		this.productTaxCodes = productTaxCodes;
	}

}

