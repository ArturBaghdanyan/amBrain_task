import {createContext, useEffect, useState} from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({children}) => {
  const [addItem, setAddItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChairIndex, setSelectedChairIndex] = useState(null);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [chairName, setChairName] = useState(null);
  const [hasSavedTables, setHasSavedTables] = useState(false);


  useEffect(() => {
    const savedTables = localStorage.getItem("savedTables");

    if (savedTables) {
      const parsedTables = JSON.parse(savedTables);
      setAddItem(parsedTables);
      setHasSavedTables(parsedTables.length > 0);
    } else {
      setHasSavedTables(false);
    }
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
