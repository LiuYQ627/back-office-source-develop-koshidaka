// KSD V001.000 AS
package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * 表示名モデル.
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 *
 */
@Data
public class DisplayNameModel {

	@JsonProperty("default")
	private String defaultValue;

}
// KSD V001.000 AE
