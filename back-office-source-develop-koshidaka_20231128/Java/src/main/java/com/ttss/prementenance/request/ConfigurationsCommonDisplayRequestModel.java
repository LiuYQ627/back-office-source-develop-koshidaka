// KSD V001.000 AS
package com.ttss.prementenance.request;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Configurations CommonDisplayリクエストモデル データモデル.
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class ConfigurationsCommonDisplayRequestModel {
	public ConfigurationsCommonDisplayRequestModel() {}

	/**
	 * 変更計画名
	 */
	private String changePlanName;

	/**
	 * フィールド除外
	 */
	private Boolean excludeFields;

	/**
	 * ノード名
	 */
	private String nodeNames;
	
	/**
	 * 返す結果のタイプ
	 */
	private String filter;
	
	/**
	 * フェッチレコード数
	 */
	private Integer batchSize;
	
	/**
	 * 変更計画から移行
	 */
	private Boolean fallthrough;
	
}
// KSD V001.000 AE
