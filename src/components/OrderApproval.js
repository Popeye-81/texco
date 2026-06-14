import React, { useEffect, useState } from "react";

const OrderApproval = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    const res = await fetch("/api/orders/list");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Approve order
  const approveOrder = async (orderId) => {
    const res = await fetch("/api/orders/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        approvedBy: "ADMIN",
        role: "ADMIN",
      }),
    });

    const data = await res.json();
    console.log("APPROVED:", data);

    fetchOrders();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Approval Dashboard</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Created By:</b> {order.createdBy}</p>
          <p><b>Role:</b> {order.role}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalValue}</p>

          <button
            onClick={() => approveOrder(order.id)}
            disabled={order.status === "APPROVED"}
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderApproval;