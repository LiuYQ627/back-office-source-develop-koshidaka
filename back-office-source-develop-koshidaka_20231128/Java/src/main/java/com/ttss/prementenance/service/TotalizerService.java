package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostTotalizerReportPdfResponseModel;
import com.ttss.prementenance.model.PostTotalizerReportResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230317 dingxin(Neusoft)   G001.00.0  issue課題#1718を対応します.
 */
/**
* 出力API.
*
* @author
* @version 1.0.0
*/
@Service
public class TotalizerService {
// KSD V001.000 20230915 AS
	//一定量オーバ件数
	private final static int ITEM_LINE_COUNT_MAX = 300;
// KSD V001.000 20230915 AS

	@Autowired
	public TotalizerService() {
	}

	/**
	 * POSレポート出力API実行.
	 *
	 * @param requestBodyModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param changePlanNameUnitCdStr 企業コード(文字列)
	 * @param accessToken アクセストークン
	 * @return 変更計画更新API応答＋エラーメッセージ
	 */
// KSD V001.000 DS
//	public PostTotalizerReportResponseModel postTotalizerReport(PostTotalizerReportRequestBodyModel requestBodyModel,
//			MessageSource messageSource, ApiContext apiContext,
//			String accessToken, String ELERAToken, String userId, String passWord) {
// KSD V001.000 DE
// KSD V001.000 AS
	public PostTotalizerReportResponseModel postTotalizerReport(Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext,
			String accessToken, String ELERAToken, String userId, String passWord) {

		var responseModel = new PostTotalizerReportResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 変更計画更新処理をリクエスト
		try {

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
// KSD V001.000 DS
//			String json = mapper.writeValueAsString(requestBodyModel);
// KSD V001.000 DE
// KSD V001.000 AS
			String json_work = mapper.writeValueAsString(model);
			String json = "{\"keys\":" + json_work + "}";
// KSD V001.000 AE
			
			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getTotalizerReport();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getTotalizerReport();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
			
			// G001.00.0 Delete-Start
			//System.out.println(url);
			// G001.00.0 Delete-End

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

			// 応答コードの確認
			// 応答Bodyなし
			var messageKey = "";
			Object[] args = null;
			// AS #982
	        if ((response.getResponse().body().indexOf("412") >= 0) &&
	        	response.getResponse().statusCode() != 200) {
				// 正常
				responseModel.getResult().setCode(2);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
	        }
	        else
	        {
			// AE #982
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "O00101.E001";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				// レスポンス変換（JSON -> Javaオブジェクト）
// KSD V001.000 DS
//				responseModel
//						.setResponseModel(mapper.readValue(response.getResponse().body(), PosReportResponseModel.class));
// KSD V001.000 DS
// KSD V001.000 20230915 AS
				/////////////////////////////////////////////
				// 一定量を超過で項目削除(Map)
				/////////////////////////////////////////////
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
				//取引別、券種別、部屋別、ユーザー別
				if(responseModel.getResponseModel().get("reportName").equals("TRANSACTION")||
				   responseModel.getResponseModel().get("reportName").equals("TICKET")||
//				   responseModel.getResponseModel().get("reportName").equals("ROOM")||
				   responseModel.getResponseModel().get("reportName").equals("USER")) {
					
					Integer ItemLineCount = 0;
					List<Map<String,Object>> aggregateDataListMap = new ArrayList<>();
					Map<String,Object> aggregateDataMap = new HashMap<>();
					
					//店舗:aggregateData[0,1..]
					aggregateDataListMap = (List<Map<String,Object>>)responseModel.getResponseModel().get("aggregateData");
					for(Integer i=0; i<aggregateDataListMap.size(); i++ ) {
						//店舗:aggregateData[i]
						aggregateDataMap = (Map<String,Object>)aggregateDataListMap.get(i);
						
						List<Map<String,Object>>  endpointsListMap = new ArrayList<>();
						Map<String,Object> endpointsMap = new HashMap<>();
						endpointsListMap = (List<Map<String,Object>>)aggregateDataMap.get("endpoints");
						for(Integer ii=0; ii<endpointsListMap.size(); ii++ ) {
							//レジ:endpoints[ii]
							endpointsMap = endpointsListMap.get(ii);
							List<Map<String,Object>>  itemDataListMap = new ArrayList<>();
							itemDataListMap = (List<Map<String,Object>>)endpointsMap.get("data");
							Integer itemDataListMap_size = itemDataListMap.size();
// KSD V001.000 20230921 AS							
							if(itemDataListMap_size > ITEM_LINE_COUNT_MAX) {
								responseModel.getResponseModel().put("OverDispDataMsg", "データ量が一定を超えました。以降はPDFで確認願います。");
							}
// KSD V001.000 20230921 AE							
							for(Integer iii=0; iii<itemDataListMap_size; iii++ ) {
								//項目:data[iii]
								ItemLineCount++;
								if(ItemLineCount > ITEM_LINE_COUNT_MAX) {
									//項目を削除
									if( itemDataListMap.size() > 0 ) {
										itemDataListMap.remove(itemDataListMap.get(itemDataListMap.size()-1));
									}
								}
							}
						}
					}
// KSD V001.000 20230921 DS
				//	if(ItemLineCount > ITEM_LINE_COUNT_MAX) {
				//		responseModel.getResponseModel().put("OverDispDataMsg", "データ量が一定を超えました。以降はPDFで確認願います。");
				//	}
// KSD V001.000 20230921 DE
				}
				
// KSD V001.000 20230915 AE				
// KSD V001.000 20230921 AS
				if(responseModel.getResponseModel().get("reportName").equals("ROOM")){							
							Integer ItemLineCount = 0;
							List<Map<String,Object>> aggregateDataListMap = new ArrayList<>();
							Map<String,Object> aggregateDataMap = new HashMap<>();
							
							//店舗:aggregateData[0,1..]
							aggregateDataListMap = (List<Map<String,Object>>)responseModel.getResponseModel().get("aggregateData");
							for(Integer i=0; i<aggregateDataListMap.size(); i++ ) {
								//店舗:aggregateData[i]
								aggregateDataMap = (Map<String,Object>)aggregateDataListMap.get(i);
								List<Map<String,Object>>  itemDataListMap = new ArrayList<>();
								itemDataListMap = (List<Map<String,Object>>)aggregateDataMap.get("data");
								Integer itemDataListMap_size = itemDataListMap.size();
								if(itemDataListMap_size > ITEM_LINE_COUNT_MAX) {
									responseModel.getResponseModel().put("OverDispDataMsg", "データ量が一定を超えました。以降はPDFで確認願います。");
								}
								for(Integer iii=0; iii<itemDataListMap_size; iii++ ) {
									//項目:data[iii]
									ItemLineCount++;
									if(ItemLineCount > ITEM_LINE_COUNT_MAX) {
										//項目を削除
										if( itemDataListMap.size() > 0 ) {
											itemDataListMap.remove(itemDataListMap.get(itemDataListMap.size()-1));
										}
									}
								}								
							}				
							
						}
// KSD V001.000 20230921 AE
			}
			// AS #982
	        }
			// AE #982

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E004"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E001"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E001"), -30, e));
		}
		return responseModel;
	}

	/**
	 * POSレポート出力API実行.
	 *
	 * @param requestBodyModel リクエストモデル
	 * @param messageSource メッセージソース
	 * @param apiContext アプリケーションプロパティ
	 * @param changePlanNameUnitCdStr 企業コード(文字列)
	 * @param accessToken アクセストークン
	 * @return 変更計画更新API応答＋エラーメッセージ
	 */
// KSD V001.000 DS
//	public PostTotalizerReportPdfResponseModel postTotalizerReportPdf(PostTotalizerReportRequestBodyModel requestBodyModel,
//			MessageSource messageSource, ApiContext apiContext,
//			String accessToken, String ELERAToken, String userId, String passWord) {
// KSD V001.000 DE
// KSD V001.000 AS
	public PostTotalizerReportPdfResponseModel postTotalizerReportPdf(Map<String, Object> model,
			MessageSource messageSource, ApiContext apiContext,
			String accessToken, String ELERAToken, String userId, String passWord) {
// KSD V001.000 AE

		var responseModel = new PostTotalizerReportPdfResponseModel();
		var messageResourseUtil = new MessageSourceUtil(messageSource);

		// 変更計画更新処理をリクエスト
		try {

			// リクエストボディ設定(Object→JSON)
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
// KSD V001.000 DS
//			String json = mapper.writeValueAsString(requestBodyModel);
// KSD V001.000 DE
// KSD V001.000 AS
			String json_work = mapper.writeValueAsString(model);
			String json = "{\"keys\":" + json_work + "}";
// KSD V001.000 AE

			// URLの生成
			var url = apiContext.getWso2CommonUrl() + apiContext.getTotalizerReport();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//			url = "http://localhost:8082/" + apiContext.getTotalizerReport();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug			
			// G001.00.0 Delete-Start
			//System.out.println(url);
			// G001.00.0 Delete-End

			// リクエストを送信して応答を取得
			HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
					accessToken, ELERAToken, json, userId, passWord, messageSource);

			// 応答コードの確認
			// 応答Bodyなし
			var messageKey = "";
			Object[] args = null;
	        if ((response.getResponse().body().indexOf("412") >= 0) &&
	        	response.getResponse().statusCode() != 200) {
				// 正常
				responseModel.getResult().setCode(2);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
	        }
	        else
	        {
			switch (response.getResponse().statusCode()) {
			case 200:
				// 正常
				responseModel.getResult().setCode(0);
				// WSO2のトークン格納
				responseModel.getResult().setWSO2Token(response.getWSO2Token());
				// ELERAのトークン格納
				responseModel.getResult().setELERAToken(response.getELERAToken());
				break;
			default:
				responseModel.getResult().setCode(response.getResponse().statusCode());
				messageKey = "O00101.E001";
				responseModel.getResult()
						.setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
								response.getResponse().body(), args));
				return responseModel;
			}
			if (response.getResponse().body().length() == 0) {
				// データなし
				responseModel.getResult().setCode(2);
			} else {
				// レスポンス変換（JSON -> Javaオブジェクト）
// KSD V001.000 DS
//				responseModel
//				.setResponseModel(mapper.readValue(response.getResponse().body(), PosReportPdfResponseModel.class));
// KSD V001.000 DE
// KSD V001.000 AS
				responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), new TypeReference<Map<String, Object>>() {}));
// KSD V001.000 AE
			}
	        }

		} catch (ConnectException e) {
			// 通信に失敗時
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E004"), -10, e));
		} catch (JsonProcessingException e) {
			// JSON変換エラー
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E001"), -20, e));
		} catch (Exception e) {
			// 上記以外
			responseModel.setResult(ApiUtil
					.createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E001"), -30, e));
		}
		return responseModel;
	}
}
