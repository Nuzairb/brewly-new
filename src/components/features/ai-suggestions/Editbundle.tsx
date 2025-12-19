"use client";
import React, { useState, useEffect, useRef } from "react";
import { getProducts } from '@/app/api/products/getProducts';
import BundleDetail from "./BundleDetail";
import StatCards from '@/components/ui/StatCards';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, Trash2, Calendar as CalendarIcon, Sparkles, TrendingUp, DollarSign, Package, Plus, ArrowLeft } from "lucide-react";
import { Calendar as DayPickerCalendar } from '@/components/ui/calendar';
import { fetchBundleById, updateBundleById } from '@/lib/hooks/useBundleApi';

interface Product {
  id: string;
  product_id?: string;
  product_name?: string;
  name: string;
  price: number;
  product_price?: number;
  quantity: number;
  image?: string;
}

interface BundleData {
  id: string;
  bundle_name: string;
  bundle_type: string;
  status: string;
  slot1Category: string;
  slot2Category: string;
  bundle_price: number;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  auto_activate: boolean;
  show_on_kiosk: boolean;
  show_on_staff: boolean;
  products: Product[];
  strategy: string;
  description?: string;
}

const BundleEditForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawEditId = searchParams?.get('edit') ?? searchParams?.get('id') ?? null;
  // Normalize common invalid values and ensure we use a numeric id only
  const editId = (rawEditId === null || rawEditId === 'undefined' || rawEditId === 'null') ? null : rawEditId;
  const isValidNumericId = editId !== null && /^\d+$/.test(editId);
  const safeEditId = isValidNumericId ? editId : null;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bundleName, setBundleName] = useState("");
  const [bundleType, setBundleType] = useState("Mealcall");
  const [bundlePrice, setBundlePrice] = useState("");
  const [discount, setDiscount] = useState("20");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const startCalRef = useRef<HTMLDivElement | null>(null);
  const endCalRef = useRef<HTMLDivElement | null>(null);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  const endBtnRef = useRef<HTMLButtonElement | null>(null);
  const [autoActivate, setAutoActivate] = useState(true);
  const [showOnKiosk, setShowOnKiosk] = useState(true);
  const [showOnStaff, setShowOnStaff] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("reduce-slow-moving");
  const [bundleTypeWarning, setBundleTypeWarning] = useState(false);
  const [discountWarning, setDiscountWarning] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Pumpkin Spice Latte", price: 20.00, quantity: 1 },
    { id: "2", name: "Pumpkin Spice Latte", price: 20.00, quantity: 1 },
    { id: "3", name: "Pumpkin Spice Latte", price: 20.00, quantity: 1 },
  ]);
  const [originalBundleData, setOriginalBundleData] = useState<BundleData | null>(null);
  const [bundleStatus, setBundleStatus] = useState("Active");

  const mapToBundleDetail = (b: any) => {
    const productsForDetail = Array.isArray(b.products)
      ? b.products.map((p: any, idx: number) => ({
          id: String(p.product_id || p.id || `p-${idx}`),
          name: p.name || p.product_name || `Product ${idx + 1}`,
          price: Number(p.product_price ?? p.price ?? 0),
          quantity: p.quantity ?? 1,
          image: p.image || p.image_url || undefined,
        }))
      : [];

    const originalPrice = productsForDetail.reduce((sum: number, p: any) => sum + (Number(p.price || 0) * (p.quantity || 1)), 0);

    return {
      id: Number(b.id) || Number(b.bundle_id) || 0,
      name: b.bundle_name || b.name || bundleName || 'Untitled Bundle',
      description: b.description || b.reasoning || '',
      status: (b.status === 'pending' ? 'Pending' : (b.status === 'accepted' || b.status === 'active') ? 'Active' : 'Draft'),
      images: productsForDetail.length > 0 && productsForDetail[0].image ? [productsForDetail[0].image] : (b.image_url ? [b.image_url] : []),
      products: productsForDetail,
      bundlePrice: Number(b.bundle_price ?? bundlePrice ?? 0),
      originalPrice: originalPrice,
      discountPercentage: Number(b.discount_percentage ?? discount ?? 0),
      createdAt: b.created_at || b.start_date || new Date().toISOString(),
      updatedAt: b.bundle_expiry_datetime || b.end_date || undefined,
      eventName: b.event_name || undefined,
      bundleStrategy: b.bundle_strategy || b.strategy || selectedStrategy,
      reasoning: b.reasoning || '',
      bundleType: b.bundle_type || bundleType,
      isManual: b.is_manual ?? false,
    };
  };

  const strategies = [
    {
      id: "reduce-slow-moving",
      icon: <Package className="w-5 h-5 text-[#00674E]" />,
      label: "Reduce Slow-Moving Stock",
    },
    {
      id: "ai-suggested",
      icon: <Sparkles className="w-5 h-5 text-gray-600" />,
      label: "AI Suggested Combo",
    },
    {
      id: "increase-aov",
      icon: <TrendingUp className="w-5 h-5 text-gray-600" />,
      label: "Increase Average Order Value",
    },
    {
      id: "promote-margin",
      icon: <DollarSign className="w-5 h-5 text-gray-600" />,
      label: "Promote High-Margin Items",
    },
  ];

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateString;
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;

      if (showStartCalendar) {
        const clickedInsideCal = startCalRef.current?.contains(target);
        const clickedStartBtn = startBtnRef.current?.contains(target);
        if (!clickedInsideCal && !clickedStartBtn) setShowStartCalendar(false);
      }

      if (showEndCalendar) {
        const clickedInsideCal = endCalRef.current?.contains(target);
        const clickedEndBtn = endBtnRef.current?.contains(target);
        if (!clickedInsideCal && !clickedEndBtn) setShowEndCalendar(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [showStartCalendar, showEndCalendar]);

  // Helper function to enrich product IDs with full details from API
  const enrichProductDetails = async (productIds: string[]): Promise<Product[]> => {
    try {
      const allProducts = await getProducts();
      return productIds.map(id => {
        const idStr = String(id).trim();
        const idLower = idStr.toLowerCase();
        const match: any = allProducts.find((p: any) => {
          const pId = p.id ? String(p.id).trim() : '';
          const pPid = p.product_id ? String(p.product_id).trim() : '';
          const pName = (p.name || p.product_name || '').toString().toLowerCase().trim();
          return pId === idStr || pPid === idStr || pName === idLower;
        });
        if (match) {
          return {
            id: idStr,
            name: match.name || match.product_name || `Product ${idStr}`,
            price: Number(match.price ?? match.product_price ?? 0),
            quantity: 1,
            image: match.image || match.image_url || undefined
          };
        }
        return { 
          id: idStr, 
          name: `Product ${idStr}`, 
          price: 0, 
          quantity: 1 
        };
      });
    } catch (error) {
      console.error('Error enriching products:', error);
      return productIds.map(id => ({ 
        id: String(id), 
        name: `Product ${id}`, 
        price: 0, 
        quantity: 1 
      }));
    }
  };

  useEffect(() => {
    if (!safeEditId) {
      console.warn('Invalid or missing bundle ID:', rawEditId);
      alert("No valid bundle ID provided");
      router.push('/bundles-dashboard/all');
      return;
    }

    setLoading(true);
    fetchBundleById(safeEditId)
      .then(async (bundleData: any) => {
        const status = bundleData?.status || 'active';
        setBundleStatus(status === 'active' || status === 'Active' ? 'Active' : 'Draft');

        const name = bundleData?.bundle_name || bundleData?.name || 'Untitled Bundle';
        setBundleName(name);

        setBundleType(bundleData?.bundle_type || bundleData?.bundleType || "Mealcall");
        

        const price = bundleData?.bundle_price || bundleData?.price || 69.00;
        setBundlePrice(typeof price === 'number' ? price.toString() : price);

        const discountValue = bundleData?.discount_percentage || bundleData?.discount || 20;
        const discountStr = typeof discountValue === 'string'
          ? discountValue.replace('%', '')
          : discountValue.toString();
        setDiscount(discountStr);

        setStartDate(formatDateForInput(bundleData?.start_date || bundleData?.startDate || ""));
        setEndDate(formatDateForInput(bundleData?.end_date || bundleData?.endDate || ""));

        setAutoActivate(bundleData?.auto_activate !== undefined ? bundleData.auto_activate :
                       bundleData?.autoActivate !== undefined ? bundleData.autoActivate : true);
        setShowOnKiosk(bundleData?.show_on_kiosk !== undefined ? bundleData.show_on_kiosk :
                      bundleData?.showOnKiosk !== undefined ? bundleData.showOnKiosk : true);
        setShowOnStaff(bundleData?.show_on_staff !== undefined ? bundleData.show_on_staff :
                      bundleData?.showOnStaff !== undefined ? bundleData.showOnStaff : true);

        setSelectedStrategy(bundleData?.strategy || "reduce-slow-moving");

        if (Array.isArray(bundleData?.products) && bundleData.products.length > 0) {
          const mappedProducts = bundleData.products.map((p: any, idx: number) => ({
            id: String(p.product_id || p.id || `product-${idx + 1}`),
            name: p.name || p.product_name || `Product ${idx + 1}`,
            price: Number(p.product_price || p.price || 20.00),
            quantity: p.quantity || 1,
            image: p.image || p.image_url,
          }));
          
          // Check for selectedProducts from URL params
          try {
            const urlParams = new URLSearchParams(window.location.search);
            const selectedParam = urlParams.get('selectedProducts');
            if (selectedParam) {
              const ids = selectedParam.split(',').map(s => s.trim()).filter(Boolean);
              const existing = new Set(mappedProducts.map((p: any) => String(p.id)));
              const newIds = ids.filter(id => !existing.has(id));
              
              if (newIds.length > 0) {
                const enriched = await enrichProductDetails(newIds);
                setProducts([...mappedProducts, ...enriched]);
              } else {
                setProducts(mappedProducts);
              }
              
              // Remove param from url
              try {
                urlParams.delete('selectedProducts');
                const newSearch = urlParams.toString();
                const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
                router.replace(newUrl);
              } catch (e) {}
            } else {
              setProducts(mappedProducts);
            }
          } catch (e) {
            setProducts(mappedProducts);
          }

          // Check sessionStorage for persisted selections and merge them
          try {
            if (typeof window !== 'undefined') {
              const key = safeEditId ? `selectedProductsForBundle_${safeEditId}` : `selectedProducts`;
              const stored = sessionStorage.getItem(key);
              console.debug('[Editbundle] sessionStorage key=', key, 'stored=', stored);
              if (stored) {
                try {
                  const parsed = JSON.parse(stored);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    // Enrich parsed items with backend product details
                    const allProducts = await getProducts();
                    setProducts(prev => {
                      const existing = new Set(prev.map(p => String(p.id)));
                      const additions = parsed
                        .map((it: any) => {
                          const idStr = String(it.id).trim();
                          const idLower = idStr.toLowerCase();
                          if (existing.has(idStr)) return null;
                          
                          const match: any = allProducts.find((ap: any) => {
                            const apId = ap.id ? String(ap.id).trim() : '';
                            const apPid = ap.product_id ? String(ap.product_id).trim() : '';
                            const apName = (ap.name || ap.product_name || '').toString().toLowerCase().trim();
                            return apId === idStr || apPid === idStr || apName === idLower;
                          });
                          
                          if (match) {
                            return {
                              id: idStr,
                              name: match.name || match.product_name || it.name || `Product ${idStr}`,
                              price: Number(match.price ?? match.product_price ?? it.price ?? 0),
                              quantity: it.quantity || 1,
                              image: match.image || match.image_url || it.image || undefined,
                            } as Product;
                          }
                          return {
                            id: idStr,
                            name: it.name || `Product ${idStr}`,
                            price: Number(it.price || 0),
                            quantity: it.quantity || 1,
                            image: it.image || undefined
                          } as Product;
                        })
                        .filter((it): it is Product => it !== null);
                      
                      console.debug('[Editbundle] merging parsed items:', { existing: Array.from(existing), additions });
                      return [...prev, ...additions];
                    });
                    try { sessionStorage.removeItem(key); } catch (e) {}
                  } else {
                    throw new Error('not-json-array');
                  }
                } catch (e) {
                  const ids = stored.split(',').map((s) => s.trim()).filter(Boolean);
                  console.debug('[Editbundle] parsed ids from storage fallback=', ids);
                  if (ids.length > 0) {
                    const enriched = await enrichProductDetails(ids);
                    setProducts(prev => {
                      const existing = new Set(prev.map(p => String(p.id)));
                      const additions = enriched.filter(p => !existing.has(String(p.id)));
                      return [...prev, ...additions];
                    });
                  }
                  try { sessionStorage.removeItem(key); } catch (e2) {}
                }
              }
            }
          } catch (e) { 
            console.error('[Editbundle] error merging sessionStorage after fetch', e); 
          }
        }

        setOriginalBundleData(bundleData);
      })
      .catch((error: any) => {
        console.error('Error fetching bundle:', error);
        const msg = error instanceof Error ? error.message : String(error);
        if (String(msg).includes('422') || String(msg).includes('int_parsing')) {
          alert('Bundle not found or invalid. Returning to bundles list.');
          router.push('/bundles-dashboard/all');
        } else {
          alert(`Failed to load bundle details: ${msg}`);
        }
      })
      .finally(() => setLoading(false));
  }, [safeEditId, rawEditId, router]);

  // Handle returning selected products from the Add Product page via query param
  useEffect(() => {
    try {
      const selectedParam = searchParams?.get('selectedProducts');
      console.debug('[Editbundle] searchParams effect, selectedProducts=', selectedParam);
      if (selectedParam) {
        const ids = selectedParam.split(',').map(s => s.trim()).filter(Boolean);
        console.debug('[Editbundle] parsed ids from param=', ids);
        if (ids.length > 0) {
          (async () => {
            const enriched = await enrichProductDetails(ids);
            setProducts(prev => {
              const existing = new Set(prev.map(p => String(p.id)));
              const additions = enriched.filter(p => !existing.has(String(p.id)));
              return [...prev, ...additions];
            });
          })();

          // Remove the query param so it doesn't reapply on refresh
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('selectedProducts');
            router.replace(url.pathname + url.search);
          } catch (e) {}
        }
      }
    } catch (e) { 
      console.error('[Editbundle] error in searchParams effect', e); 
    }
  }, [searchParams, router]);

  // Also check sessionStorage for selections (reliable fallback)
  useEffect(() => {
    try {
      const key = safeEditId ? `selectedProductsForBundle_${safeEditId}` : `selectedProducts`;
      const stored = typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
      console.debug('[Editbundle] sessionStorage check, key=', key, 'stored=', stored);
      if (stored) {
        (async () => {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const allProducts = await getProducts();
              setProducts(prev => {
                const existing = new Set(prev.map(p => String(p.id)));
                const additions = parsed
                  .map((it: any) => {
                    const idStr = String(it.id).trim();
                    const idLower = idStr.toLowerCase();
                    if (existing.has(idStr)) return null;
                    
                    const match: any = allProducts.find((ap: any) => {
                      const apId = ap.id ? String(ap.id).trim() : '';
                      const apPid = ap.product_id ? String(ap.product_id).trim() : '';
                      const apName = (ap.name || ap.product_name || '').toString().toLowerCase().trim();
                      return apId === idStr || apPid === idStr || apName === idLower;
                    });
                    
                    if (match) {
                      return {
                        id: idStr,
                        name: match.name || match.product_name || it.name || `Product ${idStr}`,
                        price: Number(match.price ?? match.product_price ?? it.price ?? 0),
                        quantity: it.quantity || 1,
                        image: match.image || match.image_url || it.image || undefined,
                      } as Product;
                    }
                    return {
                      id: idStr,
                      name: it.name || `Product ${idStr}`,
                      price: Number(it.price || 0),
                      quantity: it.quantity || 1,
                      image: it.image || undefined
                    } as Product;
                  })
                  .filter((it): it is Product => it !== null);
                
                return additions.length > 0 ? [...prev, ...additions] : prev;
              });
              try { sessionStorage.removeItem(key); } catch (e) {}
            } else {
              throw new Error('not-json-array');
            }
          } catch (e) {
            const ids = stored.split(',').map(s => s.trim()).filter(Boolean);
            console.debug('[Editbundle] parsed ids from storage fallback=', ids);
            if (ids.length > 0) {
              const enriched = await enrichProductDetails(ids);
              setProducts(prev => {
                const existing = new Set(prev.map(p => String(p.id)));
                const additions = enriched.filter(p => !existing.has(String(p.id)));
                return [...prev, ...additions];
              });
            }
            try { sessionStorage.removeItem(key); } catch (e2) {}
          }
        })();
      }
    } catch (e) { 
      console.error('[Editbundle] error reading sessionStorage', e); 
    }
  }, [safeEditId]);

  const removeProduct = (id: string) => {
    if (products.length <= 1) {
      alert("Bundle must have at least one product");
      return;
    }
    setProducts(products.filter(p => p.id !== id));
  };

  const addNewProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: `New Product`,
      price: 0,
      quantity: 1,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const validateForm = () => {
    if (!bundleName.trim()) {
      alert("Please enter a bundle name");
      return false;
    }
    
    const price = parseFloat(bundlePrice);
    if (!bundlePrice || isNaN(price) || price < 0) {
      alert("Please enter a valid bundle price");
      return false;
    }
    
    if (products.length === 0) {
      alert("Please add at least one product to the bundle");
      return false;
    }

    for (const product of products) {
      if (!product.name.trim()) {
        alert("Please enter a name for all products");
        return false;
      }
      if (product.price < 0) {
        alert("Product price cannot be negative");
        return false;
      }
      if (product.quantity < 1) {
        alert("Product quantity must be at least 1");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Ensure product_ids use backend IDs. If a product was added with only a name, try to resolve its ID from backend.
      let allProductsForResolve: any[] = [];
      try {
        allProductsForResolve = await getProducts();
      } catch (e) {
        allProductsForResolve = [];
      }

      const nameToId = new Map<string, string>();
      for (const ap of allProductsForResolve) {
        if (ap && (ap.id || ap.product_id) && ap.name) {
          nameToId.set(String((ap.name || '').toLowerCase()).trim(), String(ap.id ?? ap.product_id));
        }
      }

      const resolvedProducts = products.map((p) => {
        const idRaw = String(p.id ?? p.product_id ?? '').trim();
        const nameKey = (p.name || '').toLowerCase().trim();
        const foundByName = nameToId.get(nameKey);
        const resolvedId = foundByName ?? idRaw ?? '';
        return {
          original: p,
          resolvedId: resolvedId || (p.id ? String(p.id) : ''),
        };
      });

      const product_ids = resolvedProducts.map(r => r.resolvedId || String(r.original.id || r.original.product_id || r.original.name));
      const product_names = products.map(p => (p.name ?? p.product_name ?? '').trim());
      const original_price = products.reduce((sum, p) => sum + (Number(p.price ?? p.product_price ?? 0) * (p.quantity ?? 1)), 0);

      const payload = {
        bundle_name: bundleName.trim(),
        bundle_type: bundleType,
        description: originalBundleData?.description ?? '',
        product_ids,
        product_names,
        original_price,
        bundle_price: parseFloat(bundlePrice),
        discount_percentage: parseFloat(discount),
        start_date: startDate || null,
        end_date: endDate || null,
        auto_activate: autoActivate,
        show_on_kiosk: showOnKiosk,
        show_on_staff: showOnStaff,
        strategy: selectedStrategy,
        products: products.map(product => ({
          product_id: ((): string | number | undefined => {
            // prefer resolved id if available
            const found = resolvedProducts.find(r => r.original === product || String(r.original.id) === String(product.id) || String(r.original.name) === String(product.name));
            return found && found.resolvedId ? found.resolvedId : product.id ?? product.product_id;
          })(),
          name: (product.name ?? '').trim(),
          product_price: Number(product.price ?? product.product_price ?? 0),
          quantity: product.quantity ?? 1,
          image: product.image
        }))
      };

      console.log("Saving payload:", payload);

      const idToUse = safeEditId;
      if (!idToUse) throw new Error('Invalid bundle id');

      const result = await updateBundleById(idToUse, payload);
      // After successful save, re-fetch bundle from backend and update local state
      try {
        const fresh = await fetchBundleById(idToUse);
        const mapped = mapToBundleDetail(fresh);
        setOriginalBundleData(fresh);
        setProducts(mapped.products || []);
      } catch (e) {
        // ignore refetch errors
      }
      alert("Bundle updated successfully!");
      setTimeout(() => {
        router.push(`/ai-suggested/${idToUse}`);
      }, 1000);

    } catch (error) {
      console.error("Error saving bundle:", error);
      alert(`Failed to save bundle: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading bundle data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 sm:px-8 py-6">
      {/* FIXED: Outer container padding reduced */}
      <div className="max-w-full mx-auto px-6 sm:px-8">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            {/* Back Button (match BundleDetail) */}
            <button
              className="flex items-center gap-2 text-[#222] -ml-[80px] text-[18px] font-lato font-normal cursor-pointer hover:opacity-70 transition-opacity mb-30"
              onClick={() => router.back()}
            >
              <ArrowLeft size={25} className="text-black" />
              <span className="font-lato font-normal text-[18px] text-[#222] ">Back</span>
            </button>
            
            <h1 className="text-[32px] md:text-[32px]  font-lato font-medium text-black">{bundleName || "Edit Bundle"}</h1>
            <span className={`px-2.5 py-1 text-[12px] font-lato font-normal rounded ${
              bundleStatus === 'Active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-[#10A7601A] text-gray-700'
            }`}>
              {bundleStatus}
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 font-lato text-gray-700 font-medium text-[16px] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className={`px-4 py-2 font-lato text-white font-medium text-[18px] bg-[#1A5D4A] rounded-lg transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Warning Alert - Show for non-draft bundles (Active/Pending) */}
      
          <div className="flex items-start gap-3 p-3 px-3 -mt-[12px] mb-6 bg-[#00ABC214] rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[16px] font-lato font-normal md:text-[16px] text-black flex-1">
              This bundle is currently active. Changes will apply immediately.
            </p>
          </div>
      

        {/* Metrics (stat cards) - reuse same cards as BundleDetail */}
        <div>

        <h2 className="text-[20px] font-lato font-semibold text-black mb-3 px-2">Bundle strategy</h2>
        <div className="mb-6 ml-[4px]">
          <StatCards
            cards={[
              { title: 'Orders', value: '89', percentage: '+12%', description: 'This Week', variant: 'active-bundle', valueVariant: 'bundle-number', descVariant: 'this-week' },
              { title: 'Revenue', value: 'AED 2,499', percentage: '+12%', description: 'Running campaign', variant: 'revenue', valueVariant: 'bundle-amount', descVariant: 'this-month' },
              { title: 'AOV', value: '22%', percentage: '+12%', description: 'This Week', variant: 'revenue', valueVariant: 'bundle-amount', descVariant: 'this-week' },
              { title: 'Conversion Rate', value: '+14%', percentage: '+12%', description: 'This Week', variant: 'slow-moving', valueVariant: 'bundle-number', descVariant: 'this-week' },
            ]}
            isVisible={true}
          />
        </div>
        </div>

        {/* FIXED: All sections with reduced gap and increased width */}
        <div className="space-y-4">
          

          
          {/* Bundle Composition Section */}
          <div className="bg-white p-5 sm:p-6 rounded-lg ml-0">
            <h2 className="text-[20px] font-lato font-semibold text-black mb-5">Bundle Composition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  Bundle Name
                </label>
                <input
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg "
                  placeholder="Enter bundle name"
                />
              </div>
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  Bundle Type
                </label>
                <div className="relative">
                  <select
                    value={bundleType}
                    onChange={(e) => setBundleType(e.target.value)}
                    disabled={!!originalBundleData}
                    className="w-full font-lato px-4 h-[48px] bg-white border border-gray-300 rounded-lg disabled:opacity-80"
                  >
                    {bundleType && !["Mealcall","Combo","Special","Limited","Seasonal"].includes(bundleType) && (
                      <option value={bundleType}>{bundleType}</option>
                    )}
                    <option value="Mealcall">Mealcall</option>
                    <option value="Combo">Combo</option>
                    <option value="Special">Special</option>
                    <option value="Limited">Limited</option>
                    <option value="Seasonal">Seasonal</option>
                  </select>
                  {originalBundleData && (
                    <button
                      type="button"
                      onClick={() => {
                        setBundleTypeWarning(true);
                        setTimeout(() => setBundleTypeWarning(false), 3000);
                      }}
                      className="absolute font-lato inset-0 w-full h-full bg-transparent cursor-not-allowed"
                      aria-label="Bundle Type cannot be changed after creation"
                    />
                  )}
                </div>
                {bundleTypeWarning && (
                  <div className="mt-2 text-sm text-rose-600">Bundle Type cannot be changed after creation.</div>
                )}
              </div>
            </div>
            <h2 className="text-[16px] font-lato font-normal text-black mt-20 mb-4">Bundle description</h2>
            <textarea
              value={originalBundleData?.description || ''}
              onChange={(e) => setOriginalBundleData({ ...originalBundleData!, description: e.target.value })}
              className="w-full px-4 py-3 bg-white shadow-sm rounded-lg "
              placeholder="Enter bundle description"
            />
          </div>

          {/* Products in Bundle Section - FIXED: Increased grid columns */}
          <div className="bg-white p-5 sm:p-6 rounded-lg ml-0">
            <h2 className="text-[20px] font-lato font-semibold text-black mb-5">Products in Bundle ({products.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group w-full h-[260px] rounded-3xl border-2 border-gray-100 flex flex-col items-center relative bg-white overflow-hidden transition-all duration-300 ease-in-out max-w-[260px]`}
                >
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center z-20 hover:bg-gray-50 transition-colors border border-gray-100"
                    title="Remove product"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Image area */}
                  <div className="w-full h-[190px] bg-[#D5D6D6] absolute top-0 left-0 overflow-hidden rounded-t-3xl">
                    <div className="w-full h-full">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                  </div>

                  {/* Bottom area with editable name and price/qty */}
                  <div className="w-full h-[70px] absolute bottom-0 left-0 bg-white flex items-center justify-between px-4 py-3 rounded-b-3xl">
                    <div className="flex-1 pr-3">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                        className="w-full font-lato font-semibold text-[20px] text-[#1E1E1E] placeholder-gray-500 bg-white border-none focus:ring-0"
                        placeholder="Product name"
                      />
                      <div className="text-[18px] font-lato font-normal text-[#787777] mt-1">AED {Number(product.price || 0).toFixed(2)}</div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-[16px] font-lato font-normal text-[#787777] uppercase mt-6">QTY {product.quantity || 1}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Product */}
              <button
                onClick={() => {
                  // Navigate to centralized product selection page for adding products
                  const bundleIdParam = safeEditId ? `bundleId=${encodeURIComponent(String(safeEditId))}` : '';
                  const returnUrl = window.location.pathname + window.location.search;
                  const url = `/add-product?${bundleIdParam ? bundleIdParam + '&' : ''}returnUrl=${encodeURIComponent(returnUrl)}`;
                  try {
                    window.location.href = url;
                  } catch (e) {
                    router.push(url);
                  }
                }}
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 transition-all flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00674E] rounded-full flex items-center justify-center mb-3 transition-colors">
                  <Plus className="text-white text-[24px] sm:text-[28px]" />
                </div>
                <span className="text-[14px] sm:text-[14px] font-medium text-[#00674E]">Add New Product</span>
              </button>
            </div>
          </div>

          {/* Pricing & Profit Impact Section */}
          <div className="bg-white p-5 sm:p-6 rounded-lg ml-0">
            <h2 className="text-[20px] font-lato font-semibold text-black mb-5">Pricing & Profit Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  Bundle Price (AED)
                </label>
                <input
                  type="number"
                  value={bundlePrice}
                  onChange={(e) => setBundlePrice(e.target.value)}
                  className="w-full px-4 h-[48px] bg-white border border-gray-300 rounded-lg "
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  Discount (%)
                </label>
                <div className="relative">
                  <select
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    disabled={!!originalBundleData}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg disabled:opacity-80"
                  >
                    {discount && !["0","5","10","15","20","25","30"].includes(String(discount)) && (
                      <option value={discount}>{discount}%</option>
                    )}
                    <option value="0">No Discount</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                  </select>
                  {originalBundleData && (
                    <button
                      type="button"
                      onClick={() => {
                        setDiscountWarning(true);
                        setTimeout(() => setDiscountWarning(false), 3000);
                      }}
                      className="absolute inset-0 w-full h-full bg-transparent cursor-not-allowed"
                      aria-label="Discount cannot be changed"
                    />
                  )}
                </div>
                {discountWarning && (
                  <div className="mt-2 text-sm text-rose-600">Discount cannot be changed after creation.</div>
                )}
              </div>
            </div>
          </div>

          {/* Schedule & Activation Section */}
          <div className="bg-white p-5 sm:p-6 ml-0">
            <h2 className="text-[20px] font-lato font-semibold text-black mb-5">Schedule & Activation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <button
                    ref={startBtnRef}
                    type="button"
                    onClick={() => { setShowStartCalendar(!showStartCalendar); setShowEndCalendar(false); }}
                    className="w-full text-left px-4 h-[48px] pl-12 bg-white border border-gray-300 rounded-lg "
                  >
                    <span className={`${startDate ? 'text-black' : 'text-gray-400'}`}>
                      {startDate ? formatDateForDisplay(startDate) : 'Select start date'}
                    </span>
                  </button>
                  <CalendarIcon className="absolute bg-white left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  {showStartCalendar && (
                    <div ref={startCalRef} className="absolute z-30 mt-2 bg-white rounded-lg shadow-lg p-2">
                      <DayPickerCalendar
                        mode="single"
                        selected={startDate ? new Date(startDate) : undefined}
                        onSelect={(date: Date | undefined) => {
                          if (date) setStartDate(date.toISOString().split('T')[0]);
                          setShowStartCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                
              </div>
              <div>
                <label className="block text-[16px] font-lato font-normal text-black mb-2">
                  End Date
                </label>
                <div className="relative">
                  <button
                    ref={endBtnRef}
                    type="button"
                    onClick={() => { setShowEndCalendar(!showEndCalendar); setShowStartCalendar(false); }}
                    className="w-full text-left px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg "
                  >
                    <span className={`${endDate ? 'text-black' : 'text-gray-400'}`}>
                      {endDate ? formatDateForDisplay(endDate) : 'Select end date'}
                    </span>
                  </button>
                  <CalendarIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                  {showEndCalendar && (
                    <div ref={endCalRef} className="absolute z-30 mt-2 bg-white rounded-lg shadow-lg p-2">
                      <DayPickerCalendar
                        mode="single"
                        selected={endDate ? new Date(endDate) : undefined}
                        onSelect={(date: Date | undefined) => {
                          if (date) setEndDate(date.toISOString().split('T')[0]);
                          setShowEndCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-[16px] font-lato font-normal text-black">Auto-activate</span>
                 
                </div>
                <button
                  onClick={() => setAutoActivate(!autoActivate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoActivate ? "bg-[#00674E]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoActivate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-[16px] font-lato font-normal text-black">Show on kiosk</span>
               </div>
                <button
                  onClick={() => setShowOnKiosk(!showOnKiosk)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showOnKiosk ? "bg-[#00674E]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showOnKiosk ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-[16px] font-lato font-normal text-black">Show on Staff screen</span>
                 
                </div>
                <button
                  onClick={() => setShowOnStaff(!showOnStaff)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showOnStaff ? "bg-[#00674E]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showOnStaff ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Bundle preview removed per request */}
      </div>
    </div>
  );
};

export default BundleEditForm;