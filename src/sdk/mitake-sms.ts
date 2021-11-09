import axios from "axios";

import { SmSendParams, SmSendOptions } from "../types/sm-send";
import { SmBulkSendParams, Encode } from "../types/sm-bulk-send";
import { SmStatusQueryParams } from "../types/sm-query";
import { SmCancelParams } from "../types/sm-cancel";

export class MitakeSMS {
  /**
   * 三竹會員帳號
   */
  public readonly username: string;
  /**
   * 三竹會員密碼
   */
  public readonly password: string;
  /**
   * 三竹伺服器網址
   */
  public readonly serverUrl: string = "https://smsb2c.mitake.com.tw";

  /**
   * 初始化
   * @param username 會員帳號
   * @param password 會員密碼
   */
  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  /**
   * 寄送單筆簡訊
   * @param phoneNumber 收訊⼈之⼿機號碼
   *                    - 格式為：
   *                      - 0912345678
   *                      - 886912345678(台灣手機不建議使用這種格式，請使用09開頭)
   *                    - 最大長度: 20
   * @param message 簡訊內容
   *                - 若有 換行 的需求，請填入 ASCII Code 6 代表換⾏
   *                - 若使⽤者帳號沒有⻑簡訊發送權限，當發送內容為⻑簡訊時，簡訊內容會被截斷為短簡訊後發送
   *                - 最大長度: max
   * @param options 可選選項
   */
  public async smSend(
    phoneNumber: string,
    message: string,
    options: SmSendOptions = {}
  ): Promise<string> {
    // 請求資料
    const requestPath = "/b2c/mtk/SmSend";
    const requestMethod = "GET";
    const requestParams: SmSendParams = {
      username: this.username,
      password: this.password,
      dstaddr: phoneNumber,
      smbody: message,
    };

    // 添加非必傳資料
    if (options.destName !== undefined)
      requestParams.destname = options.destName;
    if (options.dlvtime !== undefined) requestParams.dlvtime = options.dlvtime;
    if (options.vldtime !== undefined) requestParams.vldtime = options.vldtime;
    if (options.response !== undefined)
      requestParams.response = options.response;
    if (options.clientID !== undefined)
      requestParams.clientid = options.clientID;
    if (options.charsetURL !== undefined)
      requestParams.CharsetURL = options.charsetURL;
    if (options.objectID !== undefined)
      requestParams.objectID = options.objectID;

    // 請求三竹簡訊
    const response = await axios({
      url: `${this.serverUrl}${requestPath}`,
      method: requestMethod,
      params: requestParams,
      timeout: 10000,
      responseType: "text",
    });

    return response.data;
  }

  /**
   * 批量寄送簡訊
   * @param messages 按照三竹格式包裝好的批量簡訊資料
   *                 - 最多500筆
   * @param encoding 編碼格式
   *                 - 編碼⽅式⽀援Big5、UTF8( 預設值為Big5 )
   * @param objectID 批次名稱
   *                 - 最大長度: 16
   */
  public async smBulkSend(
    messages: string,
    encoding?: Encode,
    objectID?: string
  ): Promise<string> {
    // 請求資料
    const requestPath = "/b2c/mtk/SmBulkSend";
    const requestMethod = "POST";
    const requestParams: SmBulkSendParams = {
      username: this.username,
      password: this.password,
    };
    if (encoding) requestParams.Encoding_PostIn = encoding;
    if (objectID) requestParams.objectID = objectID;

    // 請求三竹簡訊
    const response = await axios({
      url: `${this.serverUrl}${requestPath}`,
      method: requestMethod,
      params: requestParams,
      headers: {
        "Content-Type": "text/plain",
      },
      data: messages,
      timeout: 10000,
      responseType: "text",
    });

    return response.data;
  }

  /**
   * 簡訊狀態查詢
   * @param msgId 簡訊序號。 最多100筆
   */
  public async smStatusQuery(msgId: string | string[]): Promise<string> {
    // 請求資料
    const requestPath = "/b2c/mtk/SmQuery";
    const requestMethod = "GET";
    const requestParam: SmStatusQueryParams = {
      username: this.username,
      password: this.password,
      msgid: typeof msgId === "string" ? msgId : msgId.join(","),
    };

    // 請求三竹簡訊
    const response = await axios({
      url: `${this.serverUrl}${requestPath}`,
      method: requestMethod,
      params: requestParam,
      timeout: 10000,
      responseType: "text",
    });

    return response.data;
  }

  /**
   * 帳號餘額查詢
   */
  public async balanceQuery(): Promise<string> {
    // 請求資料
    const requestPath = "/b2c/mtk/SmQuery";
    const requestMethod = "GET";
    const requestParam = {
      username: this.username,
      password: this.password,
    };

    // 請求三竹簡訊
    const response = await axios({
      url: `${this.serverUrl}${requestPath}`,
      method: requestMethod,
      params: requestParam,
      timeout: 10000,
      responseType: "text",
    });

    return response.data;
  }

  /**
   * 簡訊預約取消
   * @param msgId 簡訊序號。 最多100筆
   */
  public async smCancel(msgId: string | string[]): Promise<string> {
    // 請求資料
    const requestPath = "/b2c/mtk/SmCancel";
    const requestMethod = "GET";
    const requestParam: SmCancelParams = {
      username: this.username,
      password: this.password,
      msgid: typeof msgId === "string" ? msgId : msgId.join(","),
    };

    // 請求三竹簡訊
    const response = await axios({
      url: `${this.serverUrl}${requestPath}`,
      method: requestMethod,
      params: requestParam,
      timeout: 10000,
      responseType: "text",
    });

    return response.data;
  }
}
