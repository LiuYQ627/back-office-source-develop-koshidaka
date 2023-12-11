package com.ttss.prementenance.data;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PlanningModel {
	private String id;
	private Integer version;
	private Integer planningCode;
	private Integer sundayFlag;
	private Integer mondayFlag;
	private Integer tuesdayFlag;
	private Integer wednesdayFlag;
	private Integer thursdayFlag;
	private Integer fridayFlag;
	private Integer saturdayFlag;
	private String catalogName;
	private String startDateTime;
	private String endDateTime;
	private String createTimestamp;
	private String companyCode;
	// KSD V001.000 DS issue #1373 ‘Î‰ž
	// KSD V001.000 MS
	//private List<String> standardStoreCode;
	// KSD V001.000 ME
	// KSD V001.000 DE issue #1373 ‘Î‰ž
	// KSD V001.000 AS issue #1373 ‘Î‰ž
	private String standardStoreCode;
	// KSD V001.000 AE issue #1373 ‘Î‰ž
	private String lastModifiedTimestamp;
	private String lastModifiedUserId;
	private List<String> targetStoreCode;
	private List<CategoryModel> category = new ArrayList<CategoryModel>();
	private String status;
	// KSD V001.000 AS issue #1373 ‘Î‰ž
	private Boolean planningClassification;	
	private Integer allocation;
	// KSD V001.000 AE issue #1373 ‘Î‰ž
}
