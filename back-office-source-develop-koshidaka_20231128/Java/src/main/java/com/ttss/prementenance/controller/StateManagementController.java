package com.ttss.prementenance.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.EndpointStatusStatusResponseModel;
import com.ttss.prementenance.model.GetDevicesStatusQueryRequestModel;
import com.ttss.prementenance.model.GetDevicesStatusQueryResponseModel;
import com.ttss.prementenance.model.GetEndpointStatusStatusRequestModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestBodyModel;
import com.ttss.prementenance.model.PostDevicesQueryRequestParamModel;
import com.ttss.prementenance.service.DevicesService;
import com.ttss.prementenance.service.EndpointStatusService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.MessageSourceUtil;
import com.ttss.prementenance.utils.SessionUtil;

// ==============================================================================
// 機能概要：状態管理画面&API
// 作成者：
// 作成年月日：2021/12/01
// 備考：
// ==============================================================================

/**
 * 状態管理画面&API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("StateManagement")
public class StateManagementController {

  @Autowired
  private DevicesService devicesService;

  @Autowired
  private EndpointStatusService endpointStatusService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public StateManagementController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * 端末状態取得処理.
   *
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return ユーザマスタ検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/DevicesStatusQuery")
  @ResponseBody
  public GetDevicesStatusQueryResponseModel devicesStatusQuery(@Validated GetDevicesStatusQueryRequestModel model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new GetDevicesStatusQueryResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
		responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		// 正常時
		// デバイス情報照会
		var  paramReq = new PostDevicesQueryRequestParamModel();
		var  bodyReq = new PostDevicesQueryRequestBodyModel();

		if (model.getNodeId() != null) {
			var nodeIdList = new ArrayList<String>();
			nodeIdList.add(model.getNodeId());
			bodyReq.getRequestModel().getKeys().setNodeId(nodeIdList);
		}
		paramReq.getRequestModel().setOrderBy("name");
		paramReq.getRequestModel().setAscending(true);
		paramReq.getRequestModel().setStartIndex(0);
		// CS #1358
		//paramReq.getRequestModel().setBatchSize(Long.valueOf(10));
		paramReq.getRequestModel().setBatchSize(Long.valueOf(0));
		// CE #1358
		var deviceQueryRes = devicesService.postDevicesQuery(paramReq, bodyReq,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
  	    // トークン情報の上書き
  	    if (deviceQueryRes.getResult().getWSO2Token() != null
  	    		&& deviceQueryRes.getResult().getELERAToken() != null) {
		    accessToken = deviceQueryRes.getResult().getWSO2Token();
		    ELERAToken = deviceQueryRes.getResult().getELERAToken();
  	    }
		
        if (deviceQueryRes.getResult().getCode() != 0) {
            int intcode = deviceQueryRes.getResult().getCode().intValue();
            responseModel.getResult().setCode(Integer.valueOf(intcode));
            responseModel.getResult()
                .setErrorMessageMap(deviceQueryRes.getResult().getErrorMessageMap());
            return responseModel;
        }

		var messageResourseUtil = new MessageSourceUtil(messageSource);
        responseModel.setResponseModel(new ArrayList<EndpointStatusStatusResponseModel>());
        var deviceList = deviceQueryRes.getResponseModel();
        for (int i = 0; i < deviceList.size(); i++) {
        	var endpointStatusReq = new GetEndpointStatusStatusRequestModel();
        	
//        	endpointStatusReq.getRequestModel().setDeviceId(deviceList.get(i).getEndpointId());
        	endpointStatusReq.getRequestModel().setDeviceId(deviceList.get(i).getName());
        	// エンドポイント状態の照会
        	var endpointStatusRes = endpointStatusService.getEndpointStatus(endpointStatusReq,
        					messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
        	
      	    // トークン情報の上書き
      	    if (endpointStatusRes.getResult().getWSO2Token() != null
      	    		&& endpointStatusRes.getResult().getELERAToken() != null) {
  			    accessToken = endpointStatusRes.getResult().getWSO2Token();
  			    ELERAToken = endpointStatusRes.getResult().getELERAToken();
      	    }
        	
            if (endpointStatusRes.getResult().getCode() != 0) {
                int intcode = endpointStatusRes.getResult().getCode().intValue();
                responseModel.getResult().setCode(Integer.valueOf(intcode));
                responseModel.getResult()
                    .setErrorMessageMap(endpointStatusRes.getResult().getErrorMessageMap());
                return responseModel;
            }
        	
        	// 取れたので蓄積する
            // 現在の状態（未稼働、サインオン前、アイドル中、商品登録中）
            // [terminationState, afterStarting, idleState, registering]
            var sts = "";
            if (endpointStatusRes.getResponseModel().getEndpointStatus() == null) {
            } else if (endpointStatusRes.getResponseModel().getEndpointStatus().getStatus() == null) {
            } else {
                sts = endpointStatusRes.getResponseModel().getEndpointStatus().getStatus();
            }
            if (sts.equals("terminationState")) {
            	endpointStatusRes.getResponseModel().getEndpointStatus().setStatus(messageResourseUtil.getMessage("F00107.S001"));
            } else if (sts.equals("afterStarting")) {
            	endpointStatusRes.getResponseModel().getEndpointStatus().setStatus(messageResourseUtil.getMessage("F00107.S002"));
            } else if (sts.equals("idleState")) {
            	endpointStatusRes.getResponseModel().getEndpointStatus().setStatus(messageResourseUtil.getMessage("F00107.S003"));
            } else if (sts.equals("registering")) {
            	endpointStatusRes.getResponseModel().getEndpointStatus().setStatus(messageResourseUtil.getMessage("F00107.S004"));
            } else {
            	// 未稼働にしておく
            	endpointStatusRes.getResponseModel().getEndpointStatus().setStatus(messageResourseUtil.getMessage("F00107.S001"));
            }
			responseModel.getResponseModel().add(endpointStatusRes.getResponseModel());
        }

  	    // セッションのトークン情報の上書き
  	    if (accessToken != null && ELERAToken != null) {
	  	    loginUser.setWso2ApiToken(accessToken);
	  	    loginUser.setELERAToken(ELERAToken);
	        // ユーザ情報をセッション管理用リポジトリに追加
	        var sessionId = sessionUtil.saveUserToRepository(loginUser);
	        // レスポンスのヘッダーにセッションID用のCookieをセットする
	        response = sessionUtil.setCookie(response, sessionId);  
  	    }
        
        responseModel.getResult().setCode(Integer.valueOf(0));
		return responseModel;
  }

}
