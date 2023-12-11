package com.ttss.prementenance.model;

import lombok.Data;

/**
* データモデル.
*
* @author 
* @version 
*/
@Data
public class S3FileGetResuponceModel {
	public S3FileGetResuponceModel() {
	}

	private String fileName;
	private Integer exists;
	private String signedUrl;
	private String hash;

}
