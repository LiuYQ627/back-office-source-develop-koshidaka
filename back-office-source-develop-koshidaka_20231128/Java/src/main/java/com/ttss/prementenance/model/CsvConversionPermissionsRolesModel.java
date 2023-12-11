// KSD V001.000 20230907 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * コシダカ　CsvConversion共通レスポンスモデル.
 * 応答:"jsonBody": {..}の形
 */
@Data
public class CsvConversionPermissionsRolesModel {
	public CsvConversionPermissionsRolesModel() {}

	private String nodeId;
	private String processingType;
	private String targetCollection;
	
}
//KSD V001.000 20230907 AE
