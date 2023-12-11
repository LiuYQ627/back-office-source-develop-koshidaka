//KSD V001.000 20230904 AS
package com.ttss.prementenance.model;

import java.util.List;

import lombok.Data;

/**
 * コシダカ　モデル.
 * 応答:"jsonBody": {..}の形
 */
@Data
public class S3FileGetResModel {
	public S3FileGetResModel() {}

	//条文画像
	private List<S3FileGetResuponceModel> s3fileGet;
	public List<S3FileGetResuponceModel> getS3fileGet() {
		return s3fileGet;
	}
	public void setS3fileGet(List<S3FileGetResuponceModel> s3fileGet) {
		this.s3fileGet = s3fileGet;
	}
	
}
//KSD V001.000 20230904 AE

