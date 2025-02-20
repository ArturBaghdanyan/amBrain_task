import { createContext, useEffect, useState } from "react";

export const RestaurantContext = createContext(null);

export const RestaurantProvider = ({children}) => {
  const [addItem, setAddItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChairIndex, setSelectedChairIndex] = useState('');
  const [selectedTableIndex, setSelectedTableIndex] = useState('');
  const [chairName, setChairName] = useState('');
  const [hasSavedTables, setHasSavedTables] = useState(false);

  useEffect(() => {
    const savedTables = localStorage.getItem("savedTables");
    const parsedTables = savedTables ? JSON.parse(savedTables) : [];

    setAddItem(parsedTables);
    setHasSavedTables(Boolean(parsedTables.length));
  }, []);

  return (
    <RestaurantContext.Provider
    value={{
      addItem,
      setAddItem,
      isModalVisible,
      setIsModalVisible,
      selectedTableIndex,
      setSelectedTableIndex,
      selectedChairIndex,
      setSelectedChairIndex,
      chairName,
      setChairName,
      hasSavedTables,
      setHasSavedTables
    }}>
      {children}
    </RestaurantContext.Provider>
  )
}
