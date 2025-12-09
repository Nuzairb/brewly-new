import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Fallback image component (uses object-cover)
function ImageWithFallback({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || `${process.env.NEXT_PUBLIC_BASE_URL}/icons/coffee-cup.svg`);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover rounded-t-xl"
      onError={() => setImgSrc(`${process.env.NEXT_PUBLIC_BASE_URL}/icons/coffee-cup.svg`)}
    />
  );
}

type Product = {
  id?: string | number;
  product_id?: string;
  product_name?: string;
  name: string;
  price?: string | number;
  product_price?: number;
  image?: string;
  category?: string;
};

type SelectedProduct = {
  id: string;
  name: string;
  price: number;
};

interface ProductManagementProps {
  selectedProducts: SelectedProduct[];
  onToggleProduct: (product: Product) => void;
}

const categories = [
  { label: "Coffee", width: 41 },
  { label: "Iced", width: 26 },
  { label: "Matcha", width: 50 },
  { label: "Snacks", width: 43 },
  { label: "Seasonal", width: 55 },
  { label: "Favorites", width: 56 },
  { label: "Chillers", width: 46 },
];

export default function ProductManagement({ selectedProducts, onToggleProduct }: ProductManagementProps) {
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

  const dynamicCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const allCategories = dynamicCategories.length > 0 ? dynamicCategories : categories.map(c => c.label);

  const filteredProducts = products.filter(p => p.category === activeCategory || (!p.category && activeCategory === categories[0].label));

  const getProductId = (product: Product) => String(product.id ?? product.product_id ?? product.product_name ?? product.name);
  const getDisplayName = (product: Product) => product.name ?? product.product_name ?? "";
  const getDisplayPrice = (product: Product) => {
    const raw = product.price ?? product.product_price;
    if (raw === undefined || raw === null) return "";
    if (typeof raw === "number") return `AED ${raw.toFixed(2)}`;
    return String(raw);
  };
  const isSelected = (product: Product) => selectedProducts.some((p) => p.id === getProductId(product));

  return (
    <section className="w-full px-12 py-10">
      <div className="w-full min-h-[824px] bg-white rounded-2xl p-8 mb-8 flex flex-col gap-6">
        {/* Heading */}
        <div className="w-full h-7 font-lato font-semibold text-[20px] leading-[28px] text-[#1E1E1E] flex items-center bg-none pl-0">Product Management</div>
        {/* Category Buttons Container */}
        <div className="w-full h-7 flex items-center gap-[26px] opacity-100 mb-4 border-b border-[#E4E4E7]">
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
            filteredProducts.map((product, idx) => {
              const selected = isSelected(product);
              return (
                <div
                  key={product.id || product.product_id || idx}
                  className={`w-full h-[260px] opacity-100 rounded-3xl border shadow-none flex flex-col items-center relative bg-white overflow-hidden transition-colors ${selected ? 'border-2 border-[#00674E]' : 'border-2 border-[#E4E4E7]'}`}
                  onClick={() => onToggleProduct(product)}
                  role="button"
                >
                  {/* Top Portion - Fixed Image Height */}
                  <div className="w-full h-[190px] bg-[#D5D6D6] opacity-100 absolute top-0 left-0">
                    <div className="relative w-full h-full">
                      <ImageWithFallback src={product.image} alt={getDisplayName(product)} />
                    </div>
                  </div>
                  {/* Bottom Portion */}
                  <div className="w-full h-[70px] absolute bottom-0 left-0 bg-white flex flex-col items-center justify-start px-4 py-4">
                    <span className="w-full font-lato font-semibold text-[20px] leading-[26px] capitalize text-[#1E1E1E] opacity-100 mb-0 bg-none text-left block">{getDisplayName(product)}</span>
                    <span className="w-full font-lato font-normal text-[18px] leading-[22px] capitalize text-[#787777] opacity-100 bg-none text-left block">{getDisplayPrice(product)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
