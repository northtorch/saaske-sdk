function convertUrlsToImages(imgSize = 50) {
    function replaceUrlsWithImgTags() {
        // URL レコードの a タグを全取得
        const aTags = document.getElementsByClassName("type_url");

        for (let i = 0; i < aTags.length; i++) {
            // a タグ全体を取得し、URL部分のみを抽出
            const aTag = aTags[i].querySelector('a');
            const imgSrc = aTag.getAttribute('href');

            // img タグを作成して、画像をセット
            const imgTag = document.createElement('img');
            imgTag.setAttribute("src", imgSrc);
            imgTag.setAttribute("width", imgSize);

            // a タグを img タグに置き換え
            aTag.parentNode.replaceChild(imgTag, aTag);
        }
    }
    window.addEventListener('load', replaceUrlsWithImgTags);

    // ページネーションで移動したときにも反映させる
    // ajaxComplete でページの変遷後の状態を検出
    $(document).ajaxComplete(function () {
        replaceUrlsWithImgTags();
    });
}

convertUrlsToImages();