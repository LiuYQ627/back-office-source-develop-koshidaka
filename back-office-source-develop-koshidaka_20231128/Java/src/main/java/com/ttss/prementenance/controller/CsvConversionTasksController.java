// KSD V001.000 20230907 AS
package com.ttss.prementenance.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttss.prementenance.model.CsvConversionCatalogsGroupAttributesModel;
import com.ttss.prementenance.model.CsvConversionCatalogsGroupModel;
import com.ttss.prementenance.model.CsvConversionCatalogsItemsAttributesModel;
import com.ttss.prementenance.model.CsvConversionCatalogsItemsModel;
import com.ttss.prementenance.model.CsvConversionCommonResponseModel;
import com.ttss.prementenance.model.CsvConversionPermissionsRolesModel;
import com.ttss.prementenance.service.CsvConversionTasksService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * CsvConversionTasks 
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("CsvConversionTasks")
public class CsvConversionTasksController {

  @Autowired
  private CsvConversionTasksService CsvConversionTasksService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public CsvConversionTasksController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * ファイルの入力(IMPORT)
   * 商品マスタ登録/商品構成マスタ登録/アクセス権限登録
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Import")
  @ResponseBody
  public CsvConversionCommonResponseModel CsvConversionImport(
		  @RequestParam("file") MultipartFile multipartFile,
		  HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new CsvConversionCommonResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String json = "";
		ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
		try {

			/////////////////////////////////////////////////////////////////////
			// taskの新規作成・更新
			/////////////////////////////////////////////////////////////////////
			//業務別処理
			String targetCollection = request.getParameter("targetCollection").toString();
			
			//アクセス権限
			if (targetCollection.equals("PERMISSIONS_ROLES"))
			{
				CsvConversionPermissionsRolesModel permissionsRolesModel = new CsvConversionPermissionsRolesModel();
				//企業ｺｰﾄﾞ(15桁)
				String strCompanyCode = request.getParameter("companyCode");
				permissionsRolesModel.setNodeId(strCompanyCode);
				//処理=IMPORT
				permissionsRolesModel.setProcessingType("IMPORT");
				//業務=PERMISSIONS_ROLES
				permissionsRolesModel.setTargetCollection(targetCollection);
				//Object→JSON 変換
				json = mapper.writeValueAsString(permissionsRolesModel);
			}
			//商品構成マスタ
			else if (targetCollection.equals("CATALOGS_GROUPS"))
			{
				CsvConversionCatalogsGroupModel CatalogsGroupModel = new CsvConversionCatalogsGroupModel();
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6桁)
				String strCompanyCode = request.getParameter("companyCode");
				String strStoreCode = request.getParameter("storeCode");
				Integer intProductClassificationNumber = request.getParameter("productClassificationNumber").hashCode();
				
				//企業ｺｰﾄﾞ(15桁)
				CatalogsGroupModel.setNodeId(strCompanyCode+strStoreCode);
				//処理=IMPORT
				CatalogsGroupModel.setProcessingType("IMPORT");
				//業務=CATALOGS_GROUPS
				CatalogsGroupModel.setTargetCollection(targetCollection);
				//attributes
				CsvConversionCatalogsGroupAttributesModel attributes = new CsvConversionCatalogsGroupAttributesModel();
				//企業ｺｰﾄﾞ(15桁)
				attributes.setCompanyCode(strCompanyCode);
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setCatalogName(strCompanyCode+strStoreCode);
				//商品区分(1-8)
				attributes.setProductClassificationNumber(intProductClassificationNumber);
				//attributesにセット
				CatalogsGroupModel.setAttributes(attributes);
				//Object→JSON 変換
				json = mapper.writeValueAsString(CatalogsGroupModel);
			}
			//商品マスタ
			else if (targetCollection.equals("CATALOGS_ITEMS"))
			{
				CsvConversionCatalogsItemsModel CatalogsItemsModel = new CsvConversionCatalogsItemsModel();
				String strCompanyCode = request.getParameter("companyCode");
				String strStoreCode = request.getParameter("storeCode");
				
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6桁)
				CatalogsItemsModel.setNodeId(strCompanyCode+strStoreCode);
				//処理=IMPORT
				CatalogsItemsModel.setProcessingType("IMPORT");
				//業務=CATALOGS_ITEMS
				CatalogsItemsModel.setTargetCollection(targetCollection);
				//attributes
				CsvConversionCatalogsItemsAttributesModel attributes = new CsvConversionCatalogsItemsAttributesModel();
				//企業ｺｰﾄﾞ(15桁)
				attributes.setCompanyCode(strCompanyCode);
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setCatalogName(strCompanyCode+strStoreCode);
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setPriceListName(strCompanyCode+strStoreCode);
				//attributesにセット
				CatalogsItemsModel.setAttributes(attributes);
				//Object→JSON 変換
				json = mapper.writeValueAsString(CatalogsItemsModel);
			}
			//その他はエラー
			else
			{
				responseModel.getResult().setCode(-99);
				return responseModel;
			}
		} catch (Exception e) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}

		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		// POST要求
		responseModel = CsvConversionTasksService.CsvConversionEntrySub(json,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null &&
			responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		/////////////////////////////////////////////////////////////////////
		// ファイルの送信
		/////////////////////////////////////////////////////////////////////
		if(responseModel.getResult().getCode()!=0) {
			return responseModel;
		}
		String taskId = "";
		try {
			taskId = responseModel.getResponseModel().get("id").toString();;
		} catch (Exception e) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		
		// ログイン情報
		accessToken = loginUser.getWso2ApiToken();
		ELERAToken = loginUser.getELERAToken();
		// POST要求
		responseModel = CsvConversionTasksService.CsvConversionSendSub(multipartFile, taskId,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
		/////////////////////////////////////////////////////////////////////
		// taskの実行開始(IMPORT開始)
		/////////////////////////////////////////////////////////////////////
		if(responseModel.getResult().getCode()!=0) {
			return responseModel;
		}
		// ログイン情報
		accessToken = loginUser.getWso2ApiToken();
		ELERAToken = loginUser.getELERAToken();
		// POST要求
		responseModel = CsvConversionTasksService.CsvConversionExecuteSub(taskId,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null &&
			responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		
//KOSHIDAKA debug	ST
//		Map<String, Object> model = new HashMap<String, Object>();
//		taskId = responseModel.getResponseModel().get("id").toString();;
//		model.put("taskId", taskId);
//		responseModel = CsvConversionTasksService.CsvConversionGetSub(model,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//KOSHIDAKA debug	ED

		return responseModel;
  }
  /**
   * ファイルの出力(EXPORT)
   * 商品マスタ登録/商品構成マスタ登録/アクセス権限登録
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Export")
  @ResponseBody
  public CsvConversionCommonResponseModel CsvConversionExport(
		  @RequestBody @Validated Map<String, Object> model,
		  HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new CsvConversionCommonResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		String json = "";
		ObjectMapper mapper = new ObjectMapper().setSerializationInclusion(Include.NON_NULL);
		try {

			/////////////////////////////////////////////////////////////////////
			// taskの新規作成・更新
			/////////////////////////////////////////////////////////////////////
			//業務別処理
			String targetCollection = model.get("targetCollection").toString();
			
			//アクセス権限
			if (targetCollection.equals("PERMISSIONS_ROLES"))
			{
				CsvConversionPermissionsRolesModel permissionsRolesModel = new CsvConversionPermissionsRolesModel();
				//企業ｺｰﾄﾞ(15桁)
				String strCompanyCode = model.get("companyCode").toString();
				permissionsRolesModel.setNodeId(strCompanyCode);
				//処理=EXPORT
				permissionsRolesModel.setProcessingType("EXPORT");
				//業務=PERMISSIONS_ROLES
				permissionsRolesModel.setTargetCollection(targetCollection);
				//Object→JSON 変換
				json = mapper.writeValueAsString(permissionsRolesModel);
			}
			//商品構成マスタ
			else if (targetCollection.equals("CATALOGS_GROUPS"))
			{
				CsvConversionCatalogsGroupModel CatalogsGroupModel = new CsvConversionCatalogsGroupModel();
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6桁)
				String strCompanyCode = model.get("companyCode").toString();
				String strStoreCode = model.get("storeCode").toString();
				Integer intProductClassificationNumber = model.get("productClassificationNumber").hashCode();
				
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6桁)
				CatalogsGroupModel.setNodeId(strCompanyCode+strStoreCode);
				//処理=EXPORT
				CatalogsGroupModel.setProcessingType("EXPORT");
				//業務=CATALOGS_GROUPS
				CatalogsGroupModel.setTargetCollection(targetCollection);
				//attributes
				CsvConversionCatalogsGroupAttributesModel attributes = new CsvConversionCatalogsGroupAttributesModel();
//KSD V001.000 20231120 DS
//				//企業ｺｰﾄﾞ(15桁)
//				attributes.setCompanyCode(strCompanyCode);
//KSD V001.000 20231120 DE
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setCatalogName(strCompanyCode+strStoreCode);
				//商品区分(1-8)
				attributes.setProductClassificationNumber(intProductClassificationNumber);
				//attributesにセット
				CatalogsGroupModel.setAttributes(attributes);
				//Object→JSON 変換
				json = mapper.writeValueAsString(CatalogsGroupModel);
			}
			//商品マスタ
			else if (targetCollection.equals("CATALOGS_ITEMS"))
			{
				CsvConversionCatalogsItemsModel CatalogsItemsModel = new CsvConversionCatalogsItemsModel();
				String strCompanyCode = model.get("companyCode").toString();
				String strStoreCode = model.get("storeCode").toString();
				
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6桁)
				CatalogsItemsModel.setNodeId(strCompanyCode+strStoreCode);
				//処理=EXPORT
				CatalogsItemsModel.setProcessingType("EXPORT");
				//業務=CATALOGS_ITEMS
				CatalogsItemsModel.setTargetCollection(targetCollection);
				//attributes
				CsvConversionCatalogsItemsAttributesModel attributes = new CsvConversionCatalogsItemsAttributesModel();
//KSD V001.000 20231120 DS
//				//企業ｺｰﾄﾞ(15桁)
//				attributes.setCompanyCode(strCompanyCode);
//KSD V001.000 20231120 DE
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setCatalogName(strCompanyCode+strStoreCode);
				//企業ｺｰﾄﾞ(15桁)+店舗ｺｰﾄﾞ(6)
				attributes.setPriceListName(strCompanyCode+strStoreCode);
				//attributesにセット
				CatalogsItemsModel.setAttributes(attributes);
				//Object→JSON 変換
				json = mapper.writeValueAsString(CatalogsItemsModel);
			}
			//その他はエラー
			else
			{
				responseModel.getResult().setCode(-99);
				return responseModel;
			}
		} catch (Exception e) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}

		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		// POST要求
		responseModel = CsvConversionTasksService.CsvConversionEntrySub(json,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null &&
			responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		
		/////////////////////////////////////////////////////////////////////
		// taskの実行開始(EXPORT開始)
		/////////////////////////////////////////////////////////////////////
		if(responseModel.getResult().getCode()!=0) {
			return responseModel;
		}
		String taskId = "";
		try {
			taskId = responseModel.getResponseModel().get("id").toString();;
		} catch (Exception e) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		// ログイン情報
		accessToken = loginUser.getWso2ApiToken();
		ELERAToken = loginUser.getELERAToken();
		// POST要求
		responseModel = CsvConversionTasksService.CsvConversionExecuteSub(taskId,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null &&
			responseModel.getResult().getELERAToken() != null) {
			loginUser.setWso2ApiToken(responseModel.getResult().getWSO2Token());
			loginUser.setELERAToken(responseModel.getResult().getELERAToken());
			// ユーザ情報をセッション管理用リポジトリに追加
			var sessionId = sessionUtil.saveUserToRepository(loginUser);
			// レスポンスのヘッダーにセッションID用のCookieをセットする
			response = sessionUtil.setCookie(response, sessionId);
		}
		
//KOSHIDAKA debug	ST
//		Map<String, Object> map = new HashMap<String, Object>();
//		taskId = responseModel.getResponseModel().get("id").toString();;
//		map.put("taskId", taskId);
//		responseModel = CsvConversionTasksService.CsvConversionGetSub(map,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
//KOSHIDAKA debug	ED

		return responseModel;
  }
  
  /**
   * task情報の取得（ファイルの入力(IMPORT)情報取得）
   * 商品マスタ登録/商品構成マスタ登録/アクセス権限登録
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/Get")
  @ResponseBody
  public CsvConversionCommonResponseModel CsvConversionGet(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new CsvConversionCommonResponseModel();
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
		//共通フィールド確認
		try {
			// レスポンスの"_id"の値を使用する
			model.get("taskId").toString();
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
		// GET要求
		////////////////////////////////
		responseModel = CsvConversionTasksService.CsvConversionGetSub(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());

		// セッションのトークン情報の上書き
		if (responseModel.getResult().getWSO2Token() != null &&
			responseModel.getResult().getELERAToken() != null) {
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
//KSD V001.000 20230907 AE
