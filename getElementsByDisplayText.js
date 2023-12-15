/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/

function getElementsByDisplayText(labels = []) {
    // 取得するHTMLタグとtypeを定義
    const targetType = `
        input[type="text"], input[type="password"], input[type="email"], input[type="tel"],
        input[type="url"], input[type="number"], textarea, select
        `
    // 取得した要素を格納するリスト
    let targetElements = []

    // 各レコードが格納されているdlタグ要素を全取得
    const dlTags = document.getElementsByTagName('dl')
    labels.forEach(label => {
        for (i = 0; i < dlTags.length; i++) {
            const element = dlTags[i]
            if (element.getElementsByTagName('dt')[0].textContent.trim() === label) {
                // labelが一致したら、その要素を取得
                // 住所など、複数の要素が紐づいている場合があるのでquerySelectorAll
                const pushElements = element.querySelectorAll(targetType);
                pushElements.forEach(pushElement => {
                    targetElements.push(pushElement)
                });
            };
        };
    });
    return targetElements;
};