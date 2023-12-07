/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/

async function fetchData(url, method) {
    try {
        const response = await fetch(url, { method: method });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        return null;
    };
};

async function main(url, method) {
    const data = await fetchData(url, method);
    if (data) {
        // alert(JSON.stringify(data));
        alert(data['description']['bodyText'])
    } else {
        console.log('データの取得に失敗しました');
    };
};

const url = `https://weather.tsukumijima.net/api/forecast/city/016010`;
const method = 'GET';

main(url, method);