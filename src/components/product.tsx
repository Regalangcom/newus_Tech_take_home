import { DispatchApp, RootState } from "@eli/store/storePoducts/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryProduct,
  fecthDataProduct,
  filterData,
} from "@eli/store/ProductSlice/ProductDataSlice";
import { ProductsData } from "@eli/store/ProductData";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<DispatchApp>();
  const { products, categories, filteredProducts, loading, error } =
    useSelector((state: RootState) => state.products);
  const [searchTerm, setsearchTerm] = useState<string>("");
  const [selectedCategory, setselectedCategory] = useState<string>("");

  console.log("product : ", products);

  useEffect(() => {
    dispatch(fecthDataProduct());
  }, [dispatch]);

  const handleSearchChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setsearchTerm(value);
    dispatch(filterData({ searchTerm: value, selectedCategory }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setselectedCategory(category);
    dispatch(categoryProduct({ searchTerm, selectedCategory: category }));
  };

  if (loading) return <div>loading ...</div>;
  if (error) return <div>error ...</div>;

  return (
    <section className="container mx-auto p-4">
      <div className="py-4 w-56 mb-3">
        <Link
          to="/Quiz4"
          className="inline-block px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 transition duration-200"
        >
          Beralih ke Quiz ke 4
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChanges}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="border border-gray-300 rounded-md p-2 w-56"
        >
          <option value="">All products</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductsData) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-md p-4 flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="h-32 w-auto mb-2"
              />
              <h2 className="text-lg font-semibold text-purple-700">
                {product.title}
              </h2>
              <p className="text-gray-600">{product.category}</p>
              <span className="text-green-600 font-bold mt-2">
                ${product.price}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-2xl text-red-600">
            Data Not Found
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
