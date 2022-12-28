class SheetFilesInfo {
  /**
   * コンストラクタ
   */
  constructor() {
    this.name = SHEET.FILES_INFO.NAME;
    this.headerRows = SHEET.FILES_INFO.HEADER_ROWS;
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
   * 二次元配列をレコードとして受け取り、シートの最終行以下に書き込むメソッド
   *
   * @params {Object[][]} records - 書き込むレコードとなる二次元配列
   */
  addRecords(records) {
    if(records.length === 0) return;
    const sheet = this.getSheet();
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, records.length, records[0].length);
    range.setValues(records);
  }

}