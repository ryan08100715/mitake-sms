export interface SmSendParams {
  username: string;
  password: string;
  dstaddr: string;
  smbody: string;
  destname?: string;
  dlvtime?: string | number;
  vldtime?: string | number;
  response?: string;
  clientid?: string;
  CharsetURL?: "Big5" | "UTF8";
  objectID?: string;
}

export interface SmSendOptions {
  /**
   * 收訊⼈名稱
   * - 若其他系統需要與簡訊資料進⾏系統整合，此欄位可填入來源系統所產⽣的Key值，以對應回來源系統
   *
   * 最大長度: 36
   */
  destName?: string;
  /**
   * 簡訊預約時間
   * - 格式為 YYYYMMDDHHMMSS 或整數值代表幾秒後傳送
   * - 即時發送：輸入的預約時間⼩等於系統時間或輸入空⽩
   * - 預約發送：輸入的預約時間⼤於系統時間10分鐘
   *
   * 最大長度: 14
   */
  dlvtime?: string | number;
  /**
   * 簡訊有效期限
   * - 格式為 YYYYMMDDHHMMSS 或整數值代表傳送後幾秒後內有效
   * - 若未指定則預設為24⼩時
   * - 請勿超過電信業者預設之24⼩時期限，以避免業者不回覆簡訊狀態
   *
   * 最大長度: 14
   */
  vldtime?: string | number;
  /**
   * 狀態主動回報網址
   * - 當簡訊狀態改變時將會以 http/https 通知這個網址
   *
   * 最大長度: 256
   */
  response?: string;
  /**
   * 客⼾簡訊ID
   * - ⽤於避免重複發送，若有提供此參數，則會判斷該簡訊ID是否曾經發送，若曾發送過，則直接回覆之前發送的回覆值
   * - 這個檢查機制只留存12⼩時內的資料，12⼩時後重複的clientid可能會被當成新簡訊
   * - 此外，clientid必須維持唯⼀性，⽽非只在12⼩時內唯⼀，建議可使⽤GUID來保證其唯⼀性
   *
   * 最大長度: 36
   */
  clientID?: string;
  /**
   * 各欄位若帶入中文字串，請進⾏ URL Encode
   * 編碼⽅式⽀援Big5、UTF8( 預設值為Big5 )
   *
   * 最大長度: 10
   */
  charsetURL?: "Big5" | "UTF8";
  /**
   * 批次名稱。
   *
   * 最大長度: 16
   */
  objectID?: string;
}
