package com.ttss.prementenance.request;

import lombok.Data;

@Data
public class PresetCatalogDeleteRequest {
	public PresetCatalogDeleteRequest() {}
	
	private String planningId;
	public String getPlanningId() {
		return planningId;
	}
	public void setPlanningId(String planningId) {
		this.planningId = planningId;
	}
}
