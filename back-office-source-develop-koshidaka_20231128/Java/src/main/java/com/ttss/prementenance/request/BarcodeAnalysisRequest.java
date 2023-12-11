package com.ttss.prementenance.request;

import org.json.JSONObject;

import lombok.Data;

@Data
public class BarcodeAnalysisRequest {
	public BarcodeAnalysisRequest() {}
	
	private String barcode;
	public String getBarcode() {
		return barcode;
	}
	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}
	
	private String nodeId;
	public String getNodeId() {
		return nodeId;
	}
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
	
	public JSONObject getParameter() {
		var params = new JSONObject();
		params.put("nodeId", this.nodeId);
		
		var barcode = new JSONObject();
		barcode.put("barcode", this.barcode);
		var barcodeList = new JSONObject();
		barcodeList.put("barcodes", new JSONObject[] {barcode});
		params.put("barcodeList", new JSONObject[] {barcodeList});
		
		return params;
	}
}
