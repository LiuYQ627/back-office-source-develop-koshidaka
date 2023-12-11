package com.ttss.prementenance.utils;

import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.MapSessionRepository;

/**
* アプリケーションプロパティファイル構成クラス.
*
* @authorTSS 小山田 峻登
* @version 1.0.0
*/
@Configuration
public class PropertiesConfiguration {

  // ログ出力
  private static final Logger log = LoggerFactory.getLogger(PropertiesConfiguration.class);
	
  /**
   * Repositoryがセッション情報を保持する最大時間（プロパティから取得する）.
   */
  @Value("${server.session_repository.storage_period}")
  private int sessionRepositoryStragePeriod;

  @Bean
  public ApiContext apuCommonConfig() {
    return new ApiContext();
  }
  
  @Bean
  public OauthContext authCommonConfig() {
    return new OauthContext();
  }
  
  @Bean
  public SessionBeans sessionConfig() {
    return new SessionBeans();
  }
  
  @Bean
  public SessionUtil sessionUtilConfig() {
    return new SessionUtil();
  } 
  
  /**
   * フィルター登録.
   * 
   * @param sessionUtil セッション管理Util(FWが自動設定)
   * @return フィルターレジストリ
   */
  @Bean
  public FilterRegistrationBean<HeaderToCookieSetCustomFilter> filterConfig(
      SessionUtil sessionUtil) {

    var bean = new FilterRegistrationBean<HeaderToCookieSetCustomFilter>(
        new HeaderToCookieSetCustomFilter(sessionUtil));

    // 許可するアクセスパターンを追加 ※コントローラ追加時には、ここにURLを追加すること
    bean.addUrlPatterns("/Top/*", "/UserMaster/*", "/StoreMaster/*",
        "/CorporateMaster/*", "/StoreGroupMaster/*", "/ServiceManegement/*",
        "/AccessAuthorityRegistration/*", "/DataRetentionSetting/*", "/DataClear/*",
        "/UsageChargeOutput/*", "/StoreMasterCopy/*", "/PresetSetting/*", "/DeviceSetting/*",
        "/TabletOperationSetting/*", "/SmartphoneOperationSetting/*");
    return bean;
  }
  
  /**
   * セッション管理用リポジトリのDI設定.
   * 
   * @return セッション管理用リポジトリ
   */
  @Bean
  public MapSessionRepository mapSessionRepositoryConfig() {
    var repository = new MapSessionRepository(new ConcurrentHashMap<>());
    log.warn("*** sessionRepositoryStragePeriod *** >>> " + this.sessionRepositoryStragePeriod);
    // Webサーバ内でセッション生成から破棄までの時間を設定(セッション生成から下記時間を経過すると強制的にセッション破棄)
    repository.setDefaultMaxInactiveInterval(this.sessionRepositoryStragePeriod);
    return repository;
  }
}
