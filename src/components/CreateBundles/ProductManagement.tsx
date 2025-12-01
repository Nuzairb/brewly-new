

import React, { useState } from "react";


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
    <section style={{ width: '100%', padding: '50px' }}>
    <div
      style={{
        width: '100%',
        minHeight: 824,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0px 1px 2px 0px #0A0D120D",
        padding: 32,
        marginBottom: 32,
        display: "flex",
        flexDirection: "column",
        gap: 25,
        opacity: 1,
        transform: "rotate(0deg)",
      }}
    >
      {/* Heading */}
      <div
        style={{
          width: '100%',
          height: 28,
          opacity: 1,
          fontFamily: "Lato, sans-serif",
          fontWeight: 600,
          fontSize: 20,
          lineHeight: "28px",
          letterSpacing: 0,
          color: "#1E1E1E",
          display: "flex",
          alignItems: "center",
          
          background: "none",
          paddingLeft: 0,
        }}
      >
        Product Management
      </div>
      {/* Category Buttons Container */}
      <div
        style={{
          width: '100%',
          height: 28,
          display: "flex",
          alignItems: "center",
          gap: 26,
          opacity: 1,
          marginBottom: 16,
          borderBottom: "1px solid #E4E4E7",
        }}
      >
        {/* Inner container for buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: 1,
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              style={{
                width: cat.width,
                height: 26,
                opacity: 1,
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "26px",
                letterSpacing: 0,
                background: "none",
                color: activeCategory === cat.label ? "#17B26A" : "#787777",
                border: "none",
                borderBottom: activeCategory === cat.label ? "3px solid #17B26A" : "3px solid transparent",
                paddingBottom: 9,
                marginRight: idx < categories.length - 1 ? 10 : 0,
                cursor: "pointer",
                fontStyle: "Medium",
                transition: "color 0.2s, border-bottom 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {/* Product Grid - Show all products in one grid */}
      <div
        style={{
          width: '100%',
          minHeight: 222,
          opacity: 1,
          display: "grid",
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          transform: "rotate(0deg)",
        }}
      >
        {(productsByCategory[activeCategory] || []).length === 0 ? (
          <div style={{ color: '#787777', fontSize: 18, marginTop: 32 }}>No products found.</div>
        ) : (
          productsByCategory[activeCategory].map((product, idx) => (
            <div
              key={idx}
              style={{
                width: '100%',
                height: 222,
                opacity: 1,
                borderRadius: 24,
                border: "1px solid #00674E",
                boxShadow: "0px 4px 26px 0px #00674E33",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                background: "#fff",
                overflow: "hidden",
              }}
            >
              {/* Top Portion */}
              <div
                style={{
                  width: '100%',
                  height: 159,
                  background: "#D5D6D6",
                  opacity: 1,
                  position: "absolute",
                  top: -25,
                  left: 0,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 120, height: 120, objectFit: "contain", marginTop: 35 }}
                />
              </div>
              {/* Bottom Portion */}
              <div
                style={{
                  width: '100%',
                  height: 63,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  padding: '10px 0 8px 16px',
                }}
              >
                <span
                  style={{
                    width: 205,
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: "28px",
                    letterSpacing: 0,
                    textTransform: "capitalize",
                    color: "#1E1E1E",
                    opacity: 1,
                    marginBottom: 2,
                    background: "none",
                    textAlign: "left",
                    display: 'block',
                  }}
                >
                  {product.name}
                </span>
                <span
                  style={{
                    width: 205,
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: "22px",
                    letterSpacing: 0,
                    textTransform: "capitalize",
                    color: "#787777",
                    opacity: 1,
                    background: "none",
                    textAlign: "left",
                    display: 'block',
                  }}
                >
                  {product.price}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </section>
  );
}
