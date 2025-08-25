import { Link } from "react-router-dom";
import { useState } from "react"

export default function NavBar({ defaultCategory, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between fixed w-full bg-white shadow-md border-b border-gray-200 h-14 px-6 font-sans z-50">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-bold text-2xl text-gray-800 hover:text-blue-600 transition sm:hidden"
          >
            &#9776;
          </button>
          <h1 className="font-extrabold text-blue-600 tracking-wide text-xl">
            Shop
          </h1>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:ml-auto">
          <div>
            <label htmlFor="menu-searching" className="mr-2 font-medium text-gray-700">
              Filter by:
            </label>
            <select
              name="menu-searching"
              id="menu-searching"
              value={defaultCategory}
              onChange={onChange}
              className="mr-4 bg-white border border-gray-300 px-4 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="all">All</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>
        </div>
        <Link to="/Cart">
          <button className="font-medium bg-blue-600 text-white px-5 py-1.5 rounded-md hover:bg-blue-700 transition">
            Cart
          </button>
        </Link>
      </nav>

      {isOpen && (
        <ul className="fixed top-14 left-0 w-full bg-gray-50 shadow-lg border-t border-gray-200 py-4 z-40">
          <li className="flex justify-center items-center gap-2">
            <label htmlFor="menu-searching" className="font-medium text-gray-700">
              Filter by:
            </label>
            <select
              name="menu-searching"
              id="menu-searching"
              value={defaultCategory}
              onChange={onChange}
              className="bg-white border border-gray-300 px-4 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="all">All</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
            </select>
          </li>
        </ul>
      )}
    </header>
  )
}
