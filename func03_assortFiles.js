/**
 * 最終更新日: 20221225
 * 
 * 「編集シート」のボタンに連動
 * 編集シートで編集したファイルのリネームとフォルダへの移動を同時に行う
 * 
 * @params {Boolean} check - 関数実行時に確認プロンプトを表示するかどうかをチェック（初期値trueでプロンプト表示）
 */
function assortFiles(check = true) {

  // 確認プロンプトの表示
  if(check === true) {
    const res = Ui.showYesNoAlert('確認', 'ファイルのリネームと移動を実行しますか？');
    if(res === false) return;
  }

  // 編集シートのレコードを読み込み、fileRecordsクラスオブジェクトを生成する
  const records = new SheetEdit().readRecords();
  const assortFileRecords = new FileRecords(records);
  const deleteFileRecords = new FileRecords(records);

  // ファイルのリネーム・移動を行う
  assortFileRecords.setAssortFileRecords();
  assortFileRecords.renameFiles();
  assortFileRecords.moveFiles();

  // ファイルの削除を行う
  deleteFileRecords.setDeleteFileRecords();
  // deleteFileRecords.deleteFiles();

  // ファイル情報シートに情報を書き込む
  const sheetFilesInfo = new SheetFilesInfo();
  const filesInfo = assortFileRecords.generateFilesInfo()
  sheetFilesInfo.addRecords(filesInfo);

  // 完了したら編集シートのレコードを更新する
  Utilities.sleep(3000);
  loadFileRecords(check = false);

}