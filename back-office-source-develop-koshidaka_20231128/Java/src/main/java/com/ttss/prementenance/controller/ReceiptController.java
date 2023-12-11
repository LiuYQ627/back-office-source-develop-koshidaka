/*
 * ---------+---------------------+----------+--------------------------------
 *  DATE    |NAME(Inc)            |GUIDE     |GUIDANCE
 * ---------+---------------------+----------+--------------------------------
 * 20230203  wangchunmei(Neusoft)  G001.00.0  issue課題#836を対応します.
 */

package com.ttss.prementenance.controller;

import com.ttss.prementenance.model.FetchReceiptDetailResponseModel;
import com.ttss.prementenance.model.GetReceiptDetailRequestModel;
import com.ttss.prementenance.request.ReceiptListRequest;
import com.ttss.prementenance.response.ReceiptListResponse;
import com.ttss.prementenance.service.ReceiptService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * レシート設定画面API.
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("Receipt")
public class ReceiptController {

	@Autowired
	private ReceiptService receiptService;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	public ReceiptController() {
	}

	/**
	 * レシート詳細取得API.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/FetchReceiptDetail")
	@ResponseBody
	public FetchReceiptDetailResponseModel fetchReceiptDetail(
			@RequestBody @Validated GetReceiptDetailRequestModel model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var receiptDetailRes = receiptService.getReceiptDetail(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (receiptDetailRes.getResult().getWSO2Token() != null
				&& receiptDetailRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(receiptDetailRes.getResult().getWSO2Token());
			loginUser.setELERAToken(receiptDetailRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return receiptDetailRes;
	}

	/**
	 * レシート詳細更新API.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PutMapping("/UpdateReceiptDetail")
	@ResponseBody
	public FetchReceiptDetailResponseModel updateReceiptDetail(
			@RequestBody @Validated Map<String, Object> model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		// G001.00.0 Add-Start
		Object headerLogoBase64EncodedString = model.get("headerLogoBase64EncodedString");
		if(headerLogoBase64EncodedString != null && !StringUtils.isEmpty(headerLogoBase64EncodedString.toString())){
			String hashVal = receiptService.getHashValue(headerLogoBase64EncodedString.toString());
			model.put("headerLogoHashValue", hashVal);
		}
		// G001.00.0 Add-End
		// KSD V001.000 AS
		Object footerLogoBase64EncodedString = model.get("footerLogoBase64EncodedString");
		if(footerLogoBase64EncodedString != null && !StringUtils.isEmpty(headerLogoBase64EncodedString.toString())){
			String hashVal = receiptService.getHashValue(footerLogoBase64EncodedString.toString());
			model.put("footerLogoHashValue", hashVal);
		}
		
		Object revenueStampLogoBase64EncodedString = model.get("revenueStampLogoBase64EncodedString");
		if(revenueStampLogoBase64EncodedString != null && !StringUtils.isEmpty(revenueStampLogoBase64EncodedString.toString())){
			String hashVal = receiptService.getHashValue(revenueStampLogoBase64EncodedString.toString());
			model.put("revenueStampLogoHashValue", hashVal);
		}
		// KSD V001.000 AE
		var receiptDetailRes = receiptService.updateReceiptDetail(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (receiptDetailRes.getResult().getWSO2Token() != null
				&& receiptDetailRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(receiptDetailRes.getResult().getWSO2Token());
			loginUser.setELERAToken(receiptDetailRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return receiptDetailRes;
	}

	@CrossOrigin
	@GetMapping("/FetchReceiptList")
	@ResponseBody
	public ReceiptListResponse fetchReceiptList(
			@Validated ReceiptListRequest model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {
		var responseModel = new ReceiptListResponse();
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

		responseModel = receiptService.getReceiptList(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

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

	// G001.00.0 Add-Start
	/**
	 * レシート削除API.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 端末管理マスタ取得＋αレスポンス
	 */
	@CrossOrigin
	@PostMapping("/DestroyReceiptDetail")
	@ResponseBody
	public FetchReceiptDetailResponseModel destroyReceiptDetail(
			@RequestBody @Validated Map<String, Object> model, Errors errors,
			HttpServletRequest request, HttpServletResponse response) {

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}

		if (errors.hasErrors()) {
			// バリデーションエラー時
			var responseModel = new FetchReceiptDetailResponseModel();
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var receiptDetailRes = receiptService.destroyReceiptDetail(model, messageSource, apiContext,
				accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(),
				loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (receiptDetailRes.getResult().getWSO2Token() != null
				&& receiptDetailRes.getResult().getELERAToken() != null) {

			loginUser.setWso2ApiToken(receiptDetailRes.getResult().getWSO2Token());
			loginUser.setELERAToken(receiptDetailRes.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}

		return receiptDetailRes;
	}
	// G001.00.0 Add-End
}