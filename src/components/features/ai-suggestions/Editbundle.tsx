"use client";
import React, { useState, useEffect } from "react";
import BundleDetail from "./BundleDetail";
import StatCards from '@/components/ui/StatCards';
import { useSearchParams, useRouter } from 'next/navigation';
import { X, Trash2, Calendar, Sparkles, TrendingUp, DollarSign, Package, Plus, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
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
  const [slot1, setSlot1] = useState("Coffee");
  const [slot2, setSlot2] = useState("Snacks");
  const [bundlePrice, setBundlePrice] = useState("");
  const [discount, setDiscount] = useState("20");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [autoActivate, setAutoActivate] = useState(true);
  const [showOnKiosk, setShowOnKiosk] = useState(true);
  const [showOnStaff, setShowOnStaff] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("reduce-slow-moving");
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
      icon: <Package className="w-5 h-5 text-teal-600" />,
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
    if (!safeEditId) {
      console.warn('Invalid or missing bundle ID:', rawEditId);
      alert("No valid bundle ID provided");
      router.push('/bundles-dashboard/all');
      return;
    }

    const fetchBundleData = async () => {
      try {
        setLoading(true);
        
        console.log("Fetching bundle with ID:", safeEditId);
        
        const response = await fetch(`/api/bundles/generated/${safeEditId}`);

        if (!response.ok) {
          // Try to extract structured error information from backend
          let errorBody: any = null;
          try {
            const text = await response.text();
            try {
              errorBody = JSON.parse(text);
            } catch (e) {
              errorBody = text;
            }
          } catch (e) {
            errorBody = `HTTP ${response.status}`;
          }
          console.error('Backend returned error for bundle fetch:', response.status, errorBody);
          throw new Error(`Failed to fetch bundle: ${response.status} ${typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody)}`);
        }

        const data = await response.json();
        console.log("Fetched bundle data:", data);

        if (!data) {
          alert("No bundle data received from server");
          return;
        }

        const bundleData = data;
        
        console.log("Transforming bundle data:", bundleData);
        
        const status = bundleData?.status || 'active';
        setBundleStatus(status === 'active' || status === 'Active' ? 'Active' : 'Draft');
        
        const name = bundleData?.bundle_name || bundleData?.name || 'Untitled Bundle';
        setBundleName(name);
        
        setBundleType(bundleData?.bundle_type || bundleData?.bundleType || "Mealcall");
        setSlot1(bundleData?.slot1Category || bundleData?.slot1 || "Coffee");
        setSlot2(bundleData?.slot2Category || bundleData?.slot2 || "Snacks");
        
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
          console.log("Processing products:", bundleData.products);
          const mappedProducts = bundleData.products.map((p: any, idx: number) => ({
            id: String(p.product_id || p.id || `product-${idx + 1}`),
            name: p.name || p.product_name || `Product ${idx + 1}`,
            price: Number(p.product_price || p.price || 20.00),
            quantity: p.quantity || 1,
            image: p.image || p.image_url,
          }));
          setProducts(mappedProducts);
          console.log("Mapped products:", mappedProducts);
        } else {
          console.log("No products found in bundle data");
        }

        setOriginalBundleData(bundleData);
      } catch (error) {
        console.error("Error fetching bundle:", error);
          const msg = error instanceof Error ? error.message : 'Unknown error';
          console.error('Detailed error when fetching bundle:', msg);
          if (String(msg).includes('422') || String(msg).includes('int_parsing')) {
            alert('Bundle not found or invalid. Returning to bundles list.');
            router.push('/bundles-dashboard/all');
          } else {
            alert(`Failed to load bundle details: ${msg}`);
          }
      } finally {
        setLoading(false);
      }
    };

    fetchBundleData();
  }, [safeEditId, rawEditId, router]);

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
      const payload = {
        bundle_name: bundleName.trim(),
        bundle_type: bundleType,
        slot1Category: slot1,
        slot2Category: slot2,
        bundle_price: parseFloat(bundlePrice),
        discount_percentage: parseFloat(discount),
        start_date: startDate || null,
        end_date: endDate || null,
        auto_activate: autoActivate,
        show_on_kiosk: showOnKiosk,
        show_on_staff: showOnStaff,
        strategy: selectedStrategy,
        products: products.map(product => ({
          product_id: product.id,
          name: product.name.trim(),
          product_price: product.price,
          quantity: product.quantity,
          image: product.image
        }))
      };

      console.log("Saving payload:", payload);

      const idToUse = safeEditId;
      if (!idToUse) throw new Error('Invalid bundle id');

      const response = await fetch(`/api/bundles/generated/${idToUse}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          const text = await response.text();
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Save response:", result);

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
    <div className="min-h-screen bg-white px-2 sm:px-3 md:px-4 py-6 text-sm md:text-base">
      {/* FIXED: Outer container padding reduced */}
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3">
            {/* Back Button Added */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{bundleName || "Edit Bundle"}</h1>
            <span className={`px-2.5 py-1 text-xs font-medium rounded ${
              bundleStatus === 'Active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {bundleStatus}
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className={`px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Warning Alert - Show only for active bundles */}
        {bundleStatus === 'Active' && (
          <div className="flex items-start gap-3 p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm md:text-base text-gray-700 flex-1">
              This bundle is currently active. Changes will apply immediately.
            </p>
            <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Metrics (stat cards) - reuse same cards as BundleDetail */}
        <div className="mb-6">
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

        {/* FIXED: All sections with reduced gap and increased width */}
        <div className="space-y-6">
          

          {/* Bundle Composition Section */}
          <div className="bg-white p-5 sm:p-6 ">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Bundle Composition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slot 1
                </label>
                <select
                  value={slot1}
                  onChange={(e) => setSlot1(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Coffee">Coffee</option>
                  <option value="Tea">Tea</option>
                  <option value="Juice">Juice</option>
                  <option value="Smoothie">Smoothie</option>
                  <option value="Milkshake">Milkshake</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slot 2
                </label>
                <select
                  value={slot2}
                  onChange={(e) => setSlot2(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Snacks">Snacks</option>
                  <option value="Pastry">Pastry</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Salad">Salad</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bundle Basics Section */}
          <div className="bg-white p-5 sm:p-6 rounded-lg ">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Bundle Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bundle Name
                </label>
                <input
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter bundle name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bundle Type
                </label>
                <select
                  value={bundleType}
                  onChange={(e) => setBundleType(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="Mealcall">Mealcall</option>
                  <option value="Combo">Combo</option>
                  <option value="Special">Special</option>
                  <option value="Limited">Limited</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products in Bundle Section - FIXED: Increased grid columns */}
          <div className="bg-white p-5 sm:p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Products in Bundle ({products.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {products.map((product) => (
                <div key={product.id} className="relative bg-white rounded-[18px] p-0 border border-gray-100 shadow-md overflow-hidden w-full max-w-[260px]">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute -top-3 right-4 w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center z-20 hover:bg-gray-50 transition-colors border border-gray-100"
                    title="Remove product"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>

                  <div className="w-full h-44 bg-gray-100 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-full font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-gray-500"
                        placeholder="Product name"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Price (AED)</div>
                        <div className="mt-1 text-lg sm:text-xl font-bold text-gray-900">AED {Number(product.price || 0).toFixed(2)}</div>
                      </div>
                      <div className="w-20 flex flex-col items-center">
                        <div className="text-xs text-gray-500">QTY</div>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => updateProduct(product.id, { quantity: parseInt(e.target.value) || 1 })}
                          className="mt-1 w-16 px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 text-center"
                          min="1"
                          placeholder="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Product */}
              <button
                onClick={addNewProduct}
                className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-teal-500 hover:bg-teal-50 transition-all flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px] group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-teal-600 transition-colors">
                  <Plus className="text-white text-xl sm:text-2xl" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-teal-700">Add New Product</span>
              </button>
            </div>
          </div>

          {/* Pricing & Profit Impact Section */}
          <div className="bg-white p-5 sm:p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Pricing & Profit Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bundle Price (AED)
                </label>
                <input
                  type="number"
                  value={bundlePrice}
                  onChange={(e) => setBundlePrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Total price customers will pay for the bundle
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <select
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="0">No Discount</option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Percentage discount compared to buying items separately
                </p>
              </div>
            </div>
          </div>

          {/* Schedule & Activation Section */}
          <div className="bg-white p-5 sm:p-6 ">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Schedule & Activation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {startDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateForDisplay(startDate)}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {endDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateForDisplay(endDate)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-5 border-t border-gray-200">
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-sm font-medium text-gray-700">Auto-activate</span>
                  <p className="text-xs text-gray-500 mt-0.5">Activate bundle automatically on start date</p>
                </div>
                <button
                  onClick={() => setAutoActivate(!autoActivate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoActivate ? "bg-teal-600" : "bg-gray-300"
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
                  <span className="text-sm font-medium text-gray-700">Show on kiosk</span>
                  <p className="text-xs text-gray-500 mt-0.5">Display bundle on self-service kiosk</p>
                </div>
                <button
                  onClick={() => setShowOnKiosk(!showOnKiosk)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showOnKiosk ? "bg-teal-600" : "bg-gray-300"
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
                  <span className="text-sm font-medium text-gray-700">Show on Staff screen</span>
                  <p className="text-xs text-gray-500 mt-0.5">Display bundle on staff POS interface</p>
                </div>
                <button
                  onClick={() => setShowOnStaff(!showOnStaff)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showOnStaff ? "bg-teal-600" : "bg-gray-300"
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