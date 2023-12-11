package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * アクセス権限更新 リクエストボディ データモデル.
 *
 * @author TSS 岩崎 由佳子
 * @version 1.0.0
 */
@Data
public class PutAccessAuthorityCsvRequestRcvModel {
	private int authority;
	private String authorityName;

	private List<String> authorityList1;
	private List<String> authorityList2;
	private List<String> authorityList3;
	private List<String> authorityList4;
	private List<String> authorityList5;
	private List<String> authorityList6;
	private List<String> authorityList7;
	private List<String> authorityList8;
	private List<String> authorityList9;
	private List<String> authorityList10;

	private String authorityName1;
	private String authorityName2;
	private String authorityName3;
	private String authorityName4;
	private String authorityName5;
	private String authorityName6;
	private String authorityName7;
	private String authorityName8;
	private String authorityName9;
}
