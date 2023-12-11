package com.ttss.prementenance.data;

import java.util.List;

import lombok.Data;

@Data
public class CategoryModel {
	
//	private Integer version;
//	private String id;
	private Integer order;
	private String categoryName;
//	private String lastModifiedTimestamp;
//	private String createTimestamp;
//	private String catalogId;
	private Integer categoryCode;
	private Integer displayFlag;
	private List<CategoryItemModel> items;
}
