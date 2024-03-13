class APIFilters {
  // 設定 query 和 queryStr 屬性
  constructor(query, queryStr) {
    this.query = query; // 查詢物件
    this.queryStr = queryStr; // 查詢字串
  }
  // 過濾特定欄位
  search() {
    // 關鍵字過濾
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // 關鍵字
            $options: "i", // 不分大小寫
          },
        }
      : {};
    this.query = this.query.find({ ...keyword }); // 查詢物件
    return this;
  }
  // 搜尋範圍過濾
  filters() {
    const queryCopy = { ...this.queryStr }; // 移除不需要的欄位
    // 移除特定欄位
    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);
    // 高級篩選: 價格（Price）、評分（Rating）等
    let queryStr = JSON.stringify(queryCopy); // 轉換為字串
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // 加上 $ 符號
    this.query = this.query.find(JSON.parse(queryStr)); // 查詢物件
    return this;
  }
  // 分頁過濾
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // 當前頁碼 -> 預設為 1
    const skip = resPerPage * (currentPage - 1); // 跳過的資料筆數 -> 每頁顯示 5 筆資料
    this.query = this.query.limit(resPerPage).skip(skip); // 查詢物件 -> 限制每頁顯示 5 筆資料
    return this;
  }
}
export default APIFilters;
