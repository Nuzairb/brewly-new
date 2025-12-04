

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


const categories = [
  { label: "Coffee", width: 41 },
  { label: "Iced", width: 26 },
  { label: "Matcha", width: 50 },
  { label: "Snacks", width: 43 },
  { label: "Seasonal", width: 55 },
  { label: "Favorites", width: 56 },
  { label: "Chillers", width: 46 },
];

// Static products by category (easy to replace with backend data)
const productsByCategory: Record<string, Array<{ name: string; image: string; price: string }>> = {
  Coffee: [
    { name: "Pumpkin Spice Latte", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Espresso", image: "/icons/coffee-cup.svg", price: "AED 18.00" },
    { name: "Cappuccino", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Americano", image: "/icons/coffee-cup.svg", price: "AED 19.00" },
    { name: "Flat White", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Mocha", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Macchiato", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Affogato", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Irish Coffee", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Turkish Coffee", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Vienna Coffee", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Café au Lait", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
  ],
  Iced: [
    { name: "Iced Latte", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Iced Mocha", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Iced Americano", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Iced Caramel", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Iced Hazelnut", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Iced Vanilla", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Iced Chocolate", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Iced Coconut", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Iced Almond", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Iced Cinnamon", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Iced Maple", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Iced Toffee", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
  ],
  Matcha: [
    { name: "Matcha Latte", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Iced Matcha", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Matcha Frappe", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Matcha Smoothie", image: "/icons/coffee-cup.svg", price: "AED 27.00" },
    { name: "Matcha Lemonade", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Matcha Chiller", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Matcha Mint", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Matcha Vanilla", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Matcha Coconut", image: "/icons/coffee-cup.svg", price: "AED 27.00" },
    { name: "Matcha Almond", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Matcha Maple", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Matcha Toffee", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
  ],
  Snacks: [
    { name: "Brownie", image: "/icons/coffee-cup.svg", price: "AED 12.00" },
    { name: "Cookie", image: "/icons/coffee-cup.svg", price: "AED 10.00" },
    { name: "Muffin", image: "/icons/coffee-cup.svg", price: "AED 14.00" },
    { name: "Croissant", image: "/icons/coffee-cup.svg", price: "AED 15.00" },
    { name: "Donut", image: "/icons/coffee-cup.svg", price: "AED 13.00" },
    { name: "Scone", image: "/icons/coffee-cup.svg", price: "AED 12.00" },
    { name: "Bagel", image: "/icons/coffee-cup.svg", price: "AED 14.00" },
    { name: "Biscotti", image: "/icons/coffee-cup.svg", price: "AED 11.00" },
    { name: "Cake Slice", image: "/icons/coffee-cup.svg", price: "AED 16.00" },
    { name: "Pie", image: "/icons/coffee-cup.svg", price: "AED 15.00" },
    { name: "Tart", image: "/icons/coffee-cup.svg", price: "AED 13.00" },
    { name: "Eclair", image: "/icons/coffee-cup.svg", price: "AED 14.00" },
  ],
  Seasonal: [
    { name: "Winter Spice", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Spring Blossom", image: "/icons/coffee-cup.svg", price: "AED 27.00" },
    { name: "Summer Berry", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Autumn Maple", image: "/icons/coffee-cup.svg", price: "AED 28.00" },
    { name: "Festive Mint", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Holiday Spice", image: "/icons/coffee-cup.svg", price: "AED 27.00" },
    { name: "New Year Citrus", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Spring Lemon", image: "/icons/coffee-cup.svg", price: "AED 28.00" },
    { name: "Summer Peach", image: "/icons/coffee-cup.svg", price: "AED 26.00" },
    { name: "Autumn Apple", image: "/icons/coffee-cup.svg", price: "AED 27.00" },
    { name: "Festive Berry", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Holiday Citrus", image: "/icons/coffee-cup.svg", price: "AED 28.00" },
  ],
  Favorites: [
    { name: "Classic Latte", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Classic Mocha", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Classic Americano", image: "/icons/coffee-cup.svg", price: "AED 19.00" },
    { name: "Classic Cappuccino", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Classic Espresso", image: "/icons/coffee-cup.svg", price: "AED 18.00" },
    { name: "Classic Flat White", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Classic Macchiato", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Classic Affogato", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Classic Irish", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Classic Turkish", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Classic Vienna", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Classic au Lait", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
  ],
  Chillers: [
    { name: "Mango Chiller", image: "/icons/coffee-cup.svg", price: "AED 18.00" },
    { name: "Berry Chiller", image: "/icons/coffee-cup.svg", price: "AED 19.00" },
    { name: "Peach Chiller", image: "/icons/coffee-cup.svg", price: "AED 20.00" },
    { name: "Lemon Chiller", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Mint Chiller", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Coconut Chiller", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Almond Chiller", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
    { name: "Maple Chiller", image: "/icons/coffee-cup.svg", price: "AED 25.00" },
    { name: "Toffee Chiller", image: "/icons/coffee-cup.svg", price: "AED 21.00" },
    { name: "Hazelnut Chiller", image: "/icons/coffee-cup.svg", price: "AED 22.00" },
    { name: "Chocolate Chiller", image: "/icons/coffee-cup.svg", price: "AED 23.00" },
    { name: "Caramel Chiller", image: "/icons/coffee-cup.svg", price: "AED 24.00" },
  ],
};

export default function ProductManagement() {
  const [activeCategory, setActiveCategory] = useState(categories[0].label);

  return (
    <section className="w-full px-12 py-10">
    <div className="w-full min-h-[824px] bg-white rounded-2xl p-8 mb-8 flex flex-col gap-6">
      {/* Heading */}
      <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-none pl-0">Product Management</div>
      {/* Category Buttons Container */}
      <div className="w-full h-7 flex items-center gap-[26px] opacity-100 mb-4 border-b border-[#E4E4E7]">
        {/* Inner container for buttons */}
        <div className="flex items-center gap-[26px] opacity-100">
          {categories.map((cat, idx) => (
            <Button
              key={cat.label}
              variant={activeCategory === cat.label ? "categoryTabActive" : "categoryTab"}
              onClick={() => setActiveCategory(cat.label)}
              className={`pb-[9px] w-[${cat.width}px] h-[26px]${idx < categories.length - 1 ? ' mr-[10px]' : ''}`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Product Grid - Show all products in one grid */}
      <div className="w-full min-h-[280px] opacity-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(productsByCategory[activeCategory] || []).length === 0 ? (
          <div className="text-[#787777] text-[18px] mt-8">No products found.</div>
        ) : (
          productsByCategory[activeCategory].map((product, idx) => (
            <div key={idx} className="w-full h-[240px] opacity-100 rounded-3xl border border-[#E4E4E7] shadow-none flex flex-col items-center relative bg-white overflow-hidden">
              {/* Top Portion */}
              <div className="w-full h-[140px] bg-[#D5D6D6] opacity-100 absolute top-[-10px] left-0 rounded-t-3xl flex justify-center items-start">
                <Image src={product.image} alt={product.name} width={120} height={120} className="object-contain mt-4 rounded-xl" />
              </div>
              {/* Bottom Portion */}
              <div className="w-full h-[100px] absolute bottom-0 left-0 bg-white flex flex-col items-center justify-start px-4 py-3">
                <span className="w-full font-lato font-semibold text-[20px] leading-[28px] capitalize text-[#1E1E1E] opacity-100 mb-0 bg-none text-left block">{product.name}</span>
                <span className="w-full font-lato font-normal text-[18px] leading-[22px] capitalize text-[#787777] opacity-100 bg-none text-left block mb-2">{product.price}</span>
                {/* No button should be shown here */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </section>
  );
}
