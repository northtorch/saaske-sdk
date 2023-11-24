function setClearButton(caption, labels) {
    // ボタンオブジェクトを作成
    function createButton(innerText, name) {
        const newButton = document.createElement('BUTTON');
        newButton.innerHTML = innerText;
        newButton.id = name;
        newButton.className = name;
        return newButton;
    };

    // textContentから要素を取得する
    function findElementIdByText(labels) {
        // 全要素を取得
        const allElements = document.body.getElementsByTagName('*');
        const matchingElements = [];

        for (let element of allElements) {
            labels.forEach(label => {
                if (element.textContent.trim() === label) {
                    // 指定のラベルの要素があればリストに追加
                    matchingElements.push(element);
                };
            });
        };
        return matchingElements;
    };

    function createClearButton(caption, elmToDelete) {
        // クリアボタンを作成して登録ボタンの後に配置
        const clearButton = createButton(caption, 'clear')
        clearButton.style.padding = '0.38rem 2rem';
        clearButton.style.marginBottom = '3px';
        const baseElement = document.querySelector('.submit_box.sticky.fixed');
        baseElement.appendChild(clearButton);

        clearButton.addEventListener('click', function (event) {
            // input タグの値をクリア
            elmToDelete.forEach(elm => {
                const inputTag = elm.getElementsByTagName('input');
                if (inputTag[0]) {
                    try {
                        inputTag[0].value = '';
                    } catch (error) {
                        console.error(error);
                    }
                    // 登録ボタンが発火を防ぐ
                    event.preventDefault();
                };
            });
        });
    };

    function main() {
        const elements = findElementIdByText(labels);
        createClearButton(caption, elements);
    };

    // ロード後に実行
    window.addEventListener('DOMContentLoaded', main);
}

const labels = ['URL', '一行テキスト'];
setClearButton('クリア', labels);
