<!-- KSD V001.000 AS -->
<style src="./../../static/css/CommonDesign/dialogImageUpload.css"></style>
<script type="text/javascript" src="./../../static/js/CommonDesign/dialogImageUpload.js"></script>
<template>
<div class="text-center">
    <v-dialog v-model="dialog" width="1000px !important" persistent>
        <v-card min-width="1000px" min-height="620px">
            <v-card-title class="headline dialog-line-blue">
                <font class="popup-title" style="font-size:22px;"><b>{{ tableHeaderTitle || $t("O00004.S016") }}</b></font>
            </v-card-title>

           <v-card-text class="contentStyle" style="margin-top: 0px;">
                <div class="flex-container" style="flex-direction: column; overflow: hidden;height: 531px; margin: 10px 5px 5px 0px">
                    <div>
                        <table id="courseDesc">
                            <tr>
                                <th>{{ $t("C00215.S060") }}</th>
                                <td>
                                <input class="dialogInput" type="text" tabindex="101" maxlength="64" @input="(e) => inputLimit(e, 64, model,'courseExplanatory1')"
                                ref="text1" id="text1" v-model="model.courseExplanatory1" :placeholder="$t('C00215.S044')" />
                                </td>
                            </tr>
                            <tr>
                                <th>{{ $t("C00215.S061") }}</th>
                                <td>
                                <input class="dialogInput" type="text" tabindex="102" maxlength="64" @input="(e) => inputLimit(e, 64, model, 'courseExplanatory2')"
                                ref="text2" v-model="model.courseExplanatory2" :placeholder="$t('C00215.S044')"  />
                                </td>
                            </tr>
                            <tr>
                                <th>{{ $t("C00215.S062") }}</th>
                                <td>
                                <input class="dialogInput" type="text" tabindex="103" maxlength="64" @input="(e) => inputLimit(e, 64, model, 'courseExplanatory3')"
                                ref="text3" v-model="model.courseExplanatory3" :placeholder="$t('C00215.S044')" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <img :src="uploadedImageUrl"
                        @change="uploadedImageUrlChange()"
                        v-show="uploadedImageUrl != null"
                        width="920px"
                        height="348px"
                    />
                </div>
            </v-card-text>

            <v-card-actions class="popup-fotter">
                <div
                    class="ml-2"
                    style="font-weight: normal;">
                    <file-input
                        id="popupBtAdd"
                        @change="handleImageUpload($event)"
                        class="dialogImageFileInput"
                        ref="handleImageUploadElem"
                        :title="$t('C00215.S063')"
                        tabindex="104"
                        large
                    ></file-input>
                </div>
                <v-spacer></v-spacer>
                <v-btn
                    class="button"
                    style="background-color: #565960; box-shadow: none;"
                    dark
                    @click="backFunction()"
                    tabindex="105"
                    id="popupBtBack"
                >
                    {{ $t("O00004.S003") }}
                </v-btn>
                <v-btn
                    class="button dialog-fotter-button-orange footerButtonStyle"
                    style="box-shadow: none;"
                    @click="exeFunction()"
                    tabindex="106"
                    id="popupBtExe"
                    :disabled="isSaveBtnDisabled"
                >
                    {{ $t("O00004.S004") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <popup ref="pop"/>
</div>
</template>
<!-- KSD V001.000 AE -->
