// KSD V001.000 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * ストアマスターコピー処理の応答モデルを表します
 * @author N.G.Gordo(AWS)
 * @version 1.0.0
 */
@Data
public class PostStoreMasterCopyResponseModel {

	public PostStoreMasterCopyResponseModel () {

	}
	
	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();
	
}
// KSD V001.000 AE
