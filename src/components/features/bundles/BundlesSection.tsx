"use client";

import React from "react";

// Table data type
interface BundleData {
  bundleName: string;
  product: string;
  items: number;
  sales: number;
  createDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

// Sample data - backend se aayega
const bundlesData: BundleData[] = [
  {
    bundleName: "Starter Pack",
    product: "Bagel + Cappuccino",
    items: 5,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Bagel + Cappuccino",
    items: 2,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Bagel + Cappuccino",
    product: "Bagel + Cappuccino",
    items: 2,
    sales: 342,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Active"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Oat Milk",
    items: 3,
    sales: 200,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Expired"
  },
  {
    bundleName: "Rainy Day Comfort Pack",
    product: "Oat Milk",
    items: 3,
    sales: 100,
    createDate: "11/12/22",
    expiryDate: "11/12/22",
    status: "Expired"
  }
];

// Column positions - Figma se exact
const columnPositions = {
  bundleName: '17px',
  product: '219px',
  items: '418px',
  sales: '556px',
  createDate: '699px',
  expiryDate: '827px',
  status: '951.25px'
};

// Text style for cells
const cellTextStyle = {
  height: '20px',
  opacity: 1,
  fontFamily: 'Lato, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0%',
  color: '#1E1E1E',
  whiteSpace: 'nowrap' as const,
};

export default function BundlesSection() {
  return (
    <div>
      {/* Bundles Title */}
      <h2
        style={{
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#1E1E1E',
          margin: 0,
          marginTop: '32px',
          marginBottom: '24px',
        }}
      >
        
      </h2>

      {/* Bundles Parent Container */}
      <div
        style={{
          width: '1096px',
          height: '458px',
          borderRadius: '16px',
          border: '1px solid #EEEEEE',
          background: '#FFFFFF',
          opacity: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left Side - All Bundles */}
        <h3
          style={{
            width: '107px',
            height: '30px',
            position: 'absolute',
            top: '28px',
            left: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '30px',
            letterSpacing: '0%',
            color: '#787777',
            opacity: 1,
            margin: 0,
          }}
        >
          All Bundles
        </h3>

        {/* Right Side - Buttons Container */}
        <div
          style={{
            width: '228px',
            height: '48px',
            position: 'absolute',
            top: '19px',
            left: '830px',
            gap: '16px',
            opacity: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Filters Button */}
          <button
            style={{
              width: '99px',
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #D0D3D9',
              opacity: 1,
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
            className="hover:bg-gray-50 transition-colors"
          >
            <div
              style={{
                width: '99px',
                height: '40px',
                borderRadius: '8px',
                gap: '8px',
                paddingTop: '10px',
                paddingRight: '16px',
                paddingBottom: '10px',
                paddingLeft: '16px',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5H17.5M5 10H15M8.33333 15H11.6667"
                  stroke="#787777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#787777',
                }}
              >
                Filters
              </span>
            </div>
          </button>

          {/* Download all Button */}
          <button
            style={{
              width: '113px',
              height: '48px',
              borderRadius: '8px',
              border: '1px solid #D0D3D9',
              opacity: 1,
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
            className="hover:bg-gray-50 transition-colors"
          >
            <div
              style={{
                width: '113px',
                height: '40px',
                borderRadius: '8px',
                gap: '8px',
                paddingTop: '10px',
                paddingRight: '16px',
                paddingBottom: '10px',
                paddingLeft: '16px',
                
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#787777',
                  whiteSpace: 'nowrap',
                }}
              >
                Download all
              </span>
            </div>
          </button>
        </div>

        {/* Table Container */}
        <div
          style={{
            position: 'absolute',
            top: '81px',
            left: '0px',
            width: '1062px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Table Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '20px',
              marginBottom: '24px',
              position: 'relative',
              width: '1096px',
              paddingBottom: '8px',
              borderBottom: '1px solid #EEEEEE',
            }}
          >
            <div style={{ position: 'absolute', left: '17px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Bundle Name
            </div>
            <div style={{ position: 'absolute', left: '219px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Product
            </div>
            <div style={{ position: 'absolute', left: '418px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Items
            </div>
            <div style={{ position: 'absolute', left: '556px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Sales
            </div>
            <div style={{ position: 'absolute', left: '699px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Create Date
            </div>
            <div style={{ position: 'absolute', left: '827px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Expiry Date
            </div>
            <div style={{ position: 'absolute', left: '982px', height: '20px', fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#787777', whiteSpace: 'nowrap' }}>
              Status
            </div>
          </div>

          {/* Table Rows Container */}
          <div
            style={{
              width: '1096px',
              height: '254px',
              opacity: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {bundlesData.map((bundle, index) => (
              <div
                key={index}
                style={{
                  width: '1096px',
                  height: '42px',
                  opacity: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: index < bundlesData.length - 1 ? '1px solid #EEEEEE' : 'none',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '36px',
                    opacity: 1,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Bundle Name */}
                  <div
                    style={{
                      width: '91px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '13.75px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.bundleName}
                    </span>
                  </div>

                  {/* Product */}
                  <div
                    style={{
                      width: '138px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '214.75px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.product}
                    </span>
                  </div>

                  {/* Items */}
                  <div
                    style={{
                      width: '25px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '410.75px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.items}
                    </span>
                  </div>

                  {/* Sales */}
                  <div
                    style={{
                      width: '41px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '551.25px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.sales}
                    </span>
                  </div>

                  {/* Create Date */}
                  <div
                    style={{
                      width: '78px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '690.25px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.createDate}
                    </span>
                  </div>

                  {/* Expiry Date */}
                  <div
                    style={{
                      width: '78px',
                      height: '36px',
                      opacity: 1,
                      position: 'absolute',
                      left: '820.25px',
                      gap: '8px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1E1E1E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {bundle.expiryDate}
                    </span>
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      width: '101px',
                      height: '28px',
                      opacity: 1,
                      position: 'absolute',
                      top: '4px',
                      left: '981.25px',
                      borderRadius: '4px',
                      paddingTop: '4px',
                      paddingRight: '12px',
                      paddingBottom: '4px',
                      paddingLeft: '12px',
                      background: bundle.status === 'Active' ? '#10A7601A' : '#FF23111A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: bundle.status === 'Active' ? '#10A760' : '#FF2311',
                      }}
                    >
                      {bundle.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Container */}
          <div
            style={{
              width: '1063px',
              height: '38px',
              opacity: 1,
              position: 'absolute',
              top: '320px',
              left: '17px',
              gap: '412px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Previous Button */}
            <button
              style={{
                width: '92px',
                height: '38px',
                opacity: 1,
                borderRadius: '4px',
                border: '1px solid #D0D3D9',
                paddingTop: '9px',
                paddingRight: '17px',
                paddingBottom: '9px',
                paddingLeft: '17px',
                background: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: '58px',
                  height: '20px',
                  opacity: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  color: '#787777',
                }}
              >
                Previous
              </span>
            </button>

            {/* Page Info */}
            <div
              style={{
                width: '81px',
                height: '20px',
                opacity: 1,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  color: '#787777',
                }}
              >
                Page{' '}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0%',
                    color: '#787777',
                  }}
                >
                  1
                </span>{' '}
                of 10
              </span>
            </div>

            {/* Next Button */}
            <button
              style={{
                width: '66px',
                height: '38px',
                opacity: 1,
                borderRadius: '4px',
                border: '1px solid #D0D3D9',
                paddingTop: '9px',
                paddingRight: '17px',
                paddingBottom: '9px',
                paddingLeft: '17px',
                background: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '20px',
                  opacity: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%',
                  color: '#787777',
                }}
              >
                Next
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
