class DriveSrcFolder {
  /**
   * コンストラクタ
   */
  constructor() {
    this.id = DRIVE.SRC_FOLDER.ID;
  }

  /**
   * ドライブのソースフォルダのidからフォルダオブジェクトを取得する
   *
   * @return {Object} srcFolder - フォルダオブジェクト
   */
  getSrcFolder() {
    const srcFolder = DriveApp.getFolderById(this.id);
    return srcFolder;
  }

  /**
   * ソースフォルダからファイル一覧を取得する
   *
   * @return {Object} files - ファイルイテレータ
   */
  loadFiles() {
    const srcFolder = this.getSrcFolder();
    const files = srcFolder.getFiles();
    return files;
  }

  /**
   * ソースフォルダからフォルダ一覧を取得する
   *
   * @return {Object} files - フォルダイテレータ
   */
  loadFolders() {
    const srcFolder = this.getSrcFolder();
    const folders = srcFolder.getFolders();
    return folders;
  }

  /**
   * 「編集シート」に書き込むためのファイル一覧レコードを作成する
   *
   * @return {Object[][]} filesArr - 書き込み用のファイル一覧レコード（昇順）
   */
  generateFileRecords() {
    const files = this.loadFiles();

    const filesArr = [];
    while(files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();

      const data = [];
      data[COLUMN.EDIT.SRC_NAME.IDX] = fileName;
      data[COLUMN.EDIT.DATE.IDX] = fileName.substring(0, 8);
      data[COLUMN.EDIT.NAME.IDX] = fileName.slice(9, -4);
      data[COLUMN.EDIT.URL.IDX] = file.getUrl();
      data[COLUMN.EDIT.ID.IDX] = file.getId();

      filesArr.push(data);
    }

    return filesArr.sort();
  }

  /**
   * 「分類先フォルダ一覧シート」に書き込むためのフォルダ一覧レコードを作成する
   *
   * @return {Object[][]} foldersArr - 書き込み用のフォルダ一覧レコード（昇順）
   */
  generateFolderRecords() {
    const folders = this.loadFolders();

    const foldersArr = [];
    while(folders.hasNext()) {
      const folder = folders.next();

      const data = [];
      data[COLUMN.FOLDERS_INFO.NAME.IDX] = folder.getName();
      data[COLUMN.FOLDERS_INFO.ID.IDX] = folder.getId();

      foldersArr.push(data);
    }

    return foldersArr.sort();

  }

}


/*
 * テスト関数 
 */

function test_getSrcFolder() {
  const srsFolder = new DriveSrcFolder().getSrcFolder();
  console.log(srsFolder.getName());
}

function test_loadFiles() {
  const files = new DriveSrcFolder().loadFiles();
  while(files.hasNext()){
    file = files.next();
    console.log(file.getName());
  }
}

function test_loadFolders() {
  const folders = new DriveSrcFolder().loadFolders();
  while(folders.hasNext()){
    folder = folders.next();
    console.log(folder.getName());
  }
}

function test_generateFileRecords() {
  const records = new DriveSrcFolder().generateFileRecords();
  console.log(records);
}

function test_generateFolderRecords() {
  const records = new DriveSrcFolder().generateFolderRecords();
  console.log(records);
}