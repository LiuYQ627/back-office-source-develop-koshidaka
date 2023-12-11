package com.ttss.prementenance.request;
import lombok.Data;

@Data
public class DeleteImageFileRequest {
	public DeleteImageFileRequest() {}
	
	private String fileName;
	private String companyCode;
	// KSD V001.000 AS issue #1373 対応
	private String fileType;
	// KSD V001.000 AE issue #1373 対応
	
}
