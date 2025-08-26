import { useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });
    const [isRemoved, setIsRemoved] = useState(false);

    const totalPrice = cart.reduce((acc, curr) => acc + curr.productPrice, 0).toFixed(2);

    function handleRemove(name) {
        const updated = cart.filter(p => p.productName !== name);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        setIsRemoved(false);
    }

    function handleIncrease(productIndex) {
        const updated = cart.map((product, index) => {
            if (index === productIndex) {
                const newQuantity = product.quantity + 1;
                return {
                    ...product,
                    quantity: newQuantity,
                    productPrice: Number((product.unitPrice * newQuantity).toFixed(2))
                }
            }
            return product;
        });
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    function handleDecrease(productIndex) {
        const updated = cart.map((product, index) => {
            if (index === productIndex && product.quantity > 1) {
                const newQuantity = product.quantity - 1;
                return {
                    ...product,
                    quantity: newQuantity,
                    productPrice: Number((product.unitPrice * newQuantity).toFixed(2))
                }
            }
            return product;
        });
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    }

    function confirmationCheck(productIndex) {
        cart.map((product, index) => {
            if (index === productIndex) {
                setIsRemoved(true);
                return product;
            } else {
                return product;
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <section className="max-w-[400px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-[900px] w-[95%] bg-white shadow-md p-8 rounded-lg">
                <h2 className="font-extrabold mb-1 text-2xl md:text-3xl">My Cart</h2>
                <p className="mb-1">{cart.length} Items</p>
                <hr className="mt-3" />
                <section className="mt-4 grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:grid-rows-3 lg:gap-8">
                    {cart.map(({ productName, productPrice, productImage, quantity }, index) => (
                        <div className="mb-6">
                            <section key={productName}  className="flex flex-col h-full p-4 border rounded-lg shadow-sm">
                                <img src={productImage} alt={productName} className="w-[80%] h-auto mx-auto" />
                                <h3><strong className="text-[18px] md:text-[20px]">Title:</strong> <span className="md:text-[18px]">{productName}</span></h3>

                                <p className="flex items-center gap-3">
                                    <strong className="text-[18px] md:text-[20px]">Quantity:</strong>
                                    <span className="flex items-center border border-gray-300 rounded-full px-3 py-1 shadow-sm">
                                        <button
                                            className="text-lg font-bold px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer disabled:cursor-not-allowed"
                                            disabled={quantity <= 1}
                                            onClick={() => handleDecrease(index)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 text-[18px] font-medium">{quantity}</span>
                                        <button
                                            className="text-lg font-bold px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                                            onClick={() => handleIncrease(index)}
                                        >
                                            +
                                        </button>
                                    </span>
                                </p>

                                <p><strong className="text-[18px] md:text-[20px]">Price:</strong> <span className="md:text-[18px]">${productPrice}</span></p>
                                <button
                                    className="mt-3 w-full bg-red-500 rounded-lg py-2 font-bold text-amber-50 hover:bg-red-600 transition cursor-pointer"
                                    onClick={() => confirmationCheck(index)}
                                >
                                    Remove
                                </button>
                            </section>
                            {isRemoved && (
                                <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
                                    <section className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-[95%] relative">
                                        <h2 className="text-[20px] font-bold mb-4">Are you sure you want to remove {productName}?</h2>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold mr-4" onClick={() => handleRemove(productName)}>
                                            Yes, remove
                                        </button>
                                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-bold" onClick={() => setIsRemoved(false)}>
                                            No, keep it
                                        </button>

                                    </section>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
                <hr className="mt-3" />
                <p className="mt-3"><strong className="text-[18px] md:text-[20px]">Subtotal:</strong> <span className="md:text-[18px]">${totalPrice}</span></p>
                <button className="w-full bg-blue-500 rounded-lg py-2 font-bold text-amber-50 mt-3 hover:bg-blue-700 transition">
                    Checkout
                </button>
            </section>
        </div>
    );
}
