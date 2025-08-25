import { useState, useEffect } from 'react';
import "./App.css";
import NavBar from "./components/NavBar";
import Product from "./components/Product"


export default function App() {
  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(selectedProduct));
  }, [selectedProduct])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const defaultData = data.products;
        if (selectedCategory === "all") {
          setProductsData(defaultData);
        } else {
          setProductsData(defaultData.filter(product => product.category === selectedCategory))
        }
      } catch {
        console.error("Failed to fetch products data");
      }
    }
    fetchData();
  }, [selectedCategory])

  function handleAddCartClick(name, price, image) {
    setSelectedProduct(prev => {
      let updatedCart;
      const existing = prev.find(product => product.productName === name);

      if (existing) {
        return prev.map(product => {
          if (product.productName === name) {
            const newQuantity = product.quantity + 1;
            return {
              ...product,
              quantity: newQuantity,
              productPrice: Number((product.unitPrice * newQuantity).toFixed(2)) // update total price
            };
          } else {
            return product; // keep unchanged
          }
        });
      } else {
        // add new product with quantity 1
        updatedCart = [
          ...prev,
          {
            productName: name,
            productImage: image,
            unitPrice: price,     // store original unit price
            productPrice: price,  // total price initially equals unit price
            quantity: 1
          }
        ];
      }
      return updatedCart;
    });
  }

  return (
    <>
      <NavBar
        defaultCategory={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        selectedProduct={selectedProduct}
      />
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsData.map(
          ({
            id,
            title,
            description,
            price,
            rating,
            images,
            warrantyInformation,
            shippingInformation,
            reviews,
          }) => {
            return (
              <Product
                key={id}
                title={title}
                description={description}
                price={price}
                rating={rating}
                images={images[0]}
                onClick={() => handleAddCartClick(title, price, images[0])}
                warrantyDays={warrantyInformation}
                shippingDays={shippingInformation}
                comments={reviews.map((r, index) => (
                  <div key={index} className="mb-2 p-2 border-b border-gray-200">
                    <p>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} — {r.comment}
                    </p>
                    <p className="text-gray-500 text-sm">{r.reviewerName} ({r.reviewerEmail})</p>
                  </div>
                ))}
              />
            );
          }
        )}
      </section>
    </>
  )
}
