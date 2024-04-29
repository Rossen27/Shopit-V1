/* eslint-disable react/no-unescaped-entities */
const NotFound = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <h1 className="uppercase tracking-widest text-gray-500">404 | Not Found</h1>

        <a
          href="/"
          className="mt-6 inline-block rounded bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
