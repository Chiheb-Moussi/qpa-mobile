"use client"
import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import HomeScreen from "../screens/HomeScreen"
import TrainerSpecializationScreen from "../screens/TrainerSpecializationScreen"
import TrainersListScreen from "../screens/TrainersListScreen"
import TrainerDetailsScreen from "../screens/TrainerDetailsScreen"
import CoursesScreen from "../screens/CoursesScreen"
import CourseDetailScreen from "../screens/CourseDetailScreen"
import MilitaryTrainersListScreen from "../screens/MilitaryTrainersListScreen"
import MilitaryTrainerDetailScreen from "../screens/MilitaryTrainerDetailScreen"
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
}

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
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
        </>
      )}
    </Stack.Navigator>
  )
}

export default AppNavigator
