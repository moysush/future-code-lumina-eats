import { Table } from "@mantine/core";

const CustomerPage = ({ customers }) => {
  const customerRows = customers.map((customer) => (
    <Table.Tr key={customer._id}>
      <Table.Td>{customer._id}</Table.Td>
      <Table.Td>{customer.name}</Table.Td>
      <Table.Td miw={120}>{customer.email}</Table.Td>
      <Table.Td miw={130}>{customer.phone}</Table.Td>
      <Table.Td>{new Date(customer.createdAt).toLocaleDateString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder withColumnBorders striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Customer ID</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{customerRows}</Table.Tbody>
    </Table>
  );
};

export default CustomerPage;
