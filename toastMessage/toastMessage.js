/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/

// トーストを表示するHTMLタグをBodyタグ内に追加する
function addToastHtmlTag(toastHeadline, toastMessage) {
    const htmlString = `
		<div class="toast-header">
			<strong>${toastHeadline}</strong>
			<button type="button" class="toast-close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div>
			${toastMessage}
		</div>
	`
    // トーストを格納するdivタグを生成
    const toastDiv = document.createElement('div');
    toastDiv.id = 'toast';
    toastDiv.className = 'toast';
    toastDiv.innerHTML = htmlString;

    // body要素に追加する
    document.body.appendChild(toastDiv);

    // 設置したトーストを取得
    const closeBtn = toastDiv.querySelector('.toast-close');

    // 閉じるボタンでトーストを閉じる
    closeBtn.addEventListener('click', () => {
        toastDiv.style.visibility = 'hidden';
    });
}

// トーストを表示する
function showToast() {
    toastElement.classList.add('toastFadeIn');
    toastElement.style.visibility = 'visible';
    // 3秒後に自動的に閉じる
    setTimeout(function () {
        toastElement.style.visibility = 'hidden';
    }, 3000);
}

// 変数定義
const toastHeadline = 'タイトル';
const toastMessage = 'メッセージ';

window.addEventListener('DOMContentLoaded', () => {
    addToastHtmlTag(toastHeadline, toastMessage);
    showToast();
});