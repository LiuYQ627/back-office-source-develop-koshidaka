<script type="text/javascript" src="@/resource/static/js/ProductGroupMaster/productGroupKeywordItems.js" />
<style scoped src="@/resource/static/css/ProductGroupMaster/dialogProductGroupSearch.css"/>
<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="880px !important" persistent>
      <!-- １）リンクコード設定ダイアログ -->
      <v-card class="productGroupSearchBasesize">
        <!-- ダイアログタイトル部 -->
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ $t("F00204.S028")}}</font>
        </v-card-title>
        <!-- ダイアログコンテンツ部 -->
        <v-card-text class="productGroupContentStyle" style="height: 390px;">
          <!-- １－２）マスタ検索条件入力エリア -->
          <div class="searchConditionsStyle">
            <table>
              <tbody>
                <!-- スペース -->
                <tr>
                  <td style="height:17px;" />
                </tr>
                <tr>
                  <!-- １－２－１）商品名 -->
                  <td class="pretitleCellStyle borderCellStyle" style="width: 148px;">
                    {{ $t("F00204.S029")}}
                  </td>
                  <!-- １－２－２）検索条件 -->
                  <td class="inputItemSearchCellStyle borderCellStyle">
                    <input type="text" v-model="searchName" id="inputone" tabindex="201" @input="inputLimit(searchName,40)"
                    :placeholder="placeholderSearchCond"
                    />
                  </td>
                  <!-- スペース -->
                  <td class="preStandardCellSpaceStyle" />
                  <!-- １－２－３）検索する -->
                  <td>
                    <v-btn class="productSearchButton" color="#1ea7cb" @click="onClickSearch()" tabindex="202">
                      <v-icon id="searchIcon" large color="white">mdi-magnify</v-icon>
                      <span>
                        <font>{{ $t("F00204.S030")}}</font>
                      </span>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- １－３）対象商品構成エリア -->
          <div class="searchItemResultTableStyle">
            <table style="min-width: 706px;max-width: 706px;">
              <thead>
                <tr>
                  <td style="min-width:420px;" :key="0">{{ headers[0] }}</td>
                  <td style="min-width:286px;" :key="1">{{ headers[1] }}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in itemList" :key="index" @click="clickRow(item, index)"
                  :class="selectedIndex === index ? 'selectedItem' : ''">
                  <td style="min-width:420px;">{{ item.displayName.kanji }}</td>
                  <td style="min-width:282px" class="NumericStyle">{{ item.productId }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-fotter">
          <v-spacer></v-spacer>
          <!-- 「戻る」ボタン -->
          <v-btn class="button dialog-fotter-button-gray footerButtonStyle" @click="close()" tabindex="203">
            {{ $t("O00004.S003") }}
          </v-btn>
          <!-- 「OK」ボタン -->
          <v-btn class="button dialog-fotter-button-orange footerButtonStyle" @click="onClickOk()"
            v-bind:disabled="!Object.keys(selectedItem).length" tabindex="204">
            {{ $t("O00004.S004") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>

