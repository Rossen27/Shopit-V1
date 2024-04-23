import { useEffect, useState } from "react";
// import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "./../constants/constants";
import { useCreateProductMutation } from "../../redux/api/productsApi";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "", // 產品名稱
    description: "", // 產品描述
    price: "", // 產品價格
    category: "", // 產品類別: "電子產品", "衣物", "鞋子", "書籍", "食品", "相機", "耳機", "配件", "筆記型電腦","其他"
    stock: "", // 產品庫存
    seller: "", // 賣家
  });

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("新增產品成功！ 🎉");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);

  const { name, description, price, category, stock, seller } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"新增產品"} />
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <div className="flow-root">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">商品名稱</dt>
                    <dd className="text-gray-700 sm:col-span-2">{name}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">庫存</dt>
                    <dd className="text-gray-700 sm:col-span-2">{stock}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">賣家名稱</dt>
                    <dd className="text-gray-700 sm:col-span-2">{seller}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">售價</dt>
                    <dd className="text-gray-700 sm:col-span-2">$ {price}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">商品描述</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="#" className="space-y-4" onSubmit={submitHandler}>
                <div>
                  <label className="block text-xs font-medium text-gray-700" htmlFor="name">
                    商品名稱
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="請輸入商品名稱"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700" htmlFor="price">
                      商品價格
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="請輸入價格"
                      type="number"
                      id="price"
                      name="price"
                      value={price}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700" htmlFor="stock">
                      商品庫存
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="請輸入庫存數量"
                      type="number"
                      id="stock"
                      name="stock"
                      value={stock}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category_field" className="block text-xs font-medium text-gray-700">
                      產品類別
                    </label>
                    <select
                      id="category_field"
                      name="category"
                      className="select w-full max-w-xs rounded-lg border-gray-200 p-3 text-sm"
                      value={category}
                      onChange={onChange}
                    >
                      <option disabled selected value="">
                        請選擇商品類別
                      </option>
                      {PRODUCT_CATEGORIES?.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700" htmlFor="seller">
                      賣家名稱
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="請輸入賣家名稱"
                      type="text"
                      id="seller"
                      name="seller"
                      value={seller}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700" htmlFor="description">
                    商品描述
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="商品描述"
                    rows="8"
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChange}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? "建立中..." : "建立商品"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default NewProduct;
