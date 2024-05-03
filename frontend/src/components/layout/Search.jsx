import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";

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
      <Input
        
        size="lg"
        startContent={
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        }
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default Search;
