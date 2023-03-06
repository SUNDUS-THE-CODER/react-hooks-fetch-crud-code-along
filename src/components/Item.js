import React from "react";

function Item({ item, handleUpdateItem, onDeleteItem }) {
  const handleInCart = async (e, item) => {
    try {
      e.preventDefault();
      let addedItem = await fetch(`http://localhost:4000/items/${item.id}`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inCart: !item.inCart
          })
        });
      addedItem = await addedItem.json();
      handleUpdateItem(addedItem);
    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteItem = async (e, item) => {
    try {
      e.preventDefault();
      await fetch(`http://localhost:4000/items/${item.id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });
      onDeleteItem(item);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={(e) => handleInCart(e, item)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={(e) => deleteItem(e, item)}>Delete</button>
    </li>
  );
}

export default Item;
