import {
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Text,
  Table,
  Select,
  NavLink,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getAllOrders, updateOrderStatus } from "../../services/orders";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/user";
import OrderPage from "./OrderPage";
import CustomerPage from "./CustomerPage";
import { getFood, updateFood } from "../../services/food";
import FoodItemPage from "./FoodItemPage";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

const AdminDashboard = ({ children }) => {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const fetchData = async () => {
    try {
      const orderData = await getAllOrders();
      const customerData = await getAllCustomers();
      const foodItemsData = await getFood();

      setOrders(orderData);
      setCustomers(customerData);
      setFoodItems(foodItemsData);
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

  const handleFoodChange = async (foodId, newStatus) => {
    try {
      await updateFood(foodId, newStatus);

      setFoodItems((prev) =>
        prev.map((food) =>
          food._id === foodId ? { ...food, ...newStatus } : food,
        ),
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header ps={15} pt={15}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title>Admin Dashboard</Title>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavLink
          component={Link}
          to="/admin/orders"
          label="Orders"
          active={location.pathname.includes("/admin/orders")}
        />
        <NavLink
          component={Link}
          to="/admin/customers"
          label="Customers"
          active={location.pathname.includes("/admin/customers")}
        />
        <NavLink
          component={Link}
          to="/admin/foods"
          label="Manage Food Items"
          active={location.pathname.includes("/admin/foods")}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Table.ScrollContainer type="native">
          <Routes>
            <Route path="/" element={<Navigate to="orders" replace />} />
            <Route
              path="orders"
              element={
                <OrderPage
                  orders={orders}
                  handleStatusChange={handleStatusChange}
                />
              }
            />
            <Route
              path="customers"
              element={<CustomerPage customers={customers} />}
            />
            <Route
              path="foods"
              element={
                <FoodItemPage
                  foodItems={foodItems}
                  handleFoodChange={handleFoodChange}
                />
              }
            />
          </Routes>
        </Table.ScrollContainer>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminDashboard;
