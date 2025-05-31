import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuContextType = {
  selectedMenuButton: string | null;
  setSelectedMenuButton: (menuItem: string | null) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMenuButton, setSelectedMenuButton] = useState<string | null>(null);

  useEffect(() => {
    // Load the selected menu from AsyncStorage when the component mounts
    const loadSelectedMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('@selected_menu');
        if (savedMenu !== null) {
          setSelectedMenuButton(savedMenu);
        }
      } catch (e) {
        console.error('Error loading selected menu', e);
      }
    };

    loadSelectedMenu();
  }, []);

  const handleSetSelectedMenuButton = async (menuItem: string | null) => {
    setSelectedMenuButton(menuItem);
    try {
      if (menuItem === null) {
        await AsyncStorage.removeItem('@selected_menu');
      } else {
        await AsyncStorage.setItem('@selected_menu', menuItem);
      }
    } catch (e) {
      console.error('Error saving selected menu', e);
    }
  };

  return (
    <MenuContext.Provider value={{ selectedMenuButton, setSelectedMenuButton: handleSetSelectedMenuButton }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 