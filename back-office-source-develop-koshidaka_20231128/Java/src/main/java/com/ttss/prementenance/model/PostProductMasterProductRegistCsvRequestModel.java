package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/**
 * 商品マスタ更新リクエスト データモデル.
 *
 * @author
 * @version 1.0.0
 */
@Data
public class PostProductMasterProductRegistCsvRequestModel {
	private List<PostProductMasterProductRegistRequestModel> productDataList;

}
