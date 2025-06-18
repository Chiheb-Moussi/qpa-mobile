"use client"

import { useState, useRef, useEffect } from "react"
import { View, StyleSheet, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../navigation/AppNavigator"
import MenuButton from "../components/MenuButton"
import { useMenu } from "../contexts/MenuContext"

type NavigationProp = StackNavigationProp<RootStackParamList>

const Menu = () => {
  const { selectedMenuButton, setSelectedMenuButton } = useMenu()
  const navigation = useNavigation<NavigationProp>()

  const handleMenuPress = (menuItem: string) => {
    setSelectedMenuButton(menuItem)
    console.log('Menu item pressed:', menuItem)

    switch (menuItem) {
      case "trainers":
        console.log('Navigating to TrainerSpecialization')
        navigation.navigate("TrainerSpecialization")
        break
      case "students":
        console.log('Navigating to StudentPromotion')
        navigation.navigate("StudentPromotion")
        break
      case "military":
        console.log('Navigating to MilitaryTrainersList')
        navigation.navigate("MilitaryTrainersList")
        break
      case "courses":
        console.log('Navigating to Courses')
        navigation.navigate("Courses")
        break
      default:
        console.log('Navigating to Home')
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
      />{/*
      <MenuButton
        title="سرايا العروض العسكرية"
        icon={require("../assets/images/policemen.png")}
        selectedIcon={require("../assets/images/policemen-white.png")}
        onPress={() => handleMenuPress("military")}
        isSelected={selectedMenuButton === "military"}
      />*/}
      <MenuButton
        title="طلبة الدبلوم"
        icon={require("../assets/images/student.png")}
        selectedIcon={require("../assets/images/student-white.png")}
        onPress={() => {
          console.log('Student button pressed directly');
          handleMenuPress("students");
        }}
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
