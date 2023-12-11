package com.ttss.prementenance.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
* POSレポート出力 モデル.
*
* @author TSS 長谷 章二
* @version 1.0.0
*/
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PosReportResponseModel {
	public PosReportResponseModel() {
	}

	/**
	 * duration
	 */
	private DurationModel duration;

	/**
	 * durationゲッター.
	 *
	 * @return duration
	 */
	public DurationModel getDuration() {
		return duration;
	}

	/**
	 * durationセッター.
	 *
	 * @param duration
	 */
	public void setDuration(DurationModel duration) {
		this.duration = duration;
	}

	/**
	 * reportName
	 */
	private String reportName;

	/**
	 * reportNameゲッター.
	 *
	 * @return reportName
	 */
	public String getReportName() {
		return reportName;
	}

	/**
	 * reportNameセッター.
	 *
	 * @param reportName
	 */
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}

	/**
	 * aggregateData
	 */
	private List<PosReportAggregateDataModel> aggregateData;

	/**
	 * aggregateDataゲッター.
	 *
	 * @return aggregateData
	 */
	public List<PosReportAggregateDataModel> getAggregateData() {
		return aggregateData;
	}

	/**
	 * aggregateDataセッター.
	 *
	 * @param aggregateData
	 */
	public void setAggregateData(List<PosReportAggregateDataModel> aggregateData) {
		this.aggregateData = aggregateData;
	}

}
