/**
 * 最終更新日: 20221225
 *
 * 「編集シート」のボタンに連動
 * 編集シートで編集したファイルのリネームのみを行う
 * 
 * @params {Boolean} check - 関数実行時に確認プロンプトを表示するかどうかをチェック（初期値trueでプロンプト表示）
 */
function renameFiles(check = true) {

  // 確認プロンプトの表示
  if(check === true) {
    const res = Ui.showYesNoAlert('確認', 'ファイルのリネームを実行しますか？');
    if(res === false) return;
  }

  // 編集シートのレコードを読み込み、fileRecordsクラスオブジェクトを生成する
  const records = new SheetEdit().readRecords();
  const fileRecords = new FileRecords(records);

  // ファイルのリネームを行う
  fileRecords.setRenameFileRecords();
  fileRecords.renameFiles();

  // ファイル情報シートに情報を書き込む
  const sheetFilesInfo = new SheetFilesInfo();
  const filesInfo = fileRecords.generateFilesInfo()
  sheetFilesInfo.addRecords(filesInfo);

  // 完了したら編集シートのレコードを更新する
  Utilities.sleep(3000);
  loadFileRecords(check = false);

}