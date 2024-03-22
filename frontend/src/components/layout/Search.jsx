import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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
    <form onSubmit={submitHandler} className="relative">
      <input
        type="text"
        placeholder="搜尋"
        className="w-full rounded-full border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="submit" className="text-gray-600 hover:text-gray-700">
          <FaSearch />
        </button>
      </span>
    </form>
  );
};

export default Search;
