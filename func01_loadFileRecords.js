/**
 * 最終更新日: 20221225
 * 
 * 「編集シート」のボタンに連動
 * 指定したフォルダIDのファイル一覧を取得して、編集シートに一覧で書き出す関数
 * 
 * @params {Boolean} check - 関数実行時に確認プロンプトを表示するかどうかをチェック（初期値trueでプロンプト表示）
 * 
 * ※他の関数から呼び出す時は check = false
 */
function loadFileRecords(check = true) {

  // 確認プロンプトの表示
  if(check === true) {
    const res = Ui.showYesNoAlert('確認', 'ファイル一覧を更新しますか？');
    if(res === false) return;
  }

  // ドライブからファイル一覧レコードを取得
  const records = new DriveSrcFolder().generateFileRecords();
 
  // 編集シートのヘッダー行以下にファイル一覧レコードを書き込み
  const sheet = new SheetEdit();
  sheet.clearRecords();
  sheet.writeRecords(records);

  // 編集シートのフォーマットを設定
  sheet.setFormat();
}
