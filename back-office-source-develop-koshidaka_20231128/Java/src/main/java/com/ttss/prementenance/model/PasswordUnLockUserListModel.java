package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
* ユーザデータ情報 データモデル.
*
* @author TSS 廣田 敏明
* @version 1.0.0
*/
@Data
public class PasswordUnLockUserListModel {
	public PasswordUnLockUserListModel() {
	}

	/**
	 * ユーザ情報.
	 */
	private List<PasswordUnLockUserModel> userStatuses;

}
