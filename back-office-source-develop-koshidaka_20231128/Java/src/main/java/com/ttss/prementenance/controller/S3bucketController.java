package com.ttss.prementenance.controller;

import java.util.ArrayList;
import java.util.HashMap;
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

import com.ttss.prementenance.model.S3bucketCommonResponseModel;
import com.ttss.prementenance.service.S3bucketService;
import com.ttss.prementenance.utils.ApiContext;
import com.ttss.prementenance.utils.ApiUtil;
import com.ttss.prementenance.utils.SessionUtil;

/**
 * s3bucket 
 *
 * @author
 * @version 1.0.0
 */
@RestController
@RequestMapping("S3bucket")
public class S3bucketController {

  @Autowired
  private S3bucketService s3bucketService;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ApiContext apiContext;

  @Autowired
  public S3bucketController() {}

  @Autowired
  private SessionUtil sessionUtil;

  /**
   * S3ファイル取得
   *
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/GetFile")
  @ResponseBody
  public S3bucketCommonResponseModel s3bucketGetFilePost(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new S3bucketCommonResponseModel();
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
		//storeCode=店舗ｺｰﾄﾞ  個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、
		//storeCode Non       共有：「企業ｺｰﾄﾞ」フォルダ
		try {
			model.get("bucket").toString();
			model.get("companyCode").toString();
// KSD V001.000 20230807 AS
			model.get("apicaller").toString();
// KSD V001.000 20230807 AE
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
		// POST要求（取得）
		////////////////////////////////
		responseModel = s3bucketService.S3bucketGetFile(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
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
// KSD V001.000 20230922 AE
		return responseModel;
  }
  
  /**
   * S3ファイル登録
   *
   * @param multipartFile アップロードファイル
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/CaptureFile")
  @ResponseBody
  public S3bucketCommonResponseModel S3bucketCaptureFilePost(
		  @RequestParam("file") MultipartFile multipartFile,
		  HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new S3bucketCommonResponseModel();
		var loginUser = this.sessionUtil.getActiveLoginUser(request);
		if (loginUser == null) {
			responseModel.setResult(ApiUtil.getSessionError());
			return responseModel;
		}
		var work = multipartFile;
		if( work == null) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		// バリデーション確認
// KSD V001.000 20231004 DS
//		long longSize = multipartFile.getSize();
//		if( longSize == 0) {
//			// エラーの場合
//			responseModel.getResult().setCode(-99);
//			return responseModel;
//		}
// KSD V001.000 20231004 DE
		
		String strOriginalFileName = multipartFile.getOriginalFilename();
		if( strOriginalFileName.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		var strBucket = request.getParameter("bucket");
		if( strBucket.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		var strCompanyCode = request.getParameter("companyCode");
		if( strCompanyCode.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
// KSD V001.000 20230719 DS
//		strStoreCode = request.getParameter("storeCode");
//		if( strStoreCode.length() == 0) {
//			// エラーの場合
//			responseModel.getResult().setCode(-99);
//			return responseModel;
//		}
//		var strName = request.getParameter("fileName");
//		if( strName.length() == 0) {
//			// エラーの場合
//			responseModel.getResult().setCode(-99);
//			return responseModel;
//		}
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
		//フィールド確認
		//storeCode=店舗ｺｰﾄﾞ  個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、
		//storeCode Non       共有：「企業ｺｰﾄﾞ」フォルダ
		int i_storeCodeFlag = 0;
		var strStoreCode = "";
		try {
			strStoreCode = request.getParameter("storeCode");
			if( strStoreCode.length() == 0) {
				// 「共有」の場合
				i_storeCodeFlag = 1;
			}
		} catch (Exception e) {
			i_storeCodeFlag = 1;
		}

		var strFileName = request.getParameter("fileName");
		if( strFileName.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
		var strFile = request.getParameter("fileContent");
		if( strFile.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
// KSD V001.000 20230822 AS
		var strApicaller = request.getParameter("apicaller");
		if( strApicaller.length() == 0) {
			// エラーの場合
			responseModel.getResult().setCode(-99);
			return responseModel;
		}
// KSD V001.000 20230822 AE
// KSD V001.000 20231113 AS
		var strFileHash = "";
		try {
			strFileHash = request.getParameter("fileHash");
		} catch (Exception e) {
			strFileHash = "";
		}
// KSD V001.000 20231113 AE

		Map<String, String> model = new HashMap<String, String>();
		model.put("bucket", strBucket);
		model.put("companyCode", strCompanyCode);
		if( i_storeCodeFlag == 0) {
			model.put("storeCode", strStoreCode);
		}
		model.put("fileName", strFileName);
// KSD V001.000 20230822 DS
//		model.put("fileContent", strFile);
// KSD V001.000 20230822 DE
// KSD V001.000 20230829 AS
		//VUE側から「data:image/png;base64,...」がセットされるので先頭から２２バイト削除
		//VUE側から「data:video/mp4;base64,...」がセットされるので先頭から２２バイト削除
		//VUE側から「data:audio/wav;base64,...」がセットされるので先頭から２２バイト削除
		//VUE側から「data:video/quicktime;base64,...」がセットされるので先頭から２８バイト削除
		//VUE側から「data:video/x-ms-wmv;base64,...」がセットされるので先頭から２７バイト削除
		Integer i_posi = strFile.indexOf((int)',');
		String strFile1="";
		if( i_posi >= 0) {
			strFile1 = strFile.substring(i_posi+1);
		}
		else
		{
			strFile1 = strFile;
		}
		model.put("fileContent", strFile1);
// KSD V001.000 20230829 AE
// KSD V001.000 20230719 AE

// KSD V001.000 20230822 AS
		model.put("apicaller", strApicaller);
// KSD V001.000 20230822 AE
// KSD V001.000 20231113 AS
		model.put("fileHash", strFileHash);
// KSD V001.000 20231113 AE

		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();

		////////////////////////////////
		// POST要求（更新）
		////////////////////////////////
// KSD V001.000 20230719 DS
//		responseModel = s3bucketService.S3bucketCaptureFile(multipartFile, request,
// KSD V001.000 20230719 DE
// KSD V001.000 20230719 AS
		responseModel = s3bucketService.S3bucketCaptureFile(model, request,
// KSD V001.000 20230719 AE
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
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
// KSD V001.000 20230922 AE
		return responseModel;
  }
  
  /**
   * S3ファイル削除
   *
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/DeleteFile")
  @ResponseBody
  public S3bucketCommonResponseModel S3bucketDeleteFilePost(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

		var responseModel = new S3bucketCommonResponseModel();
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
		//storeCode=店舗ｺｰﾄﾞ  個店：「企業ｺｰﾄﾞ/店舗ｺｰﾄﾞ」フォルダ、
		//storeCode Non       共有：「企業ｺｰﾄﾞ」フォルダ
		try {
			model.get("bucket").toString();
			model.get("companyCode").toString();
			model.get("fileNames").toString();
		} catch (Exception e) {
			// エラーの場合
			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
			return responseModel;
		}

// KSD V001.000 20230822 AS
		//"fileNames":"123.png" -> "fileNames":["123.png"]
		String strfileNames = model.get("fileNames").toString();
		model.remove("fileNames");
		ArrayList<String> fileNamesList= new ArrayList<String>();
		fileNamesList.add(strfileNames);
		model.put("fileNames", fileNamesList);
// KSD V001.000 20230822 AE

		// ログイン情報
		String accessToken = loginUser.getWso2ApiToken();
		String ELERAToken = loginUser.getELERAToken();
		//パラメータ部
		//Body部
		////////////////////////////////
		// POST要求
		////////////////////////////////
		responseModel = s3bucketService.S3bucketDeleteFile(model,
				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
		
// KSD V001.000 20230922 AS
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
// KSD V001.000 20230922 AE
		return responseModel;
  }
  
  /**
   * S3フォルダ作成
   *
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/CreateFolder")
  @ResponseBody
  public S3bucketCommonResponseModel S3bucketCreateFolderPost(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

// KSD V001.000 20230621 DS
// S3ファイル登録時に自動的にフォルダが作成される為未使用 2023.06.21 fuse
		
//		var responseModel = new S3bucketCommonResponseModel();
//		var loginUser = this.sessionUtil.getActiveLoginUser(request);
//		if (loginUser == null) {
//			responseModel.setResult(ApiUtil.getSessionError());
//			return responseModel;
//		}
//		// バリデーション確認
//		if (errors.hasErrors()) {
//			// エラーの場合
//			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
//			return responseModel;
//		}
//		//フィールド確認
//		try {
//			model.get("bucket").toString();
//			model.get("companyCode").toString();
//		} catch (Exception e) {
//			// エラーの場合
//			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
//			return responseModel;
//		}
//		// ログイン情報
//		String accessToken = loginUser.getWso2ApiToken();
//		String ELERAToken = loginUser.getELERAToken();
//		//パラメータ部
//		//Body部
//		////////////////////////////////
//		// POST要求
//		////////////////////////////////
//		responseModel = s3bucketService.S3bucketCreateFolder(model,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20230621 DE

		var responseModel = new S3bucketCommonResponseModel();
		responseModel.getResult().setCode(0);
		return responseModel;
  }
  
  /**
   * S3フォルダ削除
   *
   * @param model リクエスト内容
   * @param errors バリデーションエラー内容
   * @param request HttpServletのリクエスト(FWが自動で設定)
   * @return 検索処理＋αレスポンス
   */
  @CrossOrigin
  @RequestMapping("/DeleteFolder")
  @ResponseBody
  public S3bucketCommonResponseModel S3bucketDeleteFolderPost(@RequestBody @Validated Map<String, Object> model,
		  Errors errors, HttpServletRequest request, HttpServletResponse response) {

// KSD V001.000 20230621 DS
//フォルダ削除仕様が無い為、未使用 2023.06.21 fuse

//		var responseModel = new S3bucketCommonResponseModel();
//		var loginUser = this.sessionUtil.getActiveLoginUser(request);
//		if (loginUser == null) {
//			responseModel.setResult(ApiUtil.getSessionError());
//			return responseModel;
//		}
//		// バリデーション確認
//		if (errors.hasErrors()) {
//			// エラーの場合
//			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
//			return responseModel;
//		}
//		//フィールド確認
//		try {
//			model.get("bucket").toString();
//			model.get("companyCode").toString();
//		} catch (Exception e) {
//			// エラーの場合
//			responseModel.setResult(ApiUtil.getValidationErrorResponse(errors, messageSource));
//			return responseModel;
//		}
//		// ログイン情報
//		String accessToken = loginUser.getWso2ApiToken();
//		String ELERAToken = loginUser.getELERAToken();
//		//パラメータ部
//		//Body部
//		////////////////////////////////
//		// POST要求
//		////////////////////////////////
//		responseModel = s3bucketService.S3bucketDeleteFolder(model,
//				messageSource, apiContext, accessToken, ELERAToken, loginUser.getBusinessUnitCdStr() + loginUser.getUserId(), loginUser.getPassWord());
// KSD V001.000 20230621 DE
		
		var responseModel = new S3bucketCommonResponseModel();
		responseModel.getResult().setCode(0);
		return responseModel;
  }

}
