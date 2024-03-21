import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 設定表單送出時的處理函式
  const submitHandler = (e) => {
    e.preventDefault(); // 防止表單預設的提交行為
    // 如果有輸入關鍵字，則導向到搜尋結果頁面，否則導向到首頁
    if (keyword?.trim()) {
      navigate(`/filters/?keyword=${keyword}`);
    } else {
      navigate(`/filters`);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="bg-slate-100 p-3 rounded-full">
        <input
          type="text"
          placeholder="搜尋"
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <FaSearch className="text-slate-600" />
        </button>
      </div>
    </form>
  );
};

export default Search;
