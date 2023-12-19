/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/

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
