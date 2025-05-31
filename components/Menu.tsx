"use client"

import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import MenuButton from "../components/MenuButton"
import { useMenu } from "../contexts/MenuContext"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

const Menu = () => {
  const { selectedMenuButton, setSelectedMenuButton } = useMenu()
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const handleMenuPress = (menuItem: string) => {
    setSelectedMenuButton(menuItem)

    switch (menuItem) {
      case "trainers":
        navigation.navigate("TrainerSpecialization")
        break
      case "students":
        // Navigate to students screen
        break
      case "military":
        navigation.navigate("MilitaryTrainersList")
        break
      case "courses":
        navigation.navigate("Courses")
        break
      default:
        navigation.navigate("Home")
    }
  }

  return (

    <View style={styles.menuContainer}>
    <MenuButton
        title="الدورات"
        icon={require("../assets/images/book.png")}
        selectedIcon={require("../assets/images/book-white.png")}
        onPress={() => handleMenuPress("courses")}
        isSelected={selectedMenuButton === "courses"}
        />
        <MenuButton
        title="سرايا العروض العسكرية"
        icon={require("../assets/images/fighter-jet.png")}
        selectedIcon={require("../assets/images/fighter-jet-white.png")}
        onPress={() => handleMenuPress("military")}
        isSelected={selectedMenuButton === "military"}
        />
        <MenuButton
        title="طلبة الدبلوم"
        icon={require("../assets/images/student.png")}
        selectedIcon={require("../assets/images/student-white.png")}
        onPress={() => handleMenuPress("students")}
        isSelected={selectedMenuButton === "students"}
        />
        
        <MenuButton
        title="المدربين"
        icon={require("../assets/images/coach.png")}
        selectedIcon={require("../assets/images/coach-white.png")}
        onPress={() => handleMenuPress("trainers")}
        isSelected={selectedMenuButton === "trainers"}
        />
    </View>
        

  )
}

const styles = StyleSheet.create({
  
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default Menu
