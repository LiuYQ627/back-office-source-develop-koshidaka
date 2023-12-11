package com.ttss.prementenance.model;

import lombok.Data;

/**
* ユーザデータ情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
@Data
public class PasswordLockUserModel {
	public PasswordLockUserModel() {
	}

	private String userId;
	private String name;

	/**
	 * 画面表示用
	 *
	 * @return
	 */
	public String getDisplayCode() {
		if (userId != null && userId.length() > 15) {
			return userId.substring(15);
		}
		return userId;
	}
}
