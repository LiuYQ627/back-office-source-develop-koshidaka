<!-- KSD V001.000 AS -->
<style scoped src="@/resource/static/css/ProductMaster/productLinkCodeDialog.css"></style>
<script type="text/javascript" src="@/resource/static/js/ProductMaster/productLinkCodeDialog.js"></script>
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1147px !important"
      persistent>
      <v-card class="presetSearchBasesize">
        <v-card-title class="headline dialog-line-blue">
          <font class="dialog-title">{{ $t("F00108.S181") }}</font>
        </v-card-title>
        <v-card-text
          class="presetContentStyle"
          style="height: 390px;">
          <div class="searchConditionsStyle">
            <table>
              <tbody>
                <tr>
                  <td
                    class="pretitleCellStyle borderCellStyle"
                    style="width: 148px;">
                    {{ $t("F00108.S181") }}
                  </td>
                  <td class="inputItemSearchCellStyle borderCellStyle">
                    <input
                      type="text"
                      v-model="dataModel.search"
                      id="inputone"
                      tabindex="303"
                      @input="(e) => inputLimit(e, 40, dataModel, 'search')"
                      :placeholder="this.$i18n.t('F00108.S182')"
                    >
                  </td>
                  <td class="preStandardCellSpaceStyle" />
                  <td>
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
                        <font>{{ $t("F00108.S183") }}</font>
                      </span>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="searchItemResultTableStyle">
            <table>
              <thead>
                <tr>
                  <th
                    class="title-cell-style-10 border-cell-style-3 width-700-left"
                    >
                    {{ $t("F00108.S181") }}
                  </th>
                  <th
                    class="title-cell-style-10 border-cell-style-3 width-227-left">
                    {{ $t("F00108.S004") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in itemList" :key="index" style="height: 50px" @click="clickRow(item, index)"
                  :class="selectedIndex === index ? 'selectedItem' : ''">
                  <td class="width-700-left">{{item.displayName.kanji}}</td>
                  <td :class="itemList.length > 6 ? 'width-204-left' : 'width-227-left'">{{item.productId}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-fotter">
          <v-spacer/>
          <v-btn
            class="button dialog-fotter-button-gray footerButtonStyle"
            @click="onClickReturn()"
            tabindex="202">
            {{ $t("O00004.S003") }}
          </v-btn>
          <v-btn
            class="button dialog-fotter-button-orange footerButtonStyle"
            @click="onClickSave()"
            :disabled="(!$root.approvalFlg && !$root.registerAuth) || !this.permissions.includes('CLOUDPOS_ITEM_UPDATE') || !Object.keys(selectedItem).length"
            tabindex="203">
            {{ $t("O00004.S008") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <popup ref="pop" />
  </div>
</template>
<!-- KSD V001.000 AE -->
