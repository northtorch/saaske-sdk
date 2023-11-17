// ボタンオブジェクトを作成
function createButton(innerText, name) {
    let newButton = document.createElement('BUTTON');
    newButton.innerHTML = innerText;
    newButton.id = name;
    newButton.className = name;
    return newButton;
}

// クリアボタンを作成して登録ボタンの後に配置
function clearButton() {
    let clearButton = createButton('クリア', 'clear')
    clearButton.style.padding = '0.38rem 2rem';
    clearButton.style.marginBottom = '3px';
    let baseElement = document.querySelector(".submit_box.sticky.fixed");
    baseElement.appendChild(clearButton);

    // クリアボタンが押された場合の挙動を定義
    clearButton.addEventListener('click', function (event) {
        const excludeInputType = 'input:not([type="submit"]):not([type="hidden"])'
        const inputs = document.querySelectorAll(excludeInputType);
        // 「登録」以外の input 要素の値を空に設定
        inputs.forEach(input => {
            input.value = '';
        });
        // 登録ボタンが発火しないように制御
        event.preventDefault();
    });
}

window.addEventListener("DOMContentLoaded", clearButton);
