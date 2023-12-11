package com.ttss.prementenance.request;

import lombok.Data;

@Data
public class PresetCatalogListRequest {
	public PresetCatalogListRequest() {}
	
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
}
