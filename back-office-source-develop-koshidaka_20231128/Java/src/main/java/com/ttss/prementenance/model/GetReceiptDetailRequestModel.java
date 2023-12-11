package com.ttss.prementenance.model;

import lombok.Data;

/**
* ヘルプ用PDFファイル リクエストパラメータ データモデル.
*
* @author TSS 向谷地　那望
* @version 1.0.0
*/
@Data
public class GetReceiptDetailRequestModel {

	public GetReceiptDetailRequestModel() {
	}

	private String companyCode;

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	private String storeCode;

	public String getStoreCode() {
		return storeCode;
	}

	public void setStoreCode(String storeCode) {
		this.storeCode = storeCode;
	}

	private String planningCode;

	public String getPlanningCode() {
		return planningCode;
	}

	public void setPlanningCode(String planningCode) {
		this.planningCode = planningCode;
	}
}
