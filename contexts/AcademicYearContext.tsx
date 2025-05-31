import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AcademicYear = {
  id: number;
  name: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

type AcademicYearContextType = {
  selectedYear: AcademicYear | null;
  setSelectedYear: (year: AcademicYear) => void;
  academicYears: AcademicYear[];
  isLoading: boolean;
  error: string | null;
  fetchAcademicYears: () => Promise<void>;
}

const AcademicYearContext = createContext<AcademicYearContextType | undefined>(undefined);

export const AcademicYearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAcademicYears = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://qpa-api.starlightwebsolutions.com/api/academic_years');
      const data = await response.json();

      const years = data.member.map((year: any) => ({
        id: year.id,
        name: year.name,
        isActive: year.isActive,
        startDate: year.startDate,
        endDate: year.endDate
      }));

      setAcademicYears(years);

      // If no year is selected, select the active year
      if (!selectedYear) {
        const activeYear = years.find(year => year.isActive);
        if (activeYear) {
          setSelectedYear(activeYear);
          await AsyncStorage.setItem('@selected_academic_year', JSON.stringify(activeYear));
        }
      }
    } catch (error) {
      setError('Failed to fetch academic years');
      console.error('Error fetching academic years:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadSavedYear = async () => {
      try {
        const savedYear = await AsyncStorage.getItem('@selected_academic_year');
        if (savedYear) {
          setSelectedYear(JSON.parse(savedYear));
        }
      } catch (error) {
        console.error('Error loading saved academic year:', error);
      }
    };

    loadSavedYear();
    fetchAcademicYears();
  }, []);

  const handleSetSelectedYear = async (year: AcademicYear) => {
    setSelectedYear(year);
    try {
      await AsyncStorage.setItem('@selected_academic_year', JSON.stringify(year));
    } catch (error) {
      console.error('Error saving selected academic year:', error);
    }
  };

  return (
    <AcademicYearContext.Provider 
      value={{ 
        selectedYear, 
        setSelectedYear: handleSetSelectedYear, 
        academicYears,
        isLoading,
        error,
        fetchAcademicYears
      }}
    >
      {children}
    </AcademicYearContext.Provider>
  );
};

export const useAcademicYear = () => {
  const context = useContext(AcademicYearContext);
  if (context === undefined) {
    throw new Error('useAcademicYear must be used within an AcademicYearProvider');
  }
  return context;
}; 