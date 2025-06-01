"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
// @ts-ignore
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import Menu from "@/components/Menu"

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


  const renderTrainerItem = ({ item }: { item: MilitaryTrainer }) => (
    <View style={styles.trainerItemContainer}>
      <TouchableOpacity style={styles.trainerItem} onPress={() => handleTrainerPress(item.id)} activeOpacity={0.7}>
        <Image source={item.image} style={styles.trainerImage} />
        <Text style={styles.trainerName} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title="سرايا العروض العسكرية" showBackButton />

      <Menu />

      <View style={styles.searchContainer}>
        
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

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 8,
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
    paddingVertical: 6,
    alignItems: "center",
    height:50,
    marginTop:10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    paddingRight: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
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
    borderColor: "#eee",
  },
  listContent: {
    padding: 8,
  },
  trainerItemContainer: {
    flex: 1 / 3,
    padding: 8,
  },
  trainerItem: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    height: 140,
  },
  trainerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
  },
  trainerName: {
    fontFamily: "Cairo-SemiBold",
    fontSize: 12,
    textAlign: "center",
    color: Colors.text,
    height: 36,
    width: "100%",
  },
})

export default MilitaryTrainersListScreen
