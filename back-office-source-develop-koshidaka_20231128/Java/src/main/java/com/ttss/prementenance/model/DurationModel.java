package com.ttss.prementenance.model;

import lombok.Data;

/**
* 担当店舗コード データモデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
public class DurationModel {
	public DurationModel() {
	}

	/**
	 * from
	 */
	private String from;

	/**
	 * fromゲッター.
	 *
	 * @return from
	 */
	public String getFrom() {
		return from;
	}

	/**
	 * fromセッター.
	 *
	 * @param from
	 */
	public void setFrom(String from) {
		this.from = from;
	}

	/**
	 * to
	 */
	private String to;

	/**
	 * toゲッター.
	 *
	 * @return to
	 */
	public String getTo() {
		return to;
	}

	/**
	 * toセッター.
	 *
	 * @param to
	 */
	public void setTo(String to) {
		this.to = to;
	}
}
