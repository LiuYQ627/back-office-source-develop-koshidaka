//KSD V001.000 20230901 AS
package com.ttss.prementenance.model;

import lombok.Data;

/**
* データモデル.
*
* @author 
* @version 1.0.0
*/
@Data
public class DurationTimeModel {
	public DurationTimeModel() {
	}

	/**
	 * start
	 */
	private String start;
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}

	/**
	 * end
	 */
	private String end;
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
}
//KSD V001.000 20230901 AE

