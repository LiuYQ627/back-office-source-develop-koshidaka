package com.ttss.prementenance.response;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ItemImageAddAndDeleteResponse {
	public ItemImageAddAndDeleteResponse() {}

	/**
	 * 実行結果
	 */
	private ApiCommonResponseModel result = new ApiCommonResponseModel();

	
	private Map<String, Object> images;
}
