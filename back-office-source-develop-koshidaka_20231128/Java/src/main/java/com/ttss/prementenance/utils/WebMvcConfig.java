package com.ttss.prementenance.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* SpringMVCの構成をカスタマイズするクラス.
*
* @author TSS 小山田 峻登
* @version 1.0.0
*/
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
  
  // フロントサーバのURL
  @Value("${front.server.url}")
  private String frontServerUrl; 
  
  /**
   * CORS設定.
   * @param registry CORSレジストリ(Spiringが自動設定)
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(frontServerUrl)
            .allowCredentials(true)
            .allowedMethods("GET", "POST", "PUT", "DELETE");
  }
}
