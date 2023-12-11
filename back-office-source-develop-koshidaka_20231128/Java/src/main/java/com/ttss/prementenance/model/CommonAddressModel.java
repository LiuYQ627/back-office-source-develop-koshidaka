package com.ttss.prementenance.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * 共通エリア住所 データモデル.
 *
 * @author 
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown=true)
public class CommonAddressModel {
	public CommonAddressModel() {}

	/**
	 * address1
	 */
	private CommonDefaultModel address1 = new CommonDefaultModel();
	/**
	 * address1ゲッター
	 *
	 * @return address1
	 */
	public CommonDefaultModel getAddress1() {
		return address1;
	}
	/**
	 * address1セッター
	 *
	 * @param address1 address1
	 */
	public void setAddress1(CommonDefaultModel address1) {
		this.address1 = address1;
	}

	/**
	 * address2
	 */
	private CommonDefaultModel address2 = new CommonDefaultModel();
	/**
	 * address2ゲッター
	 *
	 * @return address2
	 */
	public CommonDefaultModel getAddress2() {
		return address2;
	}
	/**
	 * address2セッター
	 *
	 * @param address2 address2
	 */
	public void setAddress2(CommonDefaultModel address2) {
		this.address2 = address2;
	}

	/**
	 * city
	 */
	private CommonDefaultModel city = new CommonDefaultModel();
	/**
	 * cityゲッター
	 *
	 * @return city
	 */
	public CommonDefaultModel getCity() {
		return city;
	}
	/**
	 * cityセッター
	 *
	 * @param city city
	 */
	public void setCity(CommonDefaultModel city) {
		this.city = city;
	}

	/**
	 * state
	 */
	private CommonDefaultModel state = new CommonDefaultModel();
	/**
	 * stateゲッター
	 *
	 * @return state
	 */
	public CommonDefaultModel getState() {
		return state;
	}
	/**
	 * stateセッター
	 *
	 * @param state state
	 */
	public void setState(CommonDefaultModel state) {
		this.state = state;
	}

	/**
	 * postal_code
	 */
	private CommonDefaultModel postalCode = new CommonDefaultModel();
	/**
	 * postal_codeゲッター
	 *
	 * @return postal_code
	 */
	public CommonDefaultModel getPostalCode() {
		return postalCode;
	}
	/**
	 * postal_codeセッター
	 *
	 * @param postalCode postal_code
	 */
	public void setPostalCode(CommonDefaultModel postalCode) {
		this.postalCode = postalCode;
	}

	/**
	 * country
	 */
	private CommonDefaultModel country = new CommonDefaultModel();
	/**
	 * countryゲッター
	 *
	 * @return country
	 */
	public CommonDefaultModel getCountry() {
		return country;
	}
	/**
	 * countryセッター
	 *
	 * @param country country
	 */
	public void setCountry(CommonDefaultModel country) {
		this.country = country;
	}

}

