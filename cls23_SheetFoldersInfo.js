class SheetFoldersInfo {
  /**
   * シートオブジェクトを取得するメソッド
   *
   * @return {Object} sheet - シートオブジェクト
   */
  constructor() {
    this.name = SHEET.FOLDERS_INFO.NAME;
    this.headerRows = SHEET.FOLDERS_INFO.HEADER_ROWS;
  }

  /**
   * シートオブジェクトを取得するメソッド
   *
   * @return {Object} sheet - シートオブジェクト
   */
  getSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.name);
    return sheet;
  }

   /**
   * ヘッダー行以下のレコードを二次元配列で取得するメソッド
   *
   * @return {Object[][]} records - 二次元配列
   */
  readRecords() {
    const sheet = this.getSheet();
    const range = sheet.getRange(this.headerRows + 1, 1, sheet.getLastRow(), sheet.getLastColumn());
    const records = range.getValues();
    return records;
  }

  /**
   * 二次元配列をレコードとして受け取り、シートのヘッダー行以下に書き込むメソッド
   *
   * @params {Object[][]} records - 書き込むレコードとなる二次元配列
   */
  writeRecords(records) {
    if(records.length === 0) return;
    const sheet = this.getSheet();
    const range = sheet.getRange(this.headerRows + 1, 1, records.length, records[0].length);
    range.setValues(records);
  }

  /**
   * シートのヘッダー行以下のレコードを削除するメソッド（データの入力規則は残る）
   */
  clearRecords() {
    const sheet = this.getSheet();
    const range = sheet.getRange(this.headerRows + 1, 1, sheet.getLastRow() , sheet.getLastColumn());
    range.clearContent();
  }

  /**
   * フォルダ一覧データを参照し、フォルダ名からフォルダIDを検索して返すメソッド
   *
   * @params {String} folderName - 検索したいフォルダ名
   * @return {String} - フォルダ名が見つかればそのフォルダID, 見つからなければ空文字列
   */
  getIdByName(folderName) {
    const foldersInfo = this.readRecords();
    for(const folderInfo of foldersInfo) {
      const name = folderInfo[COLUMN.FOLDERS_INFO.NAME.IDX];
      const id = folderInfo[COLUMN.FOLDERS_INFO.ID.IDX];
      if(folderName === name) return id;
    }
    return '';
  } 

}


/*
 * テスト関数 
 */

function test_getSheet() {
  const sheet = new SheetFoldersInfo();
  console.log(sheet.getSheet().getName());
}

function test_writeRecords() {
  const records = [
    ['aaa', 1, 1],
    ['bbb', 2, 2],
    ['ccc', 3, 3],
  ]
  const sheet = new SheetFoldersInfo();
  sheet.writeRecords(records);
}

function test_clearRecords() {
  const sheet = new SheetFoldersInfo();
  sheet.clearRecords();
}
