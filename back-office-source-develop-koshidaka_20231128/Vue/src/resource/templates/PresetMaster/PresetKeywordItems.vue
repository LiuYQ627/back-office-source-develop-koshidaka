<!--
* ---------+-----------------+----------+--------------------------------
*  DATE    |NAME(Inc)        |GUIDE     |GUIDANCE
* ---------+-----------------+----------+--------------------------------
* 20230403  bai.ry(Neusoft)    G001.00.0  issue課題#1606を対応します.
-->
<script type="text/javascript" src="@/resource/static/js/PresetMaster/presetKeywordItems.js" />
<style scoped src="@/resource/static/css/PresetMaster/dialogPresetSearch.css"/>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1147px !important"
      persistent>
      <v-card class="presetSearchBasesize">
        <!-- ダイアログタイトル部 -->
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">商品検索</font>
        </v-card-title>
        <!-- ダイアログコンテンツ部 -->
        <v-card-text
          class="presetContentStyle"
          style="height: 390px;">
          <div class="searchConditionsStyle">
            <table>
              <tbody>
                <!-- スペース -->
                <tr>
                  <td style="height:17px;" />
                </tr>
                <tr>
                  <!-- 商品名 -->
                  <td
                    class="pretitleCellStyle borderCellStyle"
                    style="width: 148px;">
                    商品名
                  </td>
                  <td class="inputItemSearchCellStyle borderCellStyle">
                    <input
                      type="text"
                      v-model="searchName"
                      id="inputone"
                      tabindex="303"
                      @input="inputLimit(searchName,40)"
                      placeholder="半角40文字/全角20文字以内"
                    >
                  </td>
                  <!-- スペース -->
                  <td class="preStandardCellSpaceStyle" />
                  <!-- 検索ボタン -->
                  <td>
                    <!-- v-bind:disabled="isSearch()" tabindex="304" -->
                    <v-btn
                      class="productSearchButton"
                      color="#1ea7cb"
                      @click="onClickSearch()"
                      :disabled=false
                      tabindex="304">
                      <v-icon
                        id="searchIcon"
                        large
                        color="white">mdi-magnify</v-icon>
                      <span>
                        <font>検索する</font>
                      </span>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="searchItemResultTableStyle">
            <table style="min-width: 930px;max-width: 930px;">
              <thead >
                <tr>
                  <td
                    style="min-width:496px;"
                    :key="0">{{ headers[0] }}</td>
                  <td
                    style="min-width:300px;"
                    :key="1">{{ headers[1] }}</td>
                  <td
                    style="min-width:130px;"
                    :key="2">{{ headers[2] }}</td>
                </tr>
              </thead>
              <!-- G001.00.0 Update-Start -->
              <tbody :style="items.length > 5 ? 'padding-right: 4px;margin-right: -20px;' : ''">
                <!-- G001.00.0 Update-End -->
                <tr
                  v-for="(item, index) in items"
                  :key="index"
                  @click="clickRow(item, index)"
                  :class="selectedIndex === index ? 'selectedItem' : ''">
                  <td style="min-width:496px;">{{ item.displayName.kanji }}</td>
                  <td
                    style="min-width:300px"
                    class="NumericStyle">{{ item.skuId }}</td>
                  <td
                    style="min-width:130px;text-align: right;"
                    class="NumericStyle">
                    <template>
                      {{ item.price | numberPutComma }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="close()"
            tabindex="401">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickOk()"
            :disabled="!Object.keys(selectedItem).length"
            tabindex="402">
            {{ $t("O00004.S004") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
