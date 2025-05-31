import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAcademicYear } from './AcademicYearContext';

type Course = {
  id: number;
  name: string;
  date: string;
  status: string;
  duration: string;
  program: string;
  startDate: string;
  endDate: string;
  fitnessTrainerHours: number;
  selfDefenseTrainerHours: number;
  fitnessTrainerEvaluation: string;
  selfDefenseTrainerEvaluation: string;
  alternativeStartDate: string;
  alternativeEndDate: string;
}

type CoursesContextType = {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  totalTrainers: number;
  fetchCourses: () => Promise<void>;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTrainers, setTotalTrainers] = useState(0);
  const { selectedYear } = useAcademicYear();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  const formatDuration = (duration: number) => {
    return `${duration} ${duration === 1 ? 'أسبوع' : 'أسابيع'}`;
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://qpa-api.starlightwebsolutions.com/api/courses?page=1');
      const data = await response.json();

      const formattedCourses = data.member.map((course: any) => ({
        id: course.id,
        name: course.courseName,
        date: formatDate(course.startDate),
        status: course.status,
        duration: formatDuration(course.courseDuration || 0),
        program: "مرفق", // Default value as it's not in the API
        startDate: course.startDate,
        endDate: course.endDate,
        fitnessTrainerHours: course.fitnessTrainerHours,
        selfDefenseTrainerHours: course.selfDefenseTrainerHours,
        fitnessTrainerEvaluation: course.fitnessTrainerEvaluation,
        selfDefenseTrainerEvaluation: course.selfDefenseTrainerEvaluation,
        alternativeStartDate: formatDate(course.alternativeStartDate),
        alternativeEndDate: formatDate(course.alternativeEndDate)   
      }));

      setCourses(formattedCourses);
      
      // Calculate total trainers (sum of fitness and self-defense trainer hours)
      const total = formattedCourses.reduce((acc: number, course: Course) => {
        return acc + (course.fitnessTrainerHours || 0) + (course.selfDefenseTrainerHours || 0);
      }, 0);
      setTotalTrainers(total);

    } catch (error) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      fetchCourses();
    }
  }, [selectedYear]);

  return (
    <CoursesContext.Provider 
      value={{ 
        courses,
        isLoading,
        error,
        totalTrainers,
        fetchCourses
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}; 