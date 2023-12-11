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

import com.ttss.prementenance.model.PostStoreMasterCopyRequestModel;
import com.ttss.prementenance.model.PostStoreMasterCopyResponseModel;
import com.ttss.prementenance.service.DataManagementService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * データ管理コントローラー&API
 * @author N.G.Gordo(AWS)
 * @version 1.0.0
 */
@RestController
@RequestMapping("DataManagements")
public class DataManagementController {

	public DataManagementController() {

	}

	@Autowired
	public DataManagementService dataManagementService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;
	
	@Autowired
	private SessionUtil sessionUtil;

	/**
	 * 店舗マスタコピー処理
	 * @param requestModel リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト
	 * @param response HttpServletのレスポンス
	 * @return 応答モデル
	 */
	@CrossOrigin
	@PostMapping("/CopyStoreMaster")
	@ResponseBody
	public PostStoreMasterCopyResponseModel postStoreMasterCopy(
			@RequestBody @Validated PostStoreMasterCopyRequestModel requestModel, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new PostStoreMasterCopyResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		if (errors.hasErrors()) {
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

// KSD V001.000 20231108 DS
//		responseModel = dataManagementService.copyStoreMaster(
//			requestModel, messageSource, apiContext,
//			accessToken, ELERAToken,
//			loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20231108 DE
// KSD V001.000 20231108 AS
		responseModel = dataManagementService.copyStoreMaster(
				requestModel, messageSource, apiContext,
				accessToken, ELERAToken,
				loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20231108 AS
			
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

		return responseModel;
	}

}
// KSD V001.000 AE
