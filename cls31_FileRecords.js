class FileRecords {
 /**
 * コンストラクタ
 */
  constructor(records = false) {
    this.records = records ? records : this.setTestRecords();
  }

  /**
   * テストレコードをプロパティrecordsにセットする
   *
   * @return {Object[][]} this.records - 二次元配列
   */
  setTestRecords() {
    // const header = [srcName, date, name, suffix_1, suffix_2, prefix, del, dest, url, id];
    this.records = [
      ['fileA', '20221010', 'file', 'A', '' , '' , '' , 'dest1', 'urlA', 'idA'],
      ['fileB', '20221010', 'file', 'B', 'ssss' , '' , '' , 'dest2', 'urlB', 'idB'],
      ['fileC', '20221010', 'file', 'C', 'ssss' , 'pppp' , 'yy' , 'dest3' , 'urlC', 'idC'],
      ['fileD', '20221010', 'file', 'D', 'ssss' , '' , '' , '' , 'urlD', 'idD'],
      ['fileE', '20221010', 'file', 'E', '' , '' , true , '' , 'urlE', 'idE'],
      ['fileF', '20221010', '' , '' , '' , '' , true , 'dest' , 'urlF', 'idF'],
      ['fileG', '20221010', '' , '' , '' , '' , true , '' , 'urlG', 'idG']
    ];
    return this.records;
  }

   /**
   * プロパティrecordから、リネームだけを行うレコードを抽出して、プロパティにセットする
   * 条件：「名前」の列が空でない
   *
   * @return {Object[][]} this.records - 二次元配列
   */
  setRenameFileRecords() {
    const records = this.records;
    this.records = records.filter(r => r[COLUMN.EDIT.NAME.IDX]);
    return this.records;
  }

  /**
   * プロパティrecordsから、移動処理を適用するためのを行うためのレコードを抽出して、プロパティにセットする
   * 条件：「分類先」の列が空でない
   *
   * @return {Object[][]} this.records - 二次元配列
   */
  setAssortFileRecords() {
    const records = this.records;
    this.records = records.filter(r => r[COLUMN.EDIT.DEST.IDX]);
    return this.records;
  }

  /**
   * プロパティrecordから、assortFiles()関数で削除処理を行うレコードを抽出して、プロパティにセットする
   * 条件：「削除」の列にチェックが入っている・「名前」列と「分類先」列が空
   *
   * @return {Object[][]} this.records - 二次元配列
   */
  setDeleteFileRecords() {
    const records = this.records;
    this.records = records.filter(v => 
      v[COLUMN.EDIT.DEL.IDX] && !v[COLUMN.EDIT.NAME.IDX] && !v[COLUMN.EDIT.DEST.IDX]
    );
    return this.records;
  }

  /**
   * プロパティrecordsの各レコードに対して、ドライブのファイルIDをもとにファイル名を変更する
   */
  renameFiles() {
    const renameFilesInfo = [];
    for(const record of this.records) {
      const nameArr = [
        record[COLUMN.EDIT.DATE.IDX],
        record[COLUMN.EDIT.PREFIX.IDX],
        record[COLUMN.EDIT.NAME.IDX],
        record[COLUMN.EDIT.SUFFIX_1.IDX],
        record[COLUMN.EDIT.SUFFIX_2.IDX]
      ].filter(Boolean);

      const name = `${nameArr.join('_')}.pdf`;
      const id = record[COLUMN.EDIT.ID.IDX];
      const file = DriveApp.getFileById(id)
      renameFilesInfo.push([file, name]);
    }

    console.log(renameFilesInfo); // テスト用

    renameFilesInfo.forEach(v =>
      v[0].setName(v[1])
    );

  }

 /**
 * プロパティrecordの各レコードに対して、ドライブのファイルIDと移動先フォルダIDをもとにファイルを移動する
 */
  moveFiles() {
    const moveFilesInfo = [];
    const foldersInfo = new SheetFoldersInfo();

    for(const record of this.records) {
      const file = DriveApp.getFileById(record[COLUMN.EDIT.ID.IDX])
      const folderId = foldersInfo.getIdByName(record[COLUMN.EDIT.DEST.IDX]);
      const destFolder = DriveApp.getFolderById(folderId);
      moveFilesInfo.push([file, destFolder]);
    }

    console.log(moveFilesInfo); // テスト用

    moveFilesInfo.forEach(v =>
      v[0].moveTo(v[1])
    );
  }

 /**
 * プロパティrecordの各レコードに対して、ドライブのファイルIDをもとに削除する
 * [TODO]未作成
 */
  deleteFiles() { 
    // 削除処理
  }

 /**
 * プロパティrecordの各レコードに対して、ファイル情報シートに格納するための二次元配列を生成する
 * 
 * @return {Object[][]} this.records - 二次元配列
 */
 generateFilesInfo() {
   const filesInfo = this.records.map(v =>
    [v[COLUMN.EDIT.SUFFIX_1.IDX], v[COLUMN.EDIT.SUFFIX_2.IDX], v[COLUMN.EDIT.PREFIX.IDX]]
   ).filter(v => v[0] || v[1] || v[2]);
   return filesInfo;
 }

}


/*
  テスト関数
 */

function test_constructFileRecords() {
  const records = [['a', 'a', 'a'], ['b', 'b', 'b']];
  const fileRecords = new FileRecords(records);
  console.log(fileRecords);

  const testRecords = new FileRecords();
  console.log(testRecords.records);
}

function test_generateAssortFileRecords() {
  const testRecords = new FileRecords();
  testRecords.generateAssortFileRecords();
  console.log(testRecords.records);
}

function test_generateDeleteFileRecords() {
  const testRecords = new FileRecords();
  testRecords.generateDeleteFileRecords();
  console.log(testRecords.records);
}

function test_renameFiles() {
  const testRecords = new FileRecords();
  testRecords.generateAssortFileRecords();
  testRecords.renameFiles();
}

function test_moveFiles() {
  const testRecords = new FileRecords();
  testRecords.generateAssortFileRecords();
  testRecords.moveFiles();
}

function test_generateFilesInfo() {
  const testRecords = new FileRecords();
  const filesInfo = testRecords.generateFilesInfo();
  console.log(filesInfo);
}