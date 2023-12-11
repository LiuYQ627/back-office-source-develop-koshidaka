package com.ttss.prementenance.model;

import java.util.List;
import lombok.Data;

/** データクリアテーブル取得 レスポンス データモデル */
@Data
public class GetDataClearTableResponseModel {
    private ApiCommonResponseModel result;
    private List<DataClearTableResponseModel> dataClearTableResponseModelList;
    private List<DataClearTableKindMappingModel> dataClearTableKindMappingModelList;
}
