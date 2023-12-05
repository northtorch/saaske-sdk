/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/
// ローディング画面を表示する
function showLoadingScreen() {
    document.getElementById('loading').style.display = 'block';
};

// ローディング画面を隠す
function hideLoadingScreen() {
    document.getElementById('loading').style.display = 'none';
};

function addLoader() {
    // HTMLコードを文字列として保存
    const htmlString = `
    <div id="loading" class="loading-screen" style="display: none;">
        <div class="loading-screen"></div>
        <div id="custom-loader" class="custom-loader">
            <div><span></span></div>
            <div><span></span></div>
            <div><span></span></div>
            <div><span></span></div>
        </div>
    </div>
    `;

    // 新しいdiv要素を作成し、HTMLコードを設定
    const newDiv = document.createElement('div');
    newDiv.innerHTML = htmlString;

    // 作成したdiv要素をbodyの最後に追加
    document.body.appendChild(newDiv);
};
window.addEventListener("DOMContentLoaded", addLoader);