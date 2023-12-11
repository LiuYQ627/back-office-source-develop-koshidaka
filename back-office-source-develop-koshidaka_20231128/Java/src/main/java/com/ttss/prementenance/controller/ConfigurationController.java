package com.ttss.prementenance.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.GetConfigurationsNodesListRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesListResponseModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdRequestModel;
import com.ttss.prementenance.model.GetConfigurationsNodesNodeIdResponseModel;
import com.ttss.prementenance.request.ConfigurationNodeRequest;
import com.ttss.prementenance.service.ConfigurationsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;
/*
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20230317 dingxin(Neusoft)   G001.00.0  issue課題#1718を対応します.
 */
@RestController
@RequestMapping("Configuration")
public class ConfigurationController {
	@Autowired
    private ConfigurationsService configurationsService;
	
	@Autowired
    private MessageSource messageSource;

    @Autowired
    private ApiContext apiContext;

    @Autowired
    private SessionUtil sessionUtil;
    
    @CrossOrigin
	@GetMapping("/NodesList")
	@ResponseBody
	public GetConfigurationsNodesListResponseModel getNodeList(
			GetConfigurationsNodesListRequestModel model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {
    	// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End

		GetConfigurationsNodesListResponseModel responseModel =
                new GetConfigurationsNodesListResponseModel();
        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            // GetConfigurationsNodesNodeIdResponseModel responseModel = new
            // GetConfigurationsNodesNodeIdResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            // GetConfigurationsNodesNodeIdResponseModel responseModel = new
            // GetConfigurationsNodesNodeIdResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }
        
        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();
        
        responseModel = configurationsService.getNodesList(model, messageSource,
                apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
                loginUser.getPassWord());

        return responseModel;
	}

	@CrossOrigin
	@GetMapping("/NodeDetail")
	@ResponseBody
	public GetConfigurationsNodesNodeIdResponseModel getPresetCatalogDetails(
			@Validated ConfigurationNodeRequest model,
			Errors errors, HttpServletRequest request, HttpServletResponse response) {
		// G001.00.0 Delete-Start
		//System.out.println(model);
		// G001.00.0 Delete-End

		GetConfigurationsNodesNodeIdResponseModel responseModel =
                new GetConfigurationsNodesNodeIdResponseModel();
        var loginUser = this.sessionUtil.getActiveLoginUser(request);
        if (loginUser == null) {
            // GetConfigurationsNodesNodeIdResponseModel responseModel = new
            // GetConfigurationsNodesNodeIdResponseModel();
            responseModel.setResult(ApiUtil.getSessionError());
            return responseModel;
        }

        if (errors.hasErrors()) {
            // バリデーションエラー時
            // GetConfigurationsNodesNodeIdResponseModel responseModel = new
            // GetConfigurationsNodesNodeIdResponseModel();
            responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
            return responseModel;
        }
        
        var requestModel = new GetConfigurationsNodesNodeIdRequestModel();
        String accessToken = loginUser.getWso2ApiToken();
        String ELERAToken = loginUser.getELERAToken();
        
        // 仮のデータ
        var nodeId = "000000000000001000001";
        // 正常時
        // 企業マスタ検索
        // return configurationsService.getNodesNodeId(requestModel, nodeId, messageSource,
        // apiContext,accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
        responseModel = configurationsService.getNodesNodeId(requestModel, nodeId, messageSource,
                apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
                loginUser.getPassWord());
        
        return responseModel;
	}
}
