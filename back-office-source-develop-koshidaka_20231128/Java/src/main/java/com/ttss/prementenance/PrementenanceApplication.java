package com.ttss.prementenance;

import java.util.concurrent.Executor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * アプリケーション.
 *
 * @author TSS 小山田 峻登
 * @version 1.0.0
 */
@SpringBootApplication
@EnableAsync
public class PrementenanceApplication {

  public static void main(String[] args) {
    SpringApplication.run(PrementenanceApplication.class, args);
  }

  /**
   * 非同期処理の設定.
   */
  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(10);
    executor.initialize();
    return executor;
  }
}
