import { useState, useEffect } from "react"

export default function Product({ title, description, price, rating, images, onClick, warrantyDays, shippingDays, comments }) {
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    if (isAddedToCart === false) return;
    const timer = setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000)
    return () => clearTimeout(timer); // cleanup
  }, [isAddedToCart])

  function handleClick() {
    onClick();
    setIsAddedToCart(true);
  }

  console.log(isAddedToCart)

  return (
    <>
      <section className="max-w-[400px] w-[95%] mx-auto bg-white mt-8 p-8 rounded-lg shadow-lg hover:shadow-2xl transition font-sans border border-gray-100 ">
        <img src={images} className="w-[80%] h-auto mx-auto" alt={title} />
        <h2 className="font-bold text-[22px] mb-1">{title}</h2>
        <p className="text-[15px] text-gray-500 mb-2">{description}</p>
        <p className="flex gap-4 mb-4">
          <span><strong>Rating:</strong> {rating} / 5</span>
          <span><strong>Price: </strong>${price}</span>
        </p>
        <button className="bg-blue-500 text-gray-200 px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition" onClick={handleClick} >Add Cart</button>
        <button className="bg-cyan-500 text-gray-200 px-4 py-2 rounded-lg font-bold hover:bg-cyan-700 transition ml-4" onClick={() => setIsViewDetails(!isViewDetails)}>View Detail</button>
      </section>
      {isViewDetails && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <section className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-[95%] relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-2xl">Product Information</h2>
              <button
                className="font-bold text-2xl text-gray-700 hover:text-gray-900"
                onClick={() => setIsViewDetails(false)}
              >
                &times;
              </button>
            </div>
            <p className="mb-2"><strong>Warranty:</strong> <span className="text-gray-500">{warrantyDays}</span></p>
            <p className="mb-4"><strong>Shipping:</strong> <span className="text-gray-500">{shippingDays}</span></p>
            <div>
              <p className="font-semibold mb-2">Reviews:</p>
              <div className="max-h-64 overflow-y-auto">
                {comments}
              </div>
            </div>
          </section>
        </div>
      )}
      {isAddedToCart && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
           Added ! 🎉
        </div>
      )}
    </>
  )
}
