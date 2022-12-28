class Ui {
  /**
   * 「はい」「いいえ」を確認するアラートダイアログを表示する
   * 
   * @param {String} title - ダイアログのタイトル
   * @param {String} prompt - ダイアログのメッセージ
   * @return {Boolean} - 「はい」「いいえ」の結果をTrue/Falseで返す
  */
  static showYesNoAlert(title, prompt) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(title, prompt, ui.ButtonSet.YES_NO);

    switch (response) {
      case ui.Button.YES:
        console.log('読み込みを実行します');
        return true;
      case ui.Button.NO:
        return false;
    }
  }

}


/*
 * テスト関数 
 */

function test_showYesNoAlert() {
  const title = '確認';
  const prompt = '実行しますか？';
  const response = Ui.showAlert(title, prompt);  
  console.log(response);
}