package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Map;
import lombok.Data;

/**
 * 構成情報 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GetPaymentDetailModel {
	public GetPaymentDetailModel() {
	}

	/**
	 * バージョン.
	 */
	private Integer version;

	/**
	 * 構成.
	 */
	private Map<String, Object> configurations;

}
