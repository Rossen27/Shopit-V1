

const UploadAvatar = () => {
  return (
    <form>
      {/* 大頭照 */}
      <input
        type="file"
        className="rounded-full w-32 h-32"
        hidden
        accept="image/*"
      />
      <img className="rounded-full w-32 h-32" alt="profile" />
      <button className="btn glass btn-sm text-slate-300 hover:text-slate-800">
        更 新 頭 像
      </button>
    </form>
  );
};

export default UploadAvatar;
