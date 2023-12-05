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

function addLoader(innerText = 'Now Loading') {
    function addDiv() {
        // HTMLコードを文字列として保存
        const htmlString = `
        <div id="loading" class="loading-screen" style="display: none;">
            <div class="loader" style="border-top: 5px solid rgb(102, 173, 204);"></div>
            <div id="loading-text" class="loading-text">Now Loading</div>
        </div>
        `;

        // 新しいdiv要素を作成し、HTMLコードを設定
        const newDiv = document.createElement('div');
        newDiv.innerHTML = htmlString;

        // 作成したdiv要素をbodyの最後に追加
        document.body.appendChild(newDiv);
    }

    function getMainColor() {
        const rootStyle = getComputedStyle(document.documentElement);
        const mainColor = rootStyle.getPropertyValue('--main-color').trim();
        return mainColor
    }

    // ローダーの色を変更する
    function changeLoaderColor() {
        const loader = document.querySelector('.loader');
        const mainColor = getMainColor()

        // `.loader`要素の`border-top`の色を変更
        if (loader) {
            loader.style.borderTop = '5px solid ' + mainColor;
        };
    };

    // ローディングテキストをセットする
    function setLoadingText() {
        document.getElementById('loading-text').textContent = innerText;
    };

    function main() {
        addDiv();
        addLoader();
        changeLoaderColor();
        setLoadingText();
    }
    window.addEventListener('DOMContentLoaded', main)
}
addLoader();