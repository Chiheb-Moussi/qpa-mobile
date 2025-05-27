"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import MenuButton from "../components/MenuButton"

type MilitaryTrainersListScreenNavigationProp = StackNavigationProp<RootStackParamList, "MilitaryTrainersList">

interface MilitaryTrainer {
  id: string
  name: string
  image: any
}

const MilitaryTrainersListScreen = () => {
  const navigation = useNavigation<MilitaryTrainersListScreenNavigationProp>()
  const [searchText, setSearchText] = useState("")

  // Mock data for military trainers
  const militaryTrainers: MilitaryTrainer[] = [
    { id: "1", name: "محمد خليفة السوسي", image: require("../assets/images/trainer.png") },
    { id: "2", name: "فوزي الشلبي", image: require("../assets/images/trainer.png") },
    { id: "3", name: "الشيخ يعقوب", image: require("../assets/images/trainer.png") },
    { id: "4", name: "عيسى حسن سعدون", image: require("../assets/images/trainer.png") },
    { id: "5", name: "نسيم عبد المجيد الأخدل", image: require("../assets/images/trainer.png") },
    { id: "6", name: "نجم الدين دلدوم", image: require("../assets/images/trainer.png") },
    { id: "7", name: "العربي حركاتي", image: require("../assets/images/trainer.png") },
    { id: "8", name: "علي سليم", image: require("../assets/images/trainer.png") },
    { id: "9", name: "عماد الكحلة", image: require("../assets/images/trainer.png") },
  ]

  const filteredTrainers = militaryTrainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const handleTrainerPress = (trainerId: string) => {
    navigation.navigate("MilitaryTrainerDetail", { trainerId })
  }

  const handleMenuPress = (menuItem: string) => {
    switch (menuItem) {
      case "trainers":
        navigation.navigate("TrainerSpecialization")
        break
      case "students":
        // Navigate to students screen
        break
      case "military":
        // Already on military trainers screen
        break
      case "courses":
        navigation.navigate("Courses")
        break
      default:
        break
    }
  }

  const renderTrainerItem = ({ item }: { item: MilitaryTrainer }) => (
    <TouchableOpacity style={styles.trainerItem} onPress={() => handleTrainerPress(item.id)} activeOpacity={0.7}>
      <Image source={item.image} style={styles.trainerImage} />
      <Text style={styles.trainerName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title="سرايا العروض العسكرية" showBackButton />

      <View style={styles.menuContainer}>
        <MenuButton
          title="الدورات"
          icon={require("../assets/images/search.png")}
          onPress={() => handleMenuPress("courses")}
        />
        <MenuButton
          title="ليرايا العروض العسكرية"
          icon={require("../assets/images/police.png")}
          onPress={() => handleMenuPress("military")}
          isSelected={true}
        />
        <MenuButton
          title="طلبة الدبلوم"
          icon={require("../assets/images/students-icon.png")}
          onPress={() => handleMenuPress("students")}
        />
        <MenuButton
          title="المدربين"
          icon={require("../assets/images/trainers-icon.png")}
          onPress={() => handleMenuPress("trainers")}
        />
        
        
      
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={22} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="البحث"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        </View>
      </View>

      <FlatList
        data={filteredTrainers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainerItem}
        numColumns={3}
        contentContainerStyle={styles.listContent}
      />

      <QatarFlag size={50} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0e6d2", // Beige background as shown in image 10
  },
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
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Cairo-Regular",
    textAlign: "right",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  listContent: {
    padding: 10,
  },
  trainerItem: {
    flex: 1 / 3,
    alignItems: "center",
    padding: 10,
    height: 140, // Fixed height for all cards
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  trainerName: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "center",
    color: Colors.text,
    height: 36, // Fixed height for text (2 lines)
    width: "100%",
  },
})

export default MilitaryTrainersListScreen
