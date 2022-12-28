const DRIVE = Object.freeze({
  SRC_FOLDER: {
    ID:'<ドライブのフォルダIDを入力>',
    URL:'<ドライブのフォルダURLを入力>'
  }
});

const SHEET = Object.freeze({
  EDIT: {NAME: '編集シート', HEADER_ROWS: 5},
  FILES_INFO: {NAME: 'ファイル情報一覧', HEADER_ROWS: 1},
  FOLDERS_INFO: {NAME: '分類先フォルダ一覧', HEADER_ROWS: 1}
});

const COLUMN = Object.freeze({
  EDIT: {
    SRC_NAME: {COL: 'A', NO: 1, IDX: 0, NAME: '変更前ファイル名'},
    DATE:     {COL: 'B', NO: 2, IDX: 1, NAME: '日付'},
    NAME:     {COL: 'C', NO: 3, IDX: 2, NAME: 'ファイル名'},
    SUFFIX_1: {COL: 'D', NO: 4, IDX: 3, NAME: '取引先'},
    SUFFIX_2: {COL: 'E', NO: 5, IDX: 4, NAME: '作付'},
    PREFIX:   {COL: 'F', NO: 6, IDX: 5, NAME: '年度'},
    DEL:      {FOL: 'G', NO: 7, IDX: 6, NAME: '削除'},
    DEST:     {COL: 'H', NO: 8, IDX: 7, NAME: '分類先フォルダ'},
    URL:      {COL: 'I', NO: 9, IDX: 8, NAME: 'ファイルURL'},
    ID:       {COL: 'J', NO: 10, IDX: 9, NAME: 'ファイルID'}
  },
  FILES_INFO: {
    SUFFIX_1: {COL: 'A', NO: 1, IDX: 0, NAME: '取引先'},
    SUFFIX_2: {COL: 'B', NO: 2, IDX: 1, NAME: '作付'},
    PREFIX:   {COL: 'C', NO: 3, IDX: 2, NAME: '年度'}
  },
  FOLDERS_INFO: {
    NAME:     {COL: 'A', NO: 1, IDX: 0, NAME: 'フォルダ名'},
    ID:       {COL: 'B', NO: 2, IDX: 1, NAME: 'フォルダID'}
  }
});