import React, { useState } from "react";

const OrderFormat = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState("");

  const createOrder = async () => {
    const payload = {
      createdBy: "Soumya", // later: login user
      role: "ASE",         // later: dynamic role
      products,
      totalValue,
    };

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("ORDER RESPONSE:", data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Form</h2>

      {/* TEMP INPUT (we will upgrade later) */}
      <button
        onClick={() =>
          setProducts([
            { name: "Product A", qty: 2 },
            { name: "Product B", qty: 1 },
          ])
        }
      >
        Add Sample Products
      </button>

      <br /><br />

      <input
        type="number"
        placeholder="Total Value"
        value={totalValue}
        onChange={(e) => setTotalValue(e.target.value)}
      />

      <br /><br />

      <button onClick={createOrder}>
        Submit Order
      </button>
    </div>
  );
};

export default OrderFormat;