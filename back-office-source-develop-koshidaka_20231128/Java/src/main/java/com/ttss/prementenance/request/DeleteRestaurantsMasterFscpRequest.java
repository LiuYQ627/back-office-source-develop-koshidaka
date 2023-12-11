// KSD V001.000 AS
package com.ttss.prementenance.request;

import lombok.Data;


/**
 * レストランFSCPマスタデータの削除リクエストモデル
 * 
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 * 
 */
@Data
public class DeleteRestaurantsMasterFscpRequest {
    
    private String nodeId;
    private int ScpNo;

}
// KSD V001.000 AE
