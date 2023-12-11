// KSD V001.000 AS
package com.ttss.prementenance.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * レストランマスタデータモデル
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestaurantsMasterData{
 
    private String nodeId;
    private String Code;
    private String OESMenuCode;
    private long RestNo;
    private String OwnCompanyCode;
    private long LinkDpCode;
    private long KeyFFU;
    private String Name1;
    private String Name2;
    private String Name3;
    private String Name4;
    private String Name5;
    private String Name6;
    private String Name7;
    private String ImageFileName;
    private long Tanka_TaxIn;
    private long Tanka_TaxOut;
    private long SubTanka_TaxIn;
    private long SubTanka_TaxOut;
    private long TankaFFU1_TaxIn;
    private long TankaFFU1_TaxOut;
    private long TankaFFU2_TaxIn;
    private long TankaFFU2_TaxOut;
    private long TankaFFU3_TaxIn;
    private long TankaFFU3_TaxOut;
    private long TankaFFU4_TaxIn;
    private long TankaFFU4_TaxOut;
    private long TankaFFU5_TaxIn;
    private long TankaFFU5_TaxOut;
    private long TankaFFU6_TaxIn;
    private long TankaFFU6_TaxOut;
    private long TankaFFU7_TaxIn;
    private long TankaFFU7_TaxOut;
    private long TankaFFU8_TaxIn;
    private long TankaFFU8_TaxOut;
    private long TankaFFU9_TaxIn;
    private long TankaFFU9_TaxOut;
    private long TankaFFU10_TaxIn;
    private long TankaFFU10_TaxOut;
    private long Genka95;
    private long GenkaFFU;
    private long DpTanka1_DpCode;
    private long DpTanka1;
    private long DpTanka1_Genka;
    private long DpTanka2_DpCode;
    private long DpTanka2;
    private long DpTanka2_Genka;
    private long DpTanka3_DpCode;
    private long DpTanka3;
    private long DpTanka3_Genka;
    private long DpTanka4_DpCode;
    private long DpTanka4;
    private long DpTanka4_Genka;
    private long DpTanka5_DpCode;
    private long DpTanka5;
    private long DpTanka5_Genka;
    private long TOSts;
    private long TankaSts;
    private long TicketSts;
    private long PackSts;
    private long HoSts;
    private long Pack_TaxAmt;
    private long Pack_HoAmt;
    private long Pack_TaxTargetAmt;
    private long Pack_HoTargetAmt;
    private long AddQtySts;
    private long StlDiscSts;
    private long TaxSts;
    private long LinkMatomeCode;
    private long LinkMMCode;
    private long ScpSts1_No;
    private long ScpSts1_MaxQty;
    private long ScpSts2_No;
    private long ScpSts2_MaxQty;
    private long ScpSts3_No;
    private long ScpSts3_MaxQty;
    private long ScpSts4_No;
    private long ScpSts4_MaxQty;
    private long ScpSts5_No;
    private long ScpSts5_MaxQty;
    private long ScpSts6_No;
    private long ScpSts6_MaxQty;
    private long ScpSts7_No;
    private long ScpSts7_MaxQty;
    private long ScpSts8_No;
    private long ScpSts8_MaxQty;
    private long ScpSts9_No;
    private long ScpSts9_MaxQty;
    private long ScpSts10_No;
    private long ScpSts10_MaxQty;
    private long ScpSts11_No;
    private long ScpSts11_MaxQty;
    private long ScpSts12_No;
    private long ScpSts12_MaxQty;
    private long OESMenuSts;
    private long MenuAttr;
    private long AutoTP;
    private long SoldOutSts;
    private long CautionMark;
    private long FreeSts;
    private long FreePrtSts;
    private long Teiban;
    private long EtcDpSts;
    private long MaeukeSts;
    private long KcpPtnNum;
    private long KcpPtnEdtFlg;
    private long KcpSts1;
    private long KcpSts2;
    private long KcpSts3;
    private long KcpSts4;
    private long KcpSts5;
    private long KcpSts6;
    private long KcpSts7;
    private long KcpSts8;
    private long KcpSts9;
    private long KcpSts10;
    private long KcpSts11;
    private long KcpSts12;
    private long KcpSts13;
    private long KcpSts14;
    private long KcpSts15;
    private long KcpSts16;
    private long KcpSts17;
    private long KcpSts18;
    private long KcpSts19;
    private long KcpSts20;
    private long KcpSts21;
    private long KcpSts22;
    private long KcpSts23;
    private long KcpSts24;
    private long KcpSts25;
    private long KcpSts26;
    private long KcpSts27;
    private long KcpSts28;
    private long KcpSts29;
    private long KcpSts30;
    private long KcpSts31;
    private long KcpSts32;
    private long PrtPriorityNo;
    private long CcpPrtPosi;
    private long CcpPrtSts;
    private long HtlBackColor;
    private long KdPosiMark;
    private long KdPassTime1;
    private long KdPassTime2;
    private long SearchSts1;
    private long SearchSts2;
    private long SearchSts3;
    private long SearchSts4;
    private long SearchSts5;
    private long SearchSts6;
    private long SearchSts7;
    private long SearchSts8;
    private long SearchSts9;
    private long SearchSts10;
    private long SearchSts11;
    private long SearchSts12;
    private long SearchSts13;
    private long SearchSts14;
    private long SearchSts15;
    private String createTimestamp;
    private String lastModifiedTimestamp;
    private long version;
    private String lastModifiedUserId;

}
// KSD V001.000 AE