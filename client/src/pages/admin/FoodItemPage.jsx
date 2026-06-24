import {
  Paper,
  Select,
  Table,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";

const FoodItemPage = ({ foodItems, handleFoodChange }) => {
  const foodItemRows = foodItems.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>#{item._id.slice(-6)}</Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.name}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.name) {
              handleFoodChange(item._id, { name: newValue });
            }
          }}
          aria-label="Update Food Name"
        />
      </Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.description}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.description) {
              handleFoodChange(item._id, { description: newValue });
            }
          }}
          aria-label="Update Food Description"
        />
      </Table.Td>
      <Table.Td miw={130}>
        <TextInput
          defaultValue={item.price}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.price) {
              handleFoodChange(item._id, { price: newValue });
            }
          }}
          aria-label="Update Food Price"
        />
      </Table.Td>
      <Table.Td miw={90}>
        <TextInput
          defaultValue={item.category}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.category) {
              handleFoodChange(item._id, { category: newValue });
            }
          }}
          aria-label="Update Food Category"
        />
      </Table.Td>
      <Table.Td miw={150}>
        <Textarea
          defaultValue={item.imageUrl}
          onBlur={(e) => {
            const newValue = e.currentTarget.value;
            if (newValue !== item.imageUrl) {
              handleFoodChange(item._id, { imageUrl: newValue });
            }
          }}
          aria-label="Update Food ImageUrl"
        />
      </Table.Td>
      <Table.Td miw={110}>
        <Select
          placeholder="Pick status"
          data={["True", "False"]}
          defaultValue={item.isAvailable ? "True" : "False"}
          onChange={(newValue) =>
            handleFoodChange(item._id, { isAvailable: newValue === "True" })
          }
          aria-label="Update Food Availability"
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper>
      <Title order={2} mb="lg">
        Food items
      </Title>
      <Table withTableBorder withColumnBorders striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Food Item ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Image Url</Table.Th>
            <Table.Th>Available</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{foodItemRows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default FoodItemPage;
