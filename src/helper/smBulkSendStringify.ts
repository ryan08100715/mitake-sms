/**
 * 將簡訊資料陣列序列化成
 * @param smDataList 簡訊資料陣列
 */
export function stringify(smDataList: SmData[]) {
  return smDataList
    .map((smData) => {
      return smBulkDataStringify(smData);
    })
    .join(String.fromCharCode(13) + String.fromCharCode(10));
}

/**
 * 將簡訊資料以批次寄送的格式序列化
 * @param smData 每筆簡訊資料
 */
function smBulkDataStringify(smData: SmData) {
  // 將欄位用$$串起來
  let oneSMS = "";
  oneSMS += `${smData.clientID ? smData.clientID : ""}`;
  oneSMS += `$$${smData.phoneNumber}`;
  oneSMS += `$$${smData.dlvtime ? smData.dlvtime : ""}`;
  oneSMS += `$$${smData.vldtime ? smData.vldtime : ""}`;
  oneSMS += `$$${smData.destName ? smData.destName : ""}`;
  oneSMS += `$$${smData.response ? smData.response : ""}`;
  oneSMS += `$$${smData.smbody}`;
  return oneSMS;
}

export interface SmData {
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
   * 收訊⼈之⼿機號碼
   * - 格式為：
   *   - 0912345678
   *   - 886912345678(台灣手機不建議使用這種格式，請使用09開頭)
   * - 最大長度: 20
   */
  phoneNumber: string;
  /**
   * 簡訊預約時間
   * - 格式為 YYYYMMDDHHMMSS 或整數值代表幾秒後傳送
   * - 即時發送：輸入的預約時間⼩等於系統時間或輸入空⽩
   * - 預約發送：輸入的預約時間⼤於系統時間10分鐘
   *
   * 最大長度: 14
   */
  dlvtime?: string;
  /**
   * 簡訊有效期限
   * - 格式為 YYYYMMDDHHMMSS 或整數值代表傳送後幾秒後內有效
   * - 若未指定則預設為24⼩時
   * - 請勿超過電信業者預設之24⼩時期限，以避免業者不回覆簡訊狀態
   *
   * 最大長度: 14
   */
  vldtime?: string;
  /**
   * 收訊⼈名稱
   * - 若其他系統需要與簡訊資料進⾏系統整合，此欄位可填入來源系統所產⽣的Key值，以對應回來源系統
   *
   * 最大長度: 36
   */
  destName?: string;
  /**
   * 狀態主動回報網址
   * - 當簡訊狀態改變時將會以 http/https 通知這個網址
   *
   * 最大長度: 256
   */
  response?: string;
  /**
   * 簡訊內容。
   * - 若有 換行 的需求，請填入 ASCII Code 6 代表換⾏。
   * - 若使⽤者帳號沒有⻑簡訊發送權限，當發送內容為⻑簡訊時，簡訊內容會被截斷為短簡訊後發送。
   *
   * 最大長度: max
   */
  smbody: string;
}
