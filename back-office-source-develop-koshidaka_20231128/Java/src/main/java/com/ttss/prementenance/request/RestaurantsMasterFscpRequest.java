// KSD V001.000 AS
package com.ttss.prementenance.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * レストランマスタデータのリクエストモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 * 
 */
@Data
public class RestaurantsMasterFscpRequest {

    @JsonProperty("nodeId")
    public List<String> nodeId;

    @JsonProperty("ScpNo")
    public List<Integer> ScpNo;
 
}
// KSD V001.000 AE
