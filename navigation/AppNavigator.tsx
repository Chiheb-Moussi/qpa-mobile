"use client"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import HomeScreen from "../screens/HomeScreen"
import TrainerSpecializationScreen from "../screens/TrainerSpecializationScreen"
import TrainersListScreen from "../screens/TrainersListScreen"
import TrainerDetailsScreen from "../screens/TrainerDetailsScreen"
import CoursesScreen from "../screens/CoursesScreen"
import CourseDetailScreen from "../screens/CourseDetailScreen"
import MilitaryTrainersListScreen from "../screens/MilitaryTrainersListScreen"
import MilitaryTrainerDetailScreen from "../screens/MilitaryTrainerDetailScreen"
import StudentPromotionScreen from "../screens/StudentPromotionScreen"
import StudentDiplomaListScreen from "../screens/StudentDiplomaListScreen"
import StudentDetailScreen from "../screens/StudentDetailScreen"
import { useAuth } from "../contexts/AuthContext"

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  TrainerSpecialization: undefined
  TrainersList: { trainerTypeCode: string, trainerTypeName: string }
  TrainerDetails: { trainerId: string }
  Courses: undefined
  CourseDetail: { course: any }
  MilitaryTrainersList: undefined
  MilitaryTrainerDetail: { trainerId: string }
  StudentPromotion: undefined
  StudentDiplomaList: { promotionId: string, promotionName: string }
  StudentDetail: { student: Student }
}

interface Student {
  id: string
  military_number: string
  name: string
  promotion: string
  fraction: string
  birth_date: string
  age: number
  height: number
  ideal_weight: number
  nationality: string
  session: string
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TrainerSpecialization" component={TrainerSpecializationScreen} />
          <Stack.Screen name="TrainersList" component={TrainersListScreen} />
          <Stack.Screen name="TrainerDetails" component={TrainerDetailsScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="MilitaryTrainersList" component={MilitaryTrainersListScreen} />
          <Stack.Screen name="MilitaryTrainerDetail" component={MilitaryTrainerDetailScreen} />
          <Stack.Screen name="StudentPromotion" component={StudentPromotionScreen} />
          <Stack.Screen name="StudentDiplomaList" component={StudentDiplomaListScreen} />
          <Stack.Screen name="StudentDetail" component={StudentDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
