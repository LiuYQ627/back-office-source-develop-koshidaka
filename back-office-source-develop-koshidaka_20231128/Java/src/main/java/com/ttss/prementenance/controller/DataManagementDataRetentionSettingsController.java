// KSD V001.000 AS
package com.ttss.prementenance.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.GetDataRetentionSettingsModel;
import com.ttss.prementenance.model.UpdateDataRetentionSettingsModel;
import com.ttss.prementenance.request.GetDataRetentionSettingsRequestModel;
import com.ttss.prementenance.response.DataRetentionSettingsResponseModel;
import com.ttss.prementenance.response.GetDataRetentionSettingsResponseModel;
import com.ttss.prementenance.service.DataManagementService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * データ保持設定画面
 * 
 * @author P.J.Abella (AWS)
 * @version 1.0.0
 */
@RestController
@RequestMapping("DataManagement/DataRetentionSettings")
public class DataManagementDataRetentionSettingsController {
    
    @Autowired
    private MessageSource messageSource;

    @Autowired
    private ApiContext apiContext;

    @Autowired
    private SessionUtil sessionUtil;

    @Autowired
    private DataManagementService dataMgmtservice;    

    public DataManagementDataRetentionSettingsController() {

    }
    
    /**
     * データ保持設定情報
     * @param errors　バリデーションエラー内容
     * @param request HttpServletのリクエスト(FWが自動で設定)
     * @param response　HttpServletのレスポンス(FWが自動で設定)
     * @return　データ保持設定情報
     */
    @CrossOrigin
    @PostMapping("/Query")
    @ResponseBody
    public GetDataRetentionSettingsResponseModel getMaintainData(
        @RequestBody GetDataRetentionSettingsModel model,
        Errors errors, HttpServletRequest request, HttpServletResponse response){
        
        var responseModel = new GetDataRetentionSettingsResponseModel();
        var loginUser = this.sessionUtil.getActiveLoginUser(request);

        if (loginUser == null) {
            // バリデーションエラー時
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        var dataMgmtReqModel = new GetDataRetentionSettingsRequestModel();

        dataMgmtReqModel.setGroupName(model.getGroupName());

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // データ保持設定情報検索
// KSD V001.000 20231108 DS
//      responseModel = dataMgmtservice.getMaintainData(
//          dataMgmtReqModel, messageSource, apiContext, accessToken,
//          ELERAToken, loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20231108 DE
// KSD V001.000 20231108 AS
        responseModel = dataMgmtservice.getMaintainData(
            dataMgmtReqModel, messageSource, apiContext, accessToken,
            ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
  		// セッションのトークン情報の上書き
  		if (responseModel.getResult().getWSO2Token() != null
  				&& responseModel.getResult().getELERAToken() != null) {
  			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
  			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
  			// ユーザ情報をセッション管理用リポジトリに追加
  			var sessionId = sessionUtil.saveUserToRepository(loginUser);
  			// レスポンスのヘッダーにセッションID用のCookieをセットする
  			response = sessionUtil.setCookie(response, sessionId);
  		}
// KSD V001.000 20231108 AE

        return responseModel;
    }

    /**
     * データ保持設定情報更新
     * @param requestModel　データ保持設定情報
     * @param errors　バリデーションエラー内容
     * @param request　HttpServletのリクエスト(FWが自動で設定)
     * @param response　HttpServletのレスポンス(FWが自動で設定)
     * @return　データ保持設定情報
     */
    @CrossOrigin
    @PostMapping("/Update")
    @ResponseBody
    public DataRetentionSettingsResponseModel updateMaintainData(
        @RequestBody @Validated UpdateDataRetentionSettingsModel requestModel, 
        Errors errors, HttpServletRequest request, HttpServletResponse response){

        var responseModel = new DataRetentionSettingsResponseModel();
        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        
        if (loginUser == null) {
            // バリデーションエラー時
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();

        // データ保持設定情報更新
// KSD V001.000 20231108 DS
//      responseModel = dataMgmtservice.updateMaintainData(requestModel,
//          messageSource, apiContext, accessToken, ELERAToken, 
//          loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20231108 DE
// KSD V001.000 20231108 AS
        responseModel = dataMgmtservice.updateMaintainData(requestModel,
            messageSource, apiContext, accessToken, ELERAToken, 
            loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
  		// セッションのトークン情報の上書き
   		if (responseModel.getResult().getWSO2Token() != null
   				&& responseModel.getResult().getELERAToken() != null) {
   			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
   			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
   			// ユーザ情報をセッション管理用リポジトリに追加
   			var sessionId = sessionUtil.saveUserToRepository(loginUser);
   			// レスポンスのヘッダーにセッションID用のCookieをセットする
   			response = sessionUtil.setCookie(response, sessionId);
   		}
// KSD V001.000 20231108 AE

        return responseModel;
    }

}
// KSD V001.000 AE
