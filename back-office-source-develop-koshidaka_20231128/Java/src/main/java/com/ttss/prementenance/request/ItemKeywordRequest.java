package com.ttss.prementenance.request;

import lombok.Data;

@Data
public class ItemKeywordRequest {
	public ItemKeywordRequest() {}
	
	private String keyword;
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	private Integer limit;
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	
//	private String planningCode;
//	public String getPlanningCode() {
//		return planningCode;
//	}
//	public void setPlanningCode(String planningCode) {
//		this.planningCode = planningCode;
//	}
//	
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
