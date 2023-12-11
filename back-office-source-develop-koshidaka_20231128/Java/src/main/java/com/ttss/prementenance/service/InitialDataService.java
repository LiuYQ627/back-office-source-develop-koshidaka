//KSD V001.000 20231024 AS

package com.ttss.prementenance.service;

import java.net.ConnectException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PutStoreResponseModel;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;


/**
* 店舗マスタ 
*
* @author
* @version 1.0.0
*/
@Service
public class InitialDataService {

  @Autowired
  public InitialDataService() {}

  /**
   * 初期データ投入API
   *
   * @param nodeId ノードID(文字列)
   */
  public PutStoreResponseModel postInitialData(
          String nodeId,
          MessageSource messageSource, ApiContext apiContext, String accessToken, String ELERAToken, String userId, String passWord) {

    var responseModel = new PutStoreResponseModel();
	responseModel.setResult(new ApiCommonResponseModel());
    var messageResourseUtil = new MessageSourceUtil(messageSource);

    // リクエスト
    try {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("nodeId", nodeId);

		// リクエストボディ設定(Object→JSON)
		ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
		String json = mapper.writeValueAsString(model);

      // URLの生成
      var url = apiContext.getWso2CommonUrl() + apiContext.getEntryinitialdata();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
//    url = "http://localhost:8082/" + apiContext.getEntryinitialdata();
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

      // リクエストを送信して応答を取得
		HttpResponseExtentionModel response = ApiUtil.sendMsExtension(url, HttpMethod.POST, "",
				json, accessToken, ELERAToken, json, userId, passWord , messageSource);
      
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
          messageKey = "F00003.E008";
          responseModel.getResult().setErrorMessageMap(messageResourseUtil.createGlobalErrorMessageMap(
        		  messageKey, url, response.getResponse().body(), args));
          return responseModel;
      }
    } catch (ConnectException e) {
      // 通信に失敗時
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("F00003.E007"), -10, e));
    } catch (JsonProcessingException e) {
      // JSON変換エラー
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("F00003.E008"), -20, e));
    } catch (Exception e) {
      // 上記以外
      responseModel.setResult(ApiUtil
          .createExceptionResponseModel(messageResourseUtil.getMessage("F00003.E008"), -30, e));
    }
    return responseModel;
  }

}
//KSD V001.000 20231024 AE
