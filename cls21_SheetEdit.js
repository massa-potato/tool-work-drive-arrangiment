class SheetEdit {
 /**
 * コンストラクタ
*/
  constructor() {
    this.name = SHEET.EDIT.NAME;
    this.headerRows = SHEET.EDIT.HEADER_ROWS;
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
   * シートのヘッダー行以下のレコードを削除するメソッド
   * （データの入力規則は残る）
   */
  clearRecords() {
    const sheet = this.getSheet();
    const range = sheet.getRange(this.headerRows + 1, 1, sheet.getLastRow() , sheet.getLastColumn());
    range.clearContent();
  }

  /**
   * シートのヘッダー行以下のフォーマットを変更するメソッド
   * columnsNo_Groupで配列で列を指定して、その列に対して適用
   */
  setFormat() {
    const sheet = this.getSheet();
  
    // 文字の折り返しを「切り詰めに変更」
    const columnsNo_Group1 = [COLUMN.EDIT.URL.NO, COLUMN.EDIT.ID.NO];
    columnsNo_Group1.forEach(columnNo => 
      sheet.getRange(this.headerRows + 1, columnNo, sheet.getLastRow()).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    );

    // 文字色をグレーに変更
    const columnsNo_Group2 = [COLUMN.EDIT.SRC_NAME.NO, COLUMN.EDIT.URL.NO, COLUMN.EDIT.ID.NO];
    columnsNo_Group2.forEach(columnNo => 
      sheet.getRange(this.headerRows + 1, columnNo, sheet.getLastRow()).setFontColor('#808080')
    );
  }

}


/*
 * テスト関数 
 */

function test_getSheet() {
  const sheet = new SheetEdit();
  console.log(sheet.getSheet().getName());
}

function test_writeRecords() {
  const records = [
    ['aaa', 1, 1],
    ['bbb', 2, 2],
    ['ccc', 3, 3],
  ]
  const sheet = new SheetEdit();
  sheet.writeRecords(records);
}

function test_clearRecords() {
  const sheet = new SheetEdit();
  sheet.clearRecords();
}

function test_setFormat() {
  const sheet = new SheetEdit();
  sheet.setFormat();
}

function test_readRecords() {
  const sheet = new SheetEdit();
  const records = sheet.readRecords();
  console.log(records);
}