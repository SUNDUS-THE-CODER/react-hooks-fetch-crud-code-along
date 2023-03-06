import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    const arr = [...items];
    arr.splice(arr.findIndex((key) => key.id === updatedItem.id), 1, updatedItem);
    setItems(arr);
  }

  function handleDeleteItem(deletedItem) {
    setItems(items.filter((item) => item.id !== deletedItem.id));
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let fetchedItems = await fetch("http://localhost:4000/items");
        fetchedItems = await fetchItems.json();
        setItems(fetchedItems);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onAddItem={handleAddItem}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
