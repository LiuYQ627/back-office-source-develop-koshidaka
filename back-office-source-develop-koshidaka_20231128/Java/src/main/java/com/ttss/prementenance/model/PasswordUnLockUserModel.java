package com.ttss.prementenance.model;

import lombok.Data;

/**
* ユーザデータ情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
@Data
public class PasswordUnLockUserModel {
	public PasswordUnLockUserModel() {
	}

	private String userId;
	private Integer accountClassification;
}
