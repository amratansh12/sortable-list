import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const type = "Item";

const Item = ({
  item,
  index,
  moveItem,
}: {
  item: string;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: type,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { id: item, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${
        isDragging ? "opacity-50" : "opacity-100"
      } flex items-center justify-center space-x-1 bg-slate-100 py-4 px-10 rounded-md shadow-sm`}
    >
      {index + 1}: {item}
    </div>
  );
};

const ItemsList = () => {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items];

    //delete currennt element from its position
    const [movedItem] = updatedItems.splice(fromIndex, 1);

    //inserts current item at given index
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <section className="p-2 w-full text-black flex flex-col space-y-2 items-center justify-center">
      <h2 className="text-lg font-bold underline">Items</h2>
      {items.map((item: string, index: number) => {
        return item ? (
          <Item key={item} moveItem={moveItem} item={item} index={index} />
        ) : null;
      })}
    </section>
  );
};

export default ItemsList;
