package com.ttss.prementenance.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import lombok.Data;

/**
* パスワード情報 データモデル.
*
* @author TSS 岩崎 由佳子
* @version 1.0.0
*/
@Data
public class PassInfoModel {

	public PassInfoModel() {
	}

	public PassInfoModel(String password, String passwordOld) {
		this.password = password;
		this.passwordOld = passwordOld;
	}

	/**
	 * パスワード（新）.
	 */
	@NotEmpty
	@Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	private String password;

	/**
	 * パスワード（旧）.
	 */
	@NotEmpty
	@Pattern(regexp = "^[a-zA-Z0-9 -/:-@\\[-\\`\\{-\\~]*$")
	private String passwordOld;

	/**
	 * パスワード（新）ゲッター.
	 *
	 * @return パスワード（新）
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * パスワード（新）セッター.
	 *
	 * @param password パスワード（新）
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * パスワード（旧）ゲッター.
	 *
	 * @return パスワード（旧）
	 */
	public String getPasswordOld() {
		return passwordOld;
	}

	/**
	 * パスワード（旧）セッター.
	 *
	 * @param passwordOld パスワード（旧）
	 */
	public void setPasswordOld(String passwordOld) {
		this.passwordOld = passwordOld;
	}

}
