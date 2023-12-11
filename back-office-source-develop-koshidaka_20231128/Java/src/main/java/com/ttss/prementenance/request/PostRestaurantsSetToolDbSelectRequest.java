// KSD V001.000 AS
package com.ttss.prementenance.request;

import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * レストランマスタデータのレスポンスモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 * 
 */
@Data
public class PostRestaurantsSetToolDbSelectRequest {

    private String table;
    private Map<String, Object> query;
    private Map<String, Object> projection;
    private List<Map<String, Object>> sort;
    private String apicaller;

}
// KSD V001.000 AE
