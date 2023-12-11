// KSD V001.000 AS
package com.ttss.prementenance.model;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* CLOUDPOS 共通ディスプレイデータモデル.
*
* @author P.J.Abella(AWS)
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ConfigurationCloudposDetailModel {
	public ConfigurationCloudposDetailModel() {
	}

	/**
	 * version.
	 */
	private String version;

	/**
	 * parentName.
	 */
	private String parentName;

	/**
	 * displayName.
	 */
	private Map<String, Object> displayName;

	/**
	 * name.
	 */
	private String name;

	/**
	 * configurationSetting.
	 */
	private Map<String, Object> configurations;

}
// KSD V001.000 AE
