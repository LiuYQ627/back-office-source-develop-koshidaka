package com.ttss.prementenance.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * コシダカ　S3bucket共通UPLOADモデル.
 */

@Data
public class S3bucketUploadForm {
	public S3bucketUploadForm() {}

	private MultipartFile multipartFile;
	public MultipartFile getMultipartFile() {
		return multipartFile;
	}
	public void setMultipartFile(MultipartFile multipartFile) {
		this.multipartFile = multipartFile;
	}

}
