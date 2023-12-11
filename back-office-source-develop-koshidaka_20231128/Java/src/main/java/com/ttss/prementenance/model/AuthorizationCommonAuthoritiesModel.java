package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * Authorization共通Authorities データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
public class AuthorizationCommonAuthoritiesModel {
	public AuthorizationCommonAuthoritiesModel() {}

	/**
	 * アスタリスク
	 */
	@JsonProperty("*")
	private String asterisk;
	/**
	 * アスタリスクゲッター
	 *
	 * @return アスタリスク
	 */
	public String getAsterisk() {
		return asterisk;
	}
	/**
	 * アスタリスクセッター
	 *
	 * @param asterisk アスタリスク
	 */
	public void setAsterisk(String asterisk) {
		this.asterisk = asterisk;
	}

}

