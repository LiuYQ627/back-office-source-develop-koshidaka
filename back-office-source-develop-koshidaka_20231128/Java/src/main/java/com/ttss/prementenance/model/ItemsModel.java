package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * 構成情報 データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItemsModel {
	public ItemsModel() {
	}
	/**
	 * productId.
	 */
	private String productId;

	@JsonProperty("displayName")
	private Object displayNameObj;

	private String skuId;
}
