/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/
// ↓↓↓ 以下追加したコード ↓↓↓
function getElementsByDisplayText(baseList = []) {
    // 引数で受け取った要素が配列かどうかを確認
    if (!Array.isArray(baseList)) {
        throw new Error('引数は配列である必要があります');
    };

    // すべてのdlタグを取得
    const dlTags = document.getElementsByTagName('dl');
    // 結果を格納する配列
    let targetElements = [];

    // すべてのdlタグをループ
    Array.from(dlTags).forEach(dlTag => {
        // レコード項目名部分を取得
        const dtTag = dlTag.getElementsByTagName('dt')[0]
        const dtText = dtTag.textContent.trim()
        // テキストボックス等を取得
        const ddTag = dlTag.getElementsByTagName('dd')[0]

        if (baseList.length == 0) {
            // 取得対象が無指定なら全取得
            targetElements.push(ddTag);
        } else {
            // 取得対象の指定ありなら取得対象リストに合致しているもののみ取得
            if (dtText.includes(baseList)) {
                targetElements.push(ddTag);
            };
        };
    });
    return targetElements;
};

function getDetailElms(targetElement) {
    // 取得するHTMLタグとtypeを選択
    const targetTagAndType = `
    input[type="text"], input[type="password"], input[type="email"], input[type="tel"],
    input[type="url"], input[type="number"], input[type="checkbox"], input[type="radio"],
    textarea, select, #tag_group, a
    `

    // 取得対象となるHTMLタグをすべて取得
    const target = targetElement.querySelectorAll(targetTagAndType)
    if (target.length == 0) {
        // 該当なしならnullを返す
        return null;
    } else {
        // 該当ありなら取得したNodeListを返す
        return target;
    };
};

function getTextFromSelection(selectTagElm) {
    // select2 の元となる要素のidを取得
    const targetId = selectTagElm.id

    // テキスト部分を抽出
    const $originalSelect = $(`#${targetId}`);
    const selectedText = $originalSelect.find('option:selected').text();
    return selectedText;
}
// ↑↑↑ ここまで追加したコード ↑↑↑

// トーストを表示するHTMLタグをBodyタグ内に追加する
function addToastHtmlTag(toastHeadline, toastMessage) {
    const htmlString = `
        <div class="toast-header">
            <strong>${toastHeadline}</strong>
            <button type="button" class="toast-close">
                <span aria-hidden="true">×</span>
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
    addClickEvent();
}
// トーストを表示する
function showToast() {
    const toastElement = document.querySelector('#toast')
    toastElement.classList.add('toastFadeIn');
    toastElement.style.visibility = 'visible';
    // 3秒後に自動的に閉じる
    setTimeout(function () {
        toastElement.style.visibility = 'hidden';
        toastElement.classList.remove('toastFadeIn')
    }, 3000);
}

// 変数定義
const toastHeadline = 'タイトル';
const toastMessage = 'メッセージ';
window.addEventListener('DOMContentLoaded', () => {
    addToastHtmlTag(toastHeadline, toastMessage);
    // 削除したコード
    // showToast();
});
window.addEventListener('load', () => {
    // 追加したコード
    const oneLinerTextBox = getElementsByDisplayText(['一行テキスト'])[0]
    oneLinerTextBox.addEventListener('click', () => {
        showToast();
    });
});