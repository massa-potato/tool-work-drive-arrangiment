/**
 * 最終更新日: 20221224
 * 
 *「編集シート」のボタンに連動
 * 指定したフォルダIDのフォルダ一覧を取得して、フォルダ一覧シートに書き出す関数。
 */
function loadFolders() {

  // ドライブからファイル一覧レコードを取得
  const records = new DriveSrcFolder().generateFolderRecords()
 
  // フォルダ情報シートのヘッダー行以下にフォルダ情報の一覧を書き込み
  const sheet = new SheetFoldersInfo();
  sheet.clearRecords();
  sheet.writeRecords(records);
}
