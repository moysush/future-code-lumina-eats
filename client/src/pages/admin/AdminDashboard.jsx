import {
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Text,
  Table,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getAllOrders, updateOrderStatus } from "../../services/orders";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/user";
import OrderPage from "./OrderPage";
import CustomerPage from "./CustomerPage";

const AdminDashboard = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const orderData = await getAllOrders();
      const customerData = await getAllCustomers();

      setOrders(orderData);
      setCustomers(customerData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title>Admin Dashboard</Title>
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>
        <OrderPage orders={orders} />
        <CustomerPage customers={customers} />
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard;
