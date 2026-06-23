import { Paper, Select, Table, Title } from "@mantine/core";

const OrderPage = ({ orders, handleStatusChange }) => {
  const orderRows = orders.map((order) => (
    <Table.Tr key={order._id}>
      <Table.Td>{order._id}</Table.Td>
      <Table.Td miw={120}>${order.totalAmount.toFixed(2)}</Table.Td>
      <Table.Td miw={150}>
        <Select
          placeholder="Pick status"
          data={["Pending", "Preparing", "Ready", "Delivered"]}
          defaultValue={order.orderStatus}
          onChange={(newStatus) => handleStatusChange(order._id, newStatus)}
          aria-label="Update Order Status"
        />
      </Table.Td>
      <Table.Td miw={130}>{order.paymentStatus}</Table.Td>

      <Table.Td>{new Date(order.createdAt).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper>
      <Title order={2} mb="lg">
        Order Details
      </Title>
      <Table withTableBorder withColumnBorders striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Order ID</Table.Th>
            <Table.Th>Total Amount</Table.Th>
            <Table.Th>Order Status</Table.Th>
            <Table.Th>Payment Status</Table.Th>
            <Table.Th>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{orderRows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default OrderPage;
