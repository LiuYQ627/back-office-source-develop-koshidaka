package com.ttss.prementenance.data;

import java.util.List;
import lombok.Data;

@Data
public class CategoryItemModel {

	private Integer version;
	private String title;
//	private String id;
	private Integer order;
//	private String lastModifiedTimestamp;
//	private String createTimestamp;
//	private String lastModifiedUserId;
	private String fileName;
	private String skuId;
//	private String categoryId;
	private String itemName;
	private String presetName;
	private String barCode;
	private List<String> productTaxCodes;
	private String price;
	private String presignedUrl;
}
