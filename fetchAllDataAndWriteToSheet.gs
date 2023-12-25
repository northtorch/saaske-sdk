/*!
 * SaaskeSDK
 * Copyright (c) North Torch Co.,ltd. 2023
 * Released under the MIT License.
 * ライセンスの全文は以下をご参照ください
 * LICENSE: https://github.com/northtorch/saaske-sdk/blob/main/LICENSE.md
 * README: https://github.com/northtorch/saaske-sdk/blob/main/readme.md
*/

function transposeArray(array) {
  // 転置（行と列の入れ替え）
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function reorderColumns(newOrder) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getDataRange();
  const data = range.getValues();

  // データを転置
  const transposedData = transposeArray(data);

  // 列数と同じだけの空の要素を持つ配列を作成
  let newColumns = new Array(transposedData.length).fill(null);

  // 未転記列のリスト
  let completeList = []
  // 新しい順序に基づいて列を埋める
  newOrder.forEach(function (order, index) {
    newColumns[order - 1] = transposedData[index];
    completeList.push(index)
  });

  // 未転記の列を最後尾に加える
  for (i = 0; i < newColumns.length; i++) {
    if (newColumns[i] == null) {
      for (let j = 0; j < transposedData.length; j++) {
        if (!completeList.includes(j)) {
          newColumns[i] = transposedData[j];
          completeList.push(j);
          break;
        };
      };
    };
  };

  // 再度転置して元の形に戻す
  const finalData = transposeArray(newColumns);

  // 並び替えたデータをシートにセットする
  range.setValues(finalData);
}

// 辞書から Key=name の value を抽出して返す
function extractNameFromDict(item) {
  if (typeof item === "object" && item != null && item.hasOwnProperty('name')) {
    return item.name;
  } else if (Array.isArray(item)) {
    // 配列だった場合には本関数を再帰的に適用
    // updateAccount, registAccountなどは配列に入っている
    return item.map(extractNameFromDict);
  } else {
    return item;
  };
}

// yyyymmdd を文字列で返す
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1; // 月は0はじまり
  let day = now.getDate();

  // 月と日が一桁なら、先頭に0を追加
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day

  // yyyymmdd 形式の文字列で返す
  return `${year}${month}${day}`;
}

function createNewSheet(sheetName = getCurrentDate()) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const oldSheet = spreadsheet.getSheetByName(sheetName);

  if (oldSheet) {
    spreadsheet.deleteSheet(oldSheet)
  };

  const sheet = spreadsheet.insertSheet(sheetName);
  return sheet;
}

function getSaaskeApiData(apiKey, apiToken, appKey, next) {
  let baseUrl = `https://api.works.app/v1/${appKey}/records`;

  // 1000レコードを超える場合に分割される
  // その場合、ページ番号をクエリパラメータで指定
  if (next != null) {
    const queryParams = `customKey=${next}`
    url = baseUrl + '?' + queryParams
  } else {
    url = baseUrl;
  };
  const headers = {
    'x-api-key': apiKey,
    'x-token': apiToken
  };
  const options = {
    'method': 'get',
    'headers': headers
  };
  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  return data;
}

function writeDataToSheet(data, index) {
  const allRecord = data.records;
  const sheet = createNewSheet();
  let headers = Object.keys(allRecord[0]);
  let values = allRecord.map(function (item) {
    return headers.map(function (header) {
      return item[header];
    });
  });
  // 辞書があれば、key=nameの値を採用する
  values = values.map(row => row.map(extractNameFromDict));

  // 1ページ目の場合のみ実行
  if (index == 0) {
    // 一行目に見出しを配置
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
  };

  // 最終行を取得
  const lastRow = sheet.getLastRow();
  // 二行目以降に値を設定
  sheet.getRange(lastRow + 1, 1, values.length, headers.length).setValues(values);

  next = data.next;

  return next;
}

function translateFirstRow(translationMap) {
  // スプレッドシートを開く
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 最初の行を取得
  const firstRowRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const firstRow = firstRowRange.getValues()[0];

  // 文字列を置き換える
  const translatedRow = firstRow.map(item => translationMap[item] || item);

  // シート上の値を更新する
  firstRowRange.setValues([translatedRow])

  // 変換された行のデータをログに出力
  Logger.log(translatedRow);

}

function main() {
  // SaaskeAPI 設定値
  const apiKey = '';
  const apiToken = '';
  const appKey = '';
  const newOrder = [];
  const translationMap = {};

  // データを取得する
  let next = null;
  for (let index = 0; true; index++) {
    const data = getSaaskeApiData(apiKey, apiToken, appKey, next);
    next = writeDataToSheet(data, index);

    // 1000件以上レコードがあるとnext!=undefinedになる
    if (typeof next === "undefined") {
      break;
    };
  };

  // 見出しを変更
  translateFirstRow(translationMap);

  // 列の並び順を変更
  reorderColumns(newOrder);
}