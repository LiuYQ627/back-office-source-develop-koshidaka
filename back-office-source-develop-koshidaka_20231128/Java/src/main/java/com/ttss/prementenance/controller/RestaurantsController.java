// KSD V001.000 AS
package com.ttss.prementenance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ttss.prementenance.model.RestaurantsDeleteResponseModel;
import com.ttss.prementenance.model.RestaurantsMasterFscpRegisterRequestModel;
import com.ttss.prementenance.model.RestaurantsQueryRequestParamModel;
import com.ttss.prementenance.model.RestaurantsUpdateResponseModel;
import com.ttss.prementenance.request.PostRestaurantsSetToolDbSelectRequest;
import com.ttss.prementenance.request.RestaurantsMasterFscpRequest;
import com.ttss.prementenance.response.DeleteRestaurantResponseModel;
import com.ttss.prementenance.response.PostRestaurantsMasterFscpDataResponse;
import com.ttss.prementenance.response.PostRestaurantsMasterFscpDataResponseUpd;
import com.ttss.prementenance.response.PostRestaurantsSetToolDbSelectResponse;
import com.ttss.prementenance.service.RestaurantsService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * 飲食オーダーガイダンス設定
 *
 * @author P.J.Abella(AWS)
 * @version 1.0.0
 */
@RestController
public class RestaurantsController {

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ApiContext apiContext;

	@Autowired
	private SessionUtil sessionUtil;

	@Autowired
	private RestaurantsService restaurantsService;

	public RestaurantsController(){}

	/**
	 * SCPマスタのデータ取得処理.
	 *
	 * @param model リクエスト内容[nodeId,scpNo]
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@PostMapping("/RestaurantsMcFscp/Query")
	public PostRestaurantsMasterFscpDataResponse RestaurantMasterFscpQuery(
		@RequestBody @Validated Map<String, Object> model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

		var responseModel = new PostRestaurantsMasterFscpDataResponse();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId").toString();
			model.get("ScpNo").toString();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var paramReq = new RestaurantsQueryRequestParamModel();
		paramReq.setOrderBy(model.get("orderBy").toString());
		paramReq.setAscending((boolean)model.get("ascending"));
		paramReq.setStartIndex((Integer)model.get("startIndex"));
		paramReq.setBatchSize(((Integer) model.get("batchSize")).longValue());

		var bodyReq = new RestaurantsMasterFscpRequest();
		List<String> nodeIdList = new ArrayList<String>();
		nodeIdList.add(model.get("nodeId").toString());
		bodyReq.setNodeId(nodeIdList);

		List<Integer> ScpList = new ArrayList<Integer>();
// KSD V001.000 20230901 DS
//		ScpList.add(Integer.parseInt(model.get("ScpNo").toString()));
//		bodyReq.setScpNo(ScpList);
// KSD V001.000 20230901 DE
// KSD V001.000 20230901 AS
		if( (Integer)model.get("ScpNo") == 0 )
		{
			bodyReq.setScpNo(ScpList);
		}
		else {
			ScpList.add(Integer.parseInt(model.get("ScpNo").toString()));
			bodyReq.setScpNo(ScpList);
		}
// KSD V001.000 20230901 AE
		responseModel = restaurantsService.RestaurantsMcFscp(
			paramReq, bodyReq, messageSource, apiContext, accessToken, ELERAToken, 
			loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

// KSD V001.000 20230921 AS
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
// KSD V001.000 20230921 AE

		return responseModel;

	}

	/**
	 * SCPマスタのデータ登録/更新処理
	 *
	 * @param model リクエスト内容[nodeId,scpNo]
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@PostMapping("/RestaurantsMcFscp/Update")
// KSD V001.000 20230905 DS
//	public PostRestaurantsMasterFscpDataResponse RestaurantMasterFscpUpdate(
// KSD V001.000 20230905 DE
// KSD V001.000 20230905 AS
	public PostRestaurantsMasterFscpDataResponseUpd RestaurantMasterFscpUpdate(
// KSD V001.000 20230905 AE
		@RequestBody @Validated Map<String, Object> model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

// KSD V001.000 20230905 DS
//		var responseModel = new PostRestaurantsMasterFscpDataResponse();
// KSD V001.000 20230905 DE
// KSD V001.000 20230905 AS
		var responseModel = new PostRestaurantsMasterFscpDataResponseUpd();
// KSD V001.000 20230905 AE

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId").toString();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		var reqModel = new RestaurantsMasterFscpRegisterRequestModel();
		reqModel.setRequestModel(model);

		responseModel = restaurantsService.RestaurantsMcFscpUpdate(
			reqModel, messageSource, apiContext, accessToken, ELERAToken, 
			loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

// KSD V001.000 20230921 AS
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
// KSD V001.000 20230921 AE

		return responseModel;
	}

	/**
	 * SCPマスタのデータ削除処理
	 *
	 * @param model リクエスト内容[nodeId,scpNo]
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@PostMapping("/RestaurantsMcFscp/Delete")
	public DeleteRestaurantResponseModel RestaurantMasterFscpDelete(
		@RequestBody @Validated  Map<String, Object> model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

		var responseModel = new DeleteRestaurantResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId");
			model.get("ScpNo");
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		String nodeId = model.get("nodeId").toString();
		Integer scpNo = (Integer) model.get("ScpNo");

		responseModel = restaurantsService.RestaurantsMcFscpDelete(nodeId,
			scpNo, messageSource, apiContext, accessToken, ELERAToken, 
			loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

// KSD V001.000 20230921 AS
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
// KSD V001.000 20230921 AE

		return responseModel;
	}

	/**
	 * メニューマスタのデータ取得処理.
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@PostMapping("/RestaurantsSetTool/DbSelect")
	public PostRestaurantsSetToolDbSelectResponse RestaurantSetToolDbSelect(
		@RequestBody @Validated PostRestaurantsSetToolDbSelectRequest model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

		var responseModel = new PostRestaurantsSetToolDbSelectResponse();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		responseModel = restaurantsService.RestaurantSetToolDbSelect(model, messageSource, apiContext, accessToken, ELERAToken, 
			loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

// KSD V001.000 20230921 AS
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
// KSD V001.000 20230921 AE

		return responseModel;
	}

// KSD V001.000 20230921 AS
	/**
	 * メニューマスタ　更新処理
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@PostMapping("/Restaurants/mc_fumenu")
	public RestaurantsUpdateResponseModel RestaurantMcFumenu(
		@RequestBody @Validated  Map<String, Object> model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

		var responseModel = new RestaurantsUpdateResponseModel();

		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId");
			model.get("Code");
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsMcFumenuUpdate(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
// KSD V001.000 20230921 AE

// KSD V001.000 20231023 AS
	/**
	 * メニューマスタ　削除処理
	 *
	 * @param model リクエスト内容
	 * @param errors バリデーションエラー内容
	 * @param request HttpServletのリクエスト(FWが自動で設定)
	 * @return 検索処理＋レスポンス
	 */
	@DeleteMapping("/Restaurants/mc_fumenuDelete")
	public RestaurantsDeleteResponseModel RestaurantMcFumenuDelete(
		@RequestBody @Validated  Map<String, Object> model, 
		Errors errors, HttpServletRequest request, HttpServletResponse response){

		var responseModel = new RestaurantsDeleteResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		// バリデーション確認
		if (errors.hasErrors()) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		//フィールド確認
		try {
			model.get("nodeId");
			model.get("Code");
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}
		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		String nodeId = model.get("nodeId").toString();
		String code   = model.get("Code").toString();
		//Body部
		////////////////////////////////
		// DELETE要求
		////////////////////////////////
		responseModel = restaurantsService.RestaurantsMcFumenuDelete(nodeId, code,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

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
// KSD V001.000 20231023 AE

}
// KSD V001.000 AE
