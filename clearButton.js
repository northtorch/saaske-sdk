function setClearButton(caption, labels) {
    // ボタンオブジェクトを作成
    function createButton(innerText, name) {
        const newButton = document.createElement('BUTTON');
        newButton.innerHTML = innerText;
        newButton.id = name;
        newButton.className = name;
        return newButton;
    };

    // フォームを初期化
    function initForm(labels) {
        // 削除対象のタグの種類 / type を指定
        const targetType = 'input[type="text"], input[type="password"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], textarea, select'
        // 削除対象の要素を格納する配列
        let targetElements = []

        // labelの指定があれば、そのlabelの要素のみを取得
        if (labels.length) {
            // dlタグの要素を全取得
            const dlList = document.getElementsByTagName('dl')
            labels.forEach(label => {
                for (i = 0; i < dlList.length; i++) {
                    const element = dlList[i]
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
        } else {
            // label無指定なら、全要素を取得
            targetElements = document.querySelectorAll(targetType)
        };
        for (i = 0; targetElements.length > i; i++) {
            const elm = targetElements[i];
            if (elm.tagName === 'SELECT') {
                // selectタグの場合は初期値に戻す
                elm.selectedIndex = -1;
            } else {
                // selectタグ以外なら値を空白にする
                try {
                    elm.value = '';
                } catch (error) {
                    console.error(error);
                };
            };
        };
    };

    function createClearButton(caption, labels) {
        // クリアボタンを作成して登録ボタンの後に配置
        const clearButton = createButton(caption, 'clear')
        clearButton.style.padding = '0.38rem 2rem';
        clearButton.style.marginBottom = '3px';
        const baseElement = document.querySelector('.submit_box.sticky.fixed');
        baseElement.appendChild(clearButton);

        clearButton.addEventListener('click', function (event) {
            // フォームを初期化
            initForm(labels);
            // 登録ボタンの発火を防ぐ
            event.preventDefault();
        });
    };

    // DOMが完全にロードされた後に実行
    window.addEventListener('DOMContentLoaded', function () {
        createClearButton(caption, labels);
    });
};

const labels = ['URL', '一行テキスト'];
setClearButton('クリア', labels);