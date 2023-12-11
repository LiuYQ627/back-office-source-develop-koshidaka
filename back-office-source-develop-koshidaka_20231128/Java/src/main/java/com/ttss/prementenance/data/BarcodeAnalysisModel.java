package com.ttss.prementenance.data;

import java.util.List;

import lombok.Data;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230227  xu.jh(Neusoft)  G001.00.0  issue課題#1218を対応します.
 */
@Data
public class BarcodeAnalysisModel {
	private List<BarcodeTypeModel> basicAnalysis;
	private IndividualAnalysis individualAnalysis;
}

@Data
class BarcodeTypeModel {
	private String barcode;
	private String processingType;
}

//@Data
//class IndividualAnalysis {
//	private String inquiryCode;
//	// G001.00.0 Add-Start
//	private String price;
//	// G001.00.0 Add-End
//}