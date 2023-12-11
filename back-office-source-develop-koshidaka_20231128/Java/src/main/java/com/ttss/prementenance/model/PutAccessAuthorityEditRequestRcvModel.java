package com.ttss.prementenance.model;

import lombok.Data;

/**
 * アクセス権限更新 リクエストボディ データモデル.
 *
 * @author TSS 岩崎 由佳子
 * @version 1.0.0
 */
@Data
public class PutAccessAuthorityEditRequestRcvModel {
	private int authority;
	private String authorityName;
	private String authorityOldName;
}
