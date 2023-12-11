/**
 * ---------+-----------------+----------+--------------------------------
 *  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
 * ---------+-----------------+----------+--------------------------------
 * 20221223  tianxh(Neusoft)   G001.00.0  issue課題#809を対応します.
 */
package com.ttss.prementenance.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.StringJoiner;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.multipart.MultipartFile;

import com.ttss.prementenance.model.ApiCommonResponseModel;
import com.ttss.prementenance.model.HttpResponseExtentionModel;
import com.ttss.prementenance.model.PostAuthorizationLoginRequestModel;
import com.ttss.prementenance.model.PostAuthorizationLoginResponseModel;
import com.ttss.prementenance.service.AuthorizationService;

/**
 * API関連の共通処理.
 *
 * @author TSS 小山田 峻登
 * @version 1.0.0
 */
@Component
public final class ApiUtil {

    // ログ出力
    private static final Logger log = LoggerFactory.getLogger(ApiUtil.class);

    // バリデーションエラー時のAPI番号
    private static final int VALIDATION_ERROR_API = -99;
    // バリデーションエラー時の応答コード
    private static final int VALIDATION_ERROR_CODE = -99;
    // バリデーションエラー時のマイクロサービス番号
    private static final int VALIDATION_ERROR_MS = -99;

    // セッションエラー時のAPI番号
    private static final int SESSION_ERROR_API = -90;
    // セッションエラー時の応答コード
    private static final int SESSION_ERROR_CODE = -90;
    // セッションエラー時のマイクロサービス番号
    private static final int SESSION_ERROR_MS = -90;

    // 「７：パスワード 新セキュリティタイプ不正」時の応答コード
    private static final int NEW_SECURITY_TYPE_ERROR_API = 36;
    // 「７：パスワード 新セキュリティタイプ不正」時の応答コード
    private static final int NEW_SECURITY_TYPE_ERROR_CODE = 7;
    // 「７：パスワード 新セキュリティタイプ不正」時の応答コード
    private static final int NEW_SECURITY_TYPE_ERROR_MS = 5;


    // 実行時エラー時のAPI番号
    private static final int EXECUTE_ERROR_API = -99;
    // 実行時エラー時のマイクロサービス番号
    private static final int EXECUTE_ERROR_MS = -99;
    // ログ出力時の名称置換用文字
    private static final String REPLACE_STR = "＊";

    private static final String BOUNDARY = "----WebKitFormBoundary";

    public ApiUtil() {}

    // staticでAutowiredを使うお作法があるので注意
    @Autowired
    private AuthorizationService authorizationService;
    @Autowired
    private ApiContext apiContext;
    @Autowired
    private OauthContext authContext;

    private static ApiUtil apiUtil;

    @PostConstruct
    public void update() {
        apiUtil = this;
        apiUtil.authContext = this.authContext;
        apiUtil.authorizationService = this.authorizationService;
        apiUtil.apiContext = this.apiContext;
    }

    /**
     * 認証処理.
     *
     * @return トークン
     * @throws IOException 入出力エラー
     * @throws InterruptedException スレッド割込みエラー
     */
    public static String oauth() throws IOException, InterruptedException {
        OauthUtil oauthUtile = new OauthUtil();
        return oauthUtile.createOauthToken(apiUtil.authContext);
    }

    /**
     * バリデーションエラー時の共通レスポンスモデル作成.
     *
     * @param errors バリデーションエラー
     * @param messageSource メッセージソース
     * @return バリデーションエラーメッセージが設定された共通レスポンスモデル
     */
    public static ApiCommonResponseModel getValidationErrorResponse(Errors errors,
            MessageSource messageSource) {
        // バリデーションエラーがある場合
        var commonResponseModel = new ApiCommonResponseModel();
        commonResponseModel.setApi(VALIDATION_ERROR_API);
        commonResponseModel.setCode(VALIDATION_ERROR_CODE);
        commonResponseModel.setMs(VALIDATION_ERROR_MS);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        for (ObjectError error : errors.getGlobalErrors()) {
            map.add("global", error.getDefaultMessage());
        }
        for (FieldError error : errors.getFieldErrors()) {
            if (error.getCode().equals("typeMismatch")) {
                // 型変換エラー
                var messageResourseUtil = new MessageSourceUtil(messageSource);
                map.add(error.getField(), messageResourseUtil.getMessage(error.getCodes()[2]));
            } else {
                // その他のバリデーションエラー
                map.add(error.getField(), error.getDefaultMessage());
            }
        }
        commonResponseModel.setErrorMessageMap(map);
        return commonResponseModel;
    }

    /**
     * セッションより必要情報が取得できなかった場合.
     *
     * @return バリデーションエラーメッセージが設定された共通レスポンスモデル
     */
    public static ApiCommonResponseModel getSessionError() {
        // セッションエラーがある場合
        var commonResponseModel = new ApiCommonResponseModel();
        commonResponseModel.setApi(SESSION_ERROR_API);
        commonResponseModel.setCode(SESSION_ERROR_CODE);
        commonResponseModel.setMs(SESSION_ERROR_MS);
        return commonResponseModel;
    }

    /**
     * PUT等のパス時のバリデーションチェック.
     *
     * @param fieldName フィールド名
     * @param errorMessage エラーメッセージリソース
     * @return バリデーションエラー用共通レスポンスモデル
     */
    public static ApiCommonResponseModel createValidationErrorModelWhenDelete(String fieldName,
            String errorMessage) {

        var commonResponseModel = new ApiCommonResponseModel();
        commonResponseModel.setApi(VALIDATION_ERROR_API);
        commonResponseModel.setCode(VALIDATION_ERROR_CODE);
        commonResponseModel.setMs(VALIDATION_ERROR_MS);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add(fieldName, errorMessage);
        commonResponseModel.setErrorMessageMap(map);
        return commonResponseModel;
    }

    /**
     * エラーメッセージマップからバリデーションエラー時のレスポンス作成.
     *
     * @param map エラーメッセージマップ
     * @return バリデーションエラー用共通レスポンスモデル
     */
    public static ApiCommonResponseModel createValidationErrorModelfromMap(
            MultiValueMap<String, String> map) {

        var commonResponseModel = new ApiCommonResponseModel();
        commonResponseModel.setApi(VALIDATION_ERROR_API);
        commonResponseModel.setCode(VALIDATION_ERROR_CODE);
        commonResponseModel.setMs(VALIDATION_ERROR_MS);

        commonResponseModel.setErrorMessageMap(map);
        return commonResponseModel;
    }

    /**
     * 実行エラーの場合の実行結果を返す.
     *
     * @param errorMessage エラーメッセージ
     * @param code 応答コード
     * @param error Exception
     * @return 実行結果（エラー）
     */
    public static ApiCommonResponseModel createExceptionResponseModel(String errorMessage, int code,
            Exception error) {
        var commonResponseModel = new ApiCommonResponseModel();

        commonResponseModel.setApi(EXECUTE_ERROR_API);
        commonResponseModel.setCode(code);
        commonResponseModel.setMs(EXECUTE_ERROR_MS);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("global", errorMessage);
        commonResponseModel.setErrorMessageMap(map);

        // APIサーバサクセス時の実行エラー時のログを出力
        log.warn("*** API ACCESS ERROR ***");
        log.warn("*** ExceptionCatchMethod *** >>> "
                + Thread.currentThread().getStackTrace()[2].getClassName() + "."
                + Thread.currentThread().getStackTrace()[2].getMethodName());
        log.warn("*** ResultCode *** >>> " + code);
        log.warn("*** DispErrorMessage *** >>> " + errorMessage);
        log.warn("*** Exception *** >>> " + error.getClass().getName());
        log.warn("*** ExceptionMessage *** >>> " + error.getMessage());

        return commonResponseModel;
    }

    /**
     * エラーメッセージマップから 「７：パスワード 新セキュリティタイプ不正」エラー時のレスポンス作成.
     *
     * @param map エラーメッセージマップ
     * @return 「７：パスワード 新セキュリティタイプ不正」エラー用共通レスポンスモデル
     */
    public static ApiCommonResponseModel createNewSecurityTypeErrorModelfromMap(
            MultiValueMap<String, String> map) {

        var commonResponseModel = new ApiCommonResponseModel();
        commonResponseModel.setApi(NEW_SECURITY_TYPE_ERROR_API);
        commonResponseModel.setCode(NEW_SECURITY_TYPE_ERROR_CODE);
        commonResponseModel.setMs(NEW_SECURITY_TYPE_ERROR_MS);

        commonResponseModel.setErrorMessageMap(map);
        return commonResponseModel;
    }

    /**
     * リクエストデータモデルのパラメータをURL指定用文字列に変換する.
     *
     * @param obj リクエストデータモデルのインスタンス
     * @return 生成された文字列
     * @throws IllegalAccessException 不正要素アクセスエラー
     * @throws IllegalArgumentException 不正要素アクセスエラー
     */
    public static String createRequestParamWhenGet(Object obj)
            throws IllegalArgumentException, IllegalAccessException {
        Field[] fields = obj.getClass().getDeclaredFields();

        var params = new StringJoiner("&", "?", "");

        // パラメータの数分繰り返し
        for (Field f : fields) {
            // メンバ名と値を取得
            f.setAccessible(true);
            String name = f.getName();
            Object value = f.get(obj);

            if (value == null) {
                // 値がnullの場合はリクエストの内容に含めない
                continue;
            } else if (value.toString().equals("[]")) {
                // 値が空配列の場合は含めない
                continue;
            }
            // name = toChainCase(name);
            params.add(name + "=" + value.toString());
        }
        return params.length() <= 1 ? "" : params.toString();

    }

    /**
     * MSへのアクセスのラッピング処理.
     *
     * @param url URL
     * @param httpMethod HTTP Method
     * @param businessUnitCd 企業コード
     * @param params HTTP リクエスト
     * @param ELERAToken ELERAトークン
     * @param userId ユーザID
     * @param pssword パスワード
     * @return アクセス結果
     * @throws IOException API要求時のエラー
     * @throws InterruptedException API要求時のエラー
     */
    public static HttpResponseExtentionModel sendMsExtension(String url, HttpMethod httpMethod,
            String businessUnitCd, String params, String accessToken, String ELERAToken,
            String logParames, String userId, String passWord, MessageSource messageSource)
            throws IOException, InterruptedException {


        var responseModel = new HttpResponseExtentionModel();
        // リクエストを送信して応答を取得
        HttpResponse<String> response =
                ApiUtil.sendMs(url, httpMethod, "", params, accessToken, ELERAToken, params);

        // WSO2トークンのタイムアウト確認
        if (response.statusCode() == 401 && response.body().indexOf("900901") >= 0) {
            try {
                // トークンタイムアウトの場合
                // WSO2トークン取得と再設定
                accessToken = oauth();

                // リクエスト再送信
                response = ApiUtil.sendMs(url, httpMethod, "", params, accessToken, ELERAToken,
                        params);
            } catch (Exception e) {
                // エラー
                responseModel.setResponse(response);
                return responseModel;
            }
        }
        // ELERAトークンのタイムアウト確認
        if (response.statusCode() == 401
                && response.body().indexOf("401 Authorization Required") >= 0) {
            try {
                // ELERAトークンアウトの場合
                var responseLogin = new PostAuthorizationLoginResponseModel();
                var requestModel = new PostAuthorizationLoginRequestModel();
                requestModel.getRequestModel().setUsername(userId);
                requestModel.getRequestModel().setPassword(passWord);
                // ELERAトークンの取得
                responseLogin = apiUtil.authorizationService.postLogin(requestModel, messageSource,
                        apiUtil.apiContext, accessToken, "");

                if (responseLogin.getResult().getCode() == 5) {
                    // パスワード有効期限の場合
                    responseModel.setResponse(new Wso2TokenErrorResponse());
                    return responseModel;

                } else if (responseLogin.getResult().getCode() != 0) {
                    responseModel.setResponse(response);
                    return responseModel;
                }

                // ELERAトークン再設定
                ELERAToken = responseLogin.getELERAToken();
                // リクエスト再送信
                response = ApiUtil.sendMs(url, httpMethod, "", params, accessToken, ELERAToken,
                        params);

            } catch (Exception e) {
                // エラー
                responseModel.setResponse(response);
                return responseModel;
            }
        }

        // トークンを呼び出し元のServiceに返却
        responseModel.setResponse(response);
        responseModel.setWSO2Token(accessToken);
        responseModel.setELERAToken(ELERAToken);

        return responseModel;
    }

    /**
     * MSへのアクセス処理.
     *
     * @param url URL
     * @param httpMethod HTTP Method
     * @param businessUnitCd 企業コード
     * @param params HTTP リクエスト
     * @param ELERAToken ELERAトークン
     * @return アクセス結果
     * @throws IOException API要求時のエラー
     * @throws InterruptedException API要求時のエラー
     */
    public static HttpResponse<String> sendMs(String url, HttpMethod httpMethod,
            String businessUnitCd, String params, String accessToken, String ELERAToken,
            String logParames) throws IOException, InterruptedException {

        // GETとDELETE時のパラメータ設定
        if (HttpMethod.GET.equals(httpMethod)) {
            // GETの場合はURLにリクエストパラメータを設定する
            url = url + params;
        } else if (HttpMethod.DELETE.equals(httpMethod)) {
            // DELETEの場合はURLの末尾にパラメータを設定する
            // データクリア対応
// KSD V001.000 DS 20231128 マスタ系クリア対応
//            if (url.indexOf("TRANSACTION") == -1) {
// KSD V001.000 DE 20231128 マスタ系クリア対応
// KSD V001.000 AS 20231128 マスタ系クリア対応
            if ((url.indexOf("TRANSACTION") == -1) && (url.indexOf("MASTER") == -1)) {
// KSD V001.000 AE 20231128 マスタ系クリア対応
                url = url + "/" + params;
            }
        }

        var build = HttpRequest.newBuilder(URI.create(url));

        // sessionから取得したTokenを送る
        build.header("Authorization", accessToken);
        build.headers("Content-Type", "application/json");
        build.headers("Accept", "*/*");

        if (ELERAToken.length() > 0) {
            build.header("EleraToken", ELERAToken);
        }

        // HTTPMethod毎の処理
        switch (httpMethod) {
            case DELETE:
                build = build.DELETE();
                break;
            case GET:
                build = build.GET();
                break;
            case PUT:
                build = build.PUT(HttpRequest.BodyPublishers.ofString(params));
                break;
            case POST:
                build = build.POST(HttpRequest.BodyPublishers.ofString(params));
                break;
            default:
                break;
        }

        // APIアクセス時のログを出力
        log.info("*** API ACCESS ***");
        log.info("*** HTTP Method *** >>> " + build.build().method());
        log.info("*** URI *** >>> " + build.build().uri());
        log.info("*** Parameter *** >>> " + logParames);

        // HttpClientを生成
        HttpClient cli = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

        HttpResponse<String> response =
                cli.send(build.build(), HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 401) {
            if (response.body().indexOf("PASSWORD_EXPIRED") >= 0) {
                // リクエストを送信
                return response;
            } else if (response.body().indexOf("900901") >= 0) {
                // リクエストを送信
                return response;
            } else if (response.body().indexOf("401 Authorization Required") >= 0) {
                // リクエストを送信
                return response;
            }
            
        	// G001.00.0 Add-Start
            else if (response.body().indexOf("BAD_CREDENTIALS") >= 0) {
                // リクエストを送信
            	// 古いパスワードを間違
                return response;
            } else if (response.body().indexOf("INVALID_USER") >= 0) {
                // パスワードがロックされています。
                return response;
            }
        	// G001.00.0 Add-End
            
            // HTTPステータスが401であることが分かるようにログを出力
            log.info("*** HTTP RESPONSE STATUS *** >>> " + response.statusCode());

            // HTTPステータスが401の場合は、WSO2のトークン認証エラーとして扱う
            return new Wso2TokenErrorResponse();
        }
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug
        log.info("*** URL      ***        >>> " + url);
        log.info("*** RESPONSE HEADER *** >>> " + response.headers());
        log.info("*** RESPONCE BODY   *** >>> " + response.body());
//////////////////////////////////////////////////////////////////////////////KOSHIDAKA debug

        // リクエストを送信
        return response;
    }

    /**
     * チェインケース (ケバブケース) に変換.
     *
     * @param word 変換前の文字列
     * @return チェインケース (ケバブケース) に変換された文字列
     */
    public static String toChainCase(final String word) {
        String retWord = null;

        // nullでない場合に文字列チェックする。null文字の場合はそのままnullを返す。
        if (word != null) {
            if (word.length() >= 2) {
                // 2文字以上ある場合に変換
                retWord = word.substring(1);
                retWord = retWord.replaceAll("([A-Z])", "-$1").toLowerCase()
                        .replaceAll("[-_ ]+", "-").replaceAll("-$", "");
                retWord = word.substring(0, 1) + retWord;
            } else {
                // 1文字以下の場合はそのまま
                retWord = word;
            }
        }

        return retWord;
    }

    /**
     * ログ出力用のリクエストデータからユーザ名とパスワードを削除する.
     *
     * @param param リクエストデータ文字列
     * @return 変換後文字列
     */
    public static String deletedPrivacyInfo(String param) {
        String[] strList = param.split(":", -1);
        String returnStr = "";
        for (int i = 0; i < strList.length; i++) {
            if (strList[i].contains("name")) {
                strList[i + 1] = deletString(strList[i + 1], false);
            }
            if (strList[i].contains("\"password\"") || strList[i].contains("inputPassword")
                    || strList[i].contains("passwordOld") || strList[i].contains("newPassword")) {
                strList[i + 1] = deletString(strList[i + 1], true);
            }
            returnStr += strList[i] + ":";
        }
        return returnStr.replaceFirst(".$", "");
    }

    /**
     * 文字列を削除、または置換する 名称の場合は桁数分の「*」に置換する パスワードの場合は削除する.
     *
     * @param str 処理文字列
     * @param passFlag 処理形式（パスワードの場合はtrue、ユーザ名の場合はfalse)
     * @return 変換後文字列
     */
    public static String deletString(String str, boolean passFlag) {
        String[] strList = str.split("\"", -1);
        String returnStr = "";

        if (passFlag) {
            strList[1] = "";
        } else {
            String replaceStr = "";
            for (int j = 0; j < strList[1].length(); j++) {
                replaceStr += REPLACE_STR;
            }
            strList[1] = replaceStr;
        }
        for (String string : strList) {
            returnStr += string + "\"";
        }
        return returnStr.replaceFirst(".$", "");
    }

    /**
     * MSへのアクセス処理 DELETEリクエスト送信時、URLにリクエストパラメータを設定する.
     *
     * @param url URL
     * @param httpMethod HTTP Method
     * @param businessUnitCd 企業コード
     * @param params HTTP リクエスト
     * @param ELERAToken ELERAトークン
     * @return アクセス結果
     * @throws IOException API要求時のエラー
     * @throws InterruptedException API要求時のエラー
     */
    public static HttpResponse<String> sendMsDelUseReqParam(String url, HttpMethod httpMethod,
            String businessUnitCd, String params, String accessToken, String ELERAToken,
            String logParames) throws IOException, InterruptedException {

        // URLにリクエストパラメータを設定する
        url = url + params;

        var build = HttpRequest.newBuilder(URI.create(url));

        // sessionから取得したTokenを送る
        build.header("Authorization", accessToken);
        build.headers("Content-Type", "application/json");
        build.headers("Accept", "*/*");

        if (ELERAToken.length() > 0) {
            build.header("EleraToken", ELERAToken);
        }

        if (url.indexOf("pre-transaction") != -1) {
            // 前捌き取引管理の場合は企業コードのプロパティ名を「businessUnitId」にする
            build.header("businessUnitId", businessUnitCd);
        } else {
            build.header("businessUnitCd", businessUnitCd);
        }

        build = build.DELETE();

        // APIアクセス時のログを出力
        log.info("*** API ACCESS ***");
        log.info("*** HTTP Method *** >>> " + build.build().method());
        log.info("*** URI *** >>> " + build.build().uri());
        log.info("*** Parameter *** >>> " + logParames);

        // HttpClientを生成
        HttpClient cli = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

        HttpResponse<String> response =
                cli.send(build.build(), HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 401) {
            // HTTPステータスが401であることが分かるようにログを出力
            log.info("*** HTTP RESPONSE STATUS *** >>> " + response.statusCode());

            // HTTPステータスが401の場合は、WSO2のトークン認証エラーとして扱う
            return new Wso2TokenErrorResponse();
        }

        // リクエストを送信
        return response;
    }

    /**
     * MSへのアクセス処理 PUTリクエスト送信時、URLにリクエストパラメータを設定する.
     *
     * @param url URL
     * @param httpMethod HTTP Method
     * @param businessUnitCd 企業コード
     * @param params HTTP リクエスト
     * @param ELERAToken ELERAトークン
     * @return アクセス結果
     * @throws IOException API要求時のエラー
     * @throws InterruptedException API要求時のエラー
     */
    public static HttpResponse<String> sendMsPutUseReqParam(String url, HttpMethod httpMethod,
            String businessUnitCd, String params, String accessToken, String ELERAToken,
            String logParames) throws IOException, InterruptedException {

        // URLにリクエストパラメータを設定する
        url = url + params;

        var build = HttpRequest.newBuilder(URI.create(url));

        // sessionから取得したTokenを送る
        build.header("Authorization", accessToken);
        build.header("businessUnitCd", businessUnitCd);
        build.headers("Content-Type", "application/json");
        build.headers("Accept", "*/*");

        if (ELERAToken.length() > 0) {
            build.header("EleraToken", ELERAToken);
        }

        build = build.PUT(HttpRequest.BodyPublishers.ofString(""));

        // HttpClientを生成
        HttpClient cli = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

        // リクエストを送信
        return cli.send(build.build(), HttpResponse.BodyHandlers.ofString());
    }

    /**
     * MSへのアクセス処理(ファイルアップロード).
     *
     * @param url URL
     * @param httpMethod HTTP Method
     * @param businessUnitCd 企業コード
     * @param fileName ファイル名
     * @param file アップロードファイル
     * @param ELERAToken ELERAトークン
     * @return アクセス結果
     * @throws Exception アップロード対象外ファイル
     */
    public static HttpResponse<String> sendMsForFileUpload(String url, HttpMethod httpMethod,
            String businessUnitCd, String fileName, MultipartFile file, String accessToken,
            String ELERAToken) throws Exception {

        var build = HttpRequest.newBuilder(URI.create(url));

        // sessionから取得したTokenを送る
        var boundary = getBoundary();
        build.header("Authorization", accessToken);
        build.headers("Content-Type", "multipart/form-data; boundary=" + boundary);
        build.headers("Accept", "*/*");

        if (ELERAToken.length() > 0) {
            build.header("EleraToken", ELERAToken);
        }

        var type = fileName.substring(fileName.length() - 4, fileName.length());
        var contentType = "";
        var contentDisposition = "";
        if (type.equals(".zip")) {
            contentDisposition =
//KSD V001.000 20231106 AS
                    "Content-Disposition: form-data; name=\"file\"; filename=\""
                            + fileName + "\"";
//KSD V001.000 20231106 AE
//KSD V001.000 20231106 DS
//		            "Content-Disposition: form-data; name=\"batchRegistFile\"; filename=\""
//      		            + fileName + "\"";
//KSD V001.000 20231106 DE
            contentType = "Content-Type: application/zip";
//KSD V001.000 20230907 AS
        } else if (type.equals(".csv")) {
            contentDisposition =
                    "Content-Disposition: form-data; name=\"file\"; filename=\""
                            + fileName + "\"";
            contentType = "Content-Type: text/csv";
//KSD V001.000 20230907 AE
        } else {
            contentDisposition = "Content-Disposition: form-data; name=\"file\"; filename=\""
                    + fileName + "\"";
            contentType = "Content-Type: image/png";
        }

        if (url.indexOf("pre-transaction") != -1) {
            // 前捌き取引管理の場合は企業コードのプロパティ名を「businessUnitId」にする
            build.header("businessUnitId", businessUnitCd);
        } else {
            build.header("businessUnitCd", businessUnitCd);
        }

        // バイト配列を書き込み
        var byteArrays = new ArrayList<byte[]>();
        byte[] separator = (boundary + "\r\n" + contentDisposition + "\r\n" + contentType)
                .getBytes(StandardCharsets.UTF_8);
        byteArrays.add("--".getBytes(StandardCharsets.UTF_8));
        byteArrays.add(separator);
        byteArrays.add("\r\n".getBytes(StandardCharsets.UTF_8));
        byteArrays.add("\r\n".getBytes(StandardCharsets.UTF_8));
        byteArrays.add(file.getBytes());
        byteArrays.add("\r\n".getBytes(StandardCharsets.UTF_8));
        byteArrays.add("--".getBytes(StandardCharsets.UTF_8));
        byteArrays.add(boundary.getBytes(StandardCharsets.UTF_8));
        byteArrays.add("--".getBytes(StandardCharsets.UTF_8));
        byteArrays.add("\r\n".getBytes(StandardCharsets.UTF_8));
        build.POST(BodyPublishers.ofByteArrays(byteArrays));

        // バイト配列を書き込み(ログ出力用)
        ByteArrayOutputStream baOutStr = new ByteArrayOutputStream();
        baOutStr.write("--".getBytes(StandardCharsets.UTF_8));
        baOutStr.write(separator);
        baOutStr.write("\r\n".getBytes(StandardCharsets.UTF_8));
        baOutStr.write("\r\n".getBytes(StandardCharsets.UTF_8));
        baOutStr.write("(data)".getBytes(StandardCharsets.UTF_8));
        baOutStr.write("\r\n".getBytes(StandardCharsets.UTF_8));
        baOutStr.write("--".getBytes(StandardCharsets.UTF_8));
        baOutStr.write(boundary.getBytes(StandardCharsets.UTF_8));
        baOutStr.write("--".getBytes(StandardCharsets.UTF_8));
        baOutStr.write("\r\n".getBytes(StandardCharsets.UTF_8));

        // APIアクセス時のログを出力
        log.info("*** API ACCESS ***");
        log.info("*** HEADERS ***" + "Content-Type: multipart/form-data; boundary=" + boundary);
        log.info("*** HTTP Method *** >>> " + build.build().method());
        log.info("*** URI *** >>> " + build.build().uri());
        log.info("*** Parameter *** >>> " + baOutStr.toString());

        HttpClient client = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();
        HttpResponse<String> response =
                client.send(build.build(), HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 401) {
            // HTTPステータスが401であることが分かるようにログを出力
            log.info("*** HTTP RESPONSE STATUS *** >>> " + response.statusCode());

            // HTTPステータスが401の場合は、WSO2のトークン認証エラーとして扱う
            return new Wso2TokenErrorResponse();
        }

        return response;
    }

    /**
     * Boundary取得処理.
     *
     * @return Boundary
     */
    public static String getBoundary() {
        String theAlphaNumericS;
        StringBuilder builder;
        theAlphaNumericS =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";
        builder = new StringBuilder();
        builder.append(BOUNDARY);

        int count = 15;
        for (int m = 0; m < count; m++) {
            int myindex = (int) (theAlphaNumericS.length() * Math.random());
            builder.append(theAlphaNumericS.charAt(myindex));
        }
        return builder.toString();
    }

// KSD V001.000 20230822 AS
   public static void setLogData(String LogData) {
        log.info(LogData);
    }
// KSD V001.000 20230822 AE
}
