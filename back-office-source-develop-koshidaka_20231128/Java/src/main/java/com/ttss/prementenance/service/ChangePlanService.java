package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.ChangePlanCommonModel;
import com.ttss.prementenance.model.GetChangePlanRecordsChangePlanNameResmonseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostChangePlanRequestModel;
import com.ttss.prementenance.model.PostChangePlanResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;

/**
* 変更計画API.
*
* @author
* @version 1.0.0
*/
@Service
public class ChangePlanService {

  @Autowired
  public ChangePlanService() {}
//
//  /**
//   * 変更計画一覧取得API実行.
//   *
//   * @param messageSource メッセージソース
//   * @param apiContext アプリケーションプロパティ
//   * @param changePlanNameUnitCdStr 変更計画名称(文字列)
//   * @param accessToken アクセストークン
//   * @return 変更計画検索応答＋エラーメッセージ
//   */
//  public GetChangePlanResponseModel getChangePlan(
//      MessageSource messageSource, ApiContext apiContext, String changePlanNameUnitCdStr,
//      String accessToken) {
//
//    var responseModel = new GetChangePlanResponseModel();
//    var messageResourseUtil = new MessageSourceUtil(messageSource);
//
//    // 変更計画検索処理をリクエスト
//    try {
//
//      // リクエストパラメータ設定(Object→文字列)
//      var params = "";
//
//      // URLの生成
//      var url = apiContext.getWso2CommonUrl() + apiContext.getCorporates();
//
//      // リクエストを送信して応答を取得
//      HttpResponse<String> response =
//          ApiUtil.sendMs(url, HttpMethod.GET, changePlanNameUnitCdStr, params, accessToken, params);
//
//      // レスポンス変換（JSON -> Javaオブジェクト）
//      ObjectMapper mapper = new ObjectMapper();
//      responseModel = mapper.readValue(response.body(), GetChangePlanResponseModel.class);
//
//      // 応答コードの確認
//      var code = responseModel.getResult().getCode();
//      if (code != 0) {
//        // エラーメッセージをセット
//        responseModel.getResult().setErrorMessageMap(
//            messageResourseUtil.createGlobalErrorMessageMap("O00001.E020", url, response.body()));
//      }
//    } catch (ConnectException e) {
//      // 通信に失敗時
//      responseModel.setResult(ApiUtil
//          .createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E019"), -10, e));
//    } catch (JsonProcessingException e) {
//      // JSON変換エラー
//      responseModel.setResult(ApiUtil
//          .createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E020"), -20, e));
//    } catch (Exception e) {
//      // 上記以外
//      responseModel.setResult(ApiUtil
//          .createExceptionResponseModel(messageResourseUtil.getMessage("O00001.E020"), -30, e));
//    }
//    return responseModel;
//  }

  /**
   * 変更計画取得API実行.
   *
   * @param requestBodyModel リクエストモデル
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param changePlanNameUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @return 変更計画更新API応答＋エラーメッセージ
   */
  public GetChangePlanRecordsChangePlanNameResmonseModel getChangePlanRecordsChangeplanName(
          String changeplanName,
		  MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

    var responseModel = new GetChangePlanRecordsChangePlanNameResmonseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 変更計画更新処理をリクエスト
    try {
    	String params = "";
    	
    	// URLの生成
    	var url = apiContext.getWso2CommonUrl()
    			+ apiContext.getChangeplansrecordschangeplanname()
					.replace("{changeplanName}", changeplanName);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//            url = "http://localhost:8082/" + apiContext.getChangeplansrecordschangeplanname().replace("{changeplanName}", changeplanName);
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

      // リクエストを送信して応答を取得
      HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.GET, "", params,
		accessToken, ELERAToken, params, userId, passWord , messageSource);
    	
      // 応答コードの確認
      // 応答Bodyなし
      var messageKey = "";
      Object[] args = null;        
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
          messageKey = "O00101.E007";
          responseModel.getResult()
          .setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
        		  response.getResponse().body(), args));
          return responseModel;
      }

      if (response.getResponse().body().length() == 0) {
          // データなし
          responseModel.getResult().setCode(2);
      } else {
			ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);

			// レスポンス変換（JSON -> Javaオブジェクト）
//			responseModel.setResponseModel(mapper.readValue(response.body(), new TypeReference<List<ChangePlanCommonModel>>(){}));
//			if (responseModel.getResponseModel().size() == 0) {
//				// 該当なし
//				responseModel.getResult().setCode(2);
//			}
	        responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), ChangePlanCommonModel.class));
      
      }
      
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E008"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E007"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E007"), -30, e));
    }
    return responseModel;
  }

  
  /**
   * 変更計画保存API実行.
   *
   * @param requestBodyModel リクエストモデル
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param changePlanNameUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @return 変更計画更新API応答＋エラーメッセージ
   */
  public PostChangePlanResponseModel postChangePlan(PostChangePlanRequestModel requestBodyModel,
      MessageSource messageSource, ApiContext apiContext, 
      String accessToken, String ELERAToken, String userId, String passWord) {

    var responseModel = new PostChangePlanResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 変更計画更新処理をリクエスト
    try {

      // リクエストボディ設定(Object→JSON)
      ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
      String json = mapper.writeValueAsString(requestBodyModel);

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getChangePlansRecords();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//      url = "http://localhost:8082/" + apiContext.getChangePlansRecords();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

      // リクエストを送信して応答を取得
      HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
				accessToken, ELERAToken, json, userId, passWord , messageSource);
      
      
      // 応答コードの確認
      // 応答Bodyなし
      var messageKey = "";
      Object[] args = null;        
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
          responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), ChangePlanCommonModel.class));
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


  /**
   * 変更計画更新API実行.
   *
   * @param requestBodyModel リクエストモデル
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param changePlanNameUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @return 変更計画更新API応答＋エラーメッセージ
   */
  public PostChangePlanResponseModel postChangePlanExecute(
          String changePlanNameUnitCdStr,
          MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

    var responseModel = new PostChangePlanResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 変更計画更新処理をリクエスト
    try {
        String json = "";

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getChangePlansExecute() + "/" + changePlanNameUnitCdStr;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//      	  url = "http://localhost:8082/" + apiContext.getChangePlansExecute() + "/" + changePlanNameUnitCdStr;
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

      // リクエストを送信して応答を取得
		HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, changePlanNameUnitCdStr, json,
				accessToken, ELERAToken, json, userId, passWord , messageSource);
      
      
      // 応答コードの確認
      // 応答Bodyなし
      var messageKey = "";
      Object[] args = null;        
      switch (response.getResponse().statusCode()) {
      case 200:
          // 正常
          responseModel.getResult().setCode(0);
          break;
      default:
          responseModel.getResult().setCode(response.getResponse().statusCode());
          messageKey = "O00101.E002";
          responseModel.getResult()
          .setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
        		  response.getResponse().body(), args));
          return responseModel;
      }
      if (response.getResponse().body().length() == 0) {
          // データなし
          responseModel.getResult().setCode(2);
      } else {
          ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
          // レスポンス変換（JSON -> Javaオブジェクト）
          responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), ChangePlanCommonModel.class));
          // 実行が完了するまで待つ
          responseModel = this.waitChangePlanExecute(changePlanNameUnitCdStr,
          		messageSource, apiContext, accessToken, ELERAToken, userId, passWord);
      }
      
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E005"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E002"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E002"), -30, e));
    }
    return responseModel;
  }

  /**
   * 変更計画実行完了待ち.
   *
   * @param requestBodyModel リクエストモデル
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param changePlanNameUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @return 変更計画更新API応答＋エラーメッセージ
   */
  public PostChangePlanResponseModel waitChangePlanExecute(
          String changePlanNameUnitCdStr,
          MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

	var responseModel = new PostChangePlanResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);
    Object[] args = null;        

	// 実行計画がCompleteかErrorとなるまで待つ
    // 現在ミリ秒
    long startSec = new Date().getTime();
    long cycleSec = apiContext.getChangeplansconfirmcyclesec() * 1000;
    long timeoutSec = apiContext.getChangeplansconfirmtimeoutsec() * 1000;

	for (;;) {
		// 実行計画取得
		var changePlanRecordsRes = this.getChangePlanRecordsChangeplanName(
				changePlanNameUnitCdStr,
				messageSource, apiContext, accessToken, ELERAToken, userId, passWord);
		if (changePlanRecordsRes.getResult().getCode() != 0) {
			// 失敗
			int intcode = changePlanRecordsRes.getResult().getCode().intValue();
			responseModel.getResult().setCode(Integer.valueOf(intcode));
			responseModel.getResult()
			.setErrorMessageMap(changePlanRecordsRes.getResult().getErrorMessageMap());
			return responseModel;
		}
	
		if (changePlanRecordsRes.getResponseModel().getStatus().equals("Complete")){
			// 正常終了
			responseModel.getResult().setCode(Integer.valueOf(0));
			break;
		} else if (changePlanRecordsRes.getResponseModel().getStatus().equals("Error")){
			// エラー終了
			responseModel.getResult().setCode(Integer.valueOf(-1));
				var messageKey = "O00101.E009";
				responseModel.getResult().setErrorMessageMap(
				messageResourseUtil.createGlobalErrorMessageMap(messageKey, "", "", args));
				break;
		} else {
			long nowSec = new Date().getTime();
			if (nowSec - startSec >= timeoutSec) {
				// タイムアウト
				responseModel.getResult().setCode(Integer.valueOf(-1));
				var messageKey = "O00101.E010";
				responseModel.getResult().setErrorMessageMap(
						messageResourseUtil.createGlobalErrorMessageMap(messageKey, "", "", args));
				break;
			}
		}
		// 一旦待ち
		try {
			Thread.sleep(cycleSec);
		} catch (InterruptedException e) {
			// システムエラー扱い
			responseModel.getResult().setCode(Integer.valueOf(-1));
					var messageKey = "O00101.E009";
					responseModel.getResult().setErrorMessageMap(
					messageResourseUtil.createGlobalErrorMessageMap(messageKey, "", "", args));
			break;
		}
	}
	return responseModel;
  }

  /**
   * 変更計画削除API実行.
   *
   * @param requestBodyModel リクエストモデル
   * @param messageSource メッセージソース
   * @param apiContext アプリケーションプロパティ
   * @param changePlanNameUnitCdStr 企業コード(文字列)
   * @param accessToken アクセストークン
   * @param ELERAToken ELERAトークン
   * @return 変更計画更新API応答＋エラーメッセージ
   */
  public PostChangePlanResponseModel postChangePlanDelete(
          String changePlanNameUnitCdStr,
          MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

    var responseModel = new PostChangePlanResponseModel();
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // 変更計画更新処理をリクエスト
    try {
        String json = "";

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getChangePlansDelete() + "/" + changePlanNameUnitCdStr;

      // リクエストを送信して応答を取得
      HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "", json,
    		  accessToken, ELERAToken, json, userId, passWord , messageSource);
      
      // 応答コードの確認
      // 応答Bodyなし
      var messageKey = "";
      Object[] args = null;        
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
          messageKey = "O00101.E003";
          responseModel.getResult()
          .setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(messageKey, url,
        		  response.getResponse().body(), args));
          return responseModel;
      }
      if (response.getResponse().body().length() == 0) {
          // データなし
          responseModel.getResult().setCode(2);
      } else {
          ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
          // レスポンス変換（JSON -> Javaオブジェクト）
          responseModel.setResponseModel(mapper.readValue(response.getResponse().body(), ChangePlanCommonModel.class));
      }
      
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E006"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E003"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("O00101.E003"), -30, e));
    }
    return responseModel;
  }


}
