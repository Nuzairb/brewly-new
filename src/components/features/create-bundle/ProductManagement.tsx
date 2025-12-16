import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts, type Product as ApiProduct } from "@/app/api/products/getProducts";

// Fallback image component (uses object-cover)
function ImageWithFallback({ src, alt }: { src?: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || `${process.env.NEXT_PUBLIC_BASE_URL}/icons/coffee-cup.svg`);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover rounded-t-xl transition-all duration-500 ease-in-out group-hover:scale-110"
      onError={() => setImgSrc(`${process.env.NEXT_PUBLIC_BASE_URL}/icons/coffee-cup.svg`)}
    />
  );
}

type Product = {
  id?: string | number;
  product_id?: string;
  product_name?: string;
  name?: string;
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
    getProducts()
      .then((apiProducts: ApiProduct[]) => {
        const normalized = apiProducts.map((p) => ({
          id: p.id ?? undefined,
          product_id: p.id ? String(p.id) : undefined,
          product_name: p.name ?? undefined,
          name: p.name ?? '',
          price: p.price ?? undefined,
          product_price: p.price ?? undefined,
          image: p.image ?? p.image_url ?? undefined,
          category: p.category ? String(p.category) : undefined,
        }));
        setProducts(normalized);
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
                className={`pb-[9px] w-[50px] h-[26px] transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90${idx < allCategories.length - 1 ? ' mr-[10px]' : ''}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {/* Product Grid - Show all products in one grid */}
        <div className="w-full min-h-[280px] opacity-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="text-[#787777] text-[18px] mt-8 animate-pulse">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-[#787777] text-[18px] mt-8">No products found.</div>
          ) : (
            filteredProducts.map((product, idx) => {
              const selected = isSelected(product);
              return (
                <div
                  key={product.id || product.product_id || idx}
                  className={`group w-full h-[260px] opacity-100 rounded-3xl border shadow-none flex flex-col items-center relative bg-white overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
                  ${selected 
                    ? 'border-2 border-[#00674E] transform scale-[1.02] shadow-lg' 
                    : 'border-2 border-[#E4E4E7] hover:border-[#00674E]/50 hover:shadow-xl hover:transform hover:scale-[1.02]'}`}
                  onClick={() => onToggleProduct(product)}
                  role="button"
                >
                  {/* Top Portion - Fixed Image Height */}
                  <div className="w-full h-[190px] bg-[#D5D6D6] opacity-100 absolute top-0 left-0 overflow-hidden rounded-t-3xl">
                    <div className="relative w-full h-full group-hover:brightness-110 transition-all duration-500 ease-in-out">
                      <ImageWithFallback src={product.image} alt={getDisplayName(product)} />
                    </div>
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/10 group-hover:via-black/5 group-hover:to-black/0 transition-all duration-500 ease-in-out z-10"></div>
                  </div>
                  {/* Bottom Portion */}
                  <div className="w-full h-[70px] absolute bottom-0 left-0 bg-white flex flex-col items-center justify-start px-4 py-4 transition-all duration-300 ease-in-out group-hover:bg-gray-50 rounded-b-3xl">
                    <span className="w-full font-lato font-semibold text-[20px] leading-[26px] capitalize text-[#1E1E1E] opacity-100 mb-0 bg-none text-left block transition-all duration-300 ease-in-out group-hover:text-[#00674E]">
                      {getDisplayName(product)}
                    </span>
                    <span className="w-full font-lato font-normal text-[18px] leading-[22px] capitalize text-[#787777] opacity-100 bg-none text-left block transition-all duration-300 ease-in-out group-hover:text-[#00674E]/80">
                      {getDisplayPrice(product)}
                    </span>
                  </div>
                  {/* Selection indicator */}
                  {selected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#00674E] rounded-full flex items-center justify-center z-20 transition-all duration-300 ease-in-out">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 ease-in-out">
                        <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  {/* Hover check indicator */}
                  {!selected && (
                    <div className="absolute top-3 right-3 w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#00674E]"></div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}