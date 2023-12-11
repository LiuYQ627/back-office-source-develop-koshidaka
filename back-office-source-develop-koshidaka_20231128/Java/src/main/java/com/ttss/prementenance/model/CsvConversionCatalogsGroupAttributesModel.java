// KSD V001.000 20230907 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
 * コシダカ　CsvConversion共通レスポンスモデル.
 * 応答:"jsonBody": {..}の形
 */
@Data
public class CsvConversionCatalogsGroupAttributesModel {
	public CsvConversionCatalogsGroupAttributesModel() {}

	private String companyCode;
	private String catalogName;
	private Integer productClassificationNumber;
}
//KSD V001.000 20230907 AE
