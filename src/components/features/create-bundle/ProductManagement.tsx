

import React, { useState, useEffect } from "react";
// Fallback image component
function ImageWithFallback({ src, alt, width, height }: { src?: string; alt: string; width: number; height: number }) {
  const [imgSrc, setImgSrc] = useState(src || "/icons/coffee-cup.svg");
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className="object-contain mt-4 rounded-xl"
      onError={() => setImgSrc("/icons/coffee-cup.svg")}
    />
  );
}
type Product = {
  id?: string | number;
  name: string;
  price: string | number;
  image?: string;
  category?: string;
};
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


export default function ProductManagement() {
  const [activeCategory, setActiveCategory] = useState(categories[0].label);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get unique categories from products
  const dynamicCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const allCategories = dynamicCategories.length > 0 ? dynamicCategories : categories.map(c => c.label);

  const filteredProducts = products.filter(p => p.category === activeCategory || (!p.category && activeCategory === categories[0].label));

  return (
    <section className="w-full px-12 py-10">
      <div className="w-full min-h-[824px] bg-white rounded-2xl p-8 mb-8 flex flex-col gap-6">
        {/* Heading */}
        <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-none pl-0">Product Management</div>
        {/* Category Buttons Container */}
        <div className="w-full h-7 flex items-center gap-[26px] opacity-100 mb-4 border-b border-[#E4E4E7]">
          {/* Inner container for buttons */}
          <div className="flex items-center gap-[26px] opacity-100">
            {allCategories.map((cat, idx) => (
              <Button
                key={cat ?? `cat-${idx}`}
                variant={activeCategory === (cat ?? "") ? "categoryTabActive" : "categoryTab"}
                onClick={() => setActiveCategory(cat ?? "")}
                className={`pb-[9px] w-[50px] h-[26px]${idx < allCategories.length - 1 ? ' mr-[10px]' : ''}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {/* Product Grid - Show all products in one grid */}
        <div className="w-full min-h-[280px] opacity-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="text-[#787777] text-[18px] mt-8">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-[#787777] text-[18px] mt-8">No products found.</div>
          ) : (
            filteredProducts.map((product, idx) => (
              <div key={product.id || idx} className="w-full h-[240px] opacity-100 rounded-3xl border border-[#E4E4E7] shadow-none flex flex-col items-center relative bg-white overflow-hidden">
                {/* Top Portion - Centered Image */}
                <div className="w-full h-[140px] bg-[#D5D6D6] opacity-100 absolute top-0 left-0 rounded-t-3xl flex items-center justify-center">
                  <div className="flex items-center justify-center w-full h-full">
                    <ImageWithFallback src={product.image} alt={product.name} width={130} height={130} />
                  </div>
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
