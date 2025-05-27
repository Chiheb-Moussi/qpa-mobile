"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"

type TrainersListScreenNavigationProp = StackNavigationProp<RootStackParamList, "TrainersList">

type TrainersListScreenRouteProp = RouteProp<RootStackParamList, "TrainersList">

interface Trainer {
  id: string
  name: string
  image: any
}

// Composant pour l'élément de la liste des formateurs
const TrainerItem = ({ item, index, onPress }: { item: Trainer; index: number; onPress: () => void }) => {
  const itemFadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(itemFadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start()
  }, [itemFadeAnim, index])

  return (
    <Animated.View
      style={[
        styles.trainerItemContainer,
        {
          opacity: itemFadeAnim,
          transform: [
            {
              translateY: itemFadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.trainerItem} onPress={onPress} activeOpacity={0.7}>
        <Image source={item.image} style={styles.trainerImage} />
        <Text style={styles.trainerName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const TrainersListScreen = () => {
  const navigation = useNavigation<TrainersListScreenNavigationProp>()
  const route = useRoute<TrainersListScreenRouteProp>()
  const [searchText, setSearchText] = useState("")
  const fadeAnim = useRef(new Animated.Value(0)).current

  const { specializationType } = route.params

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  // Mock data - would be replaced with real API data
  const trainers: Trainer[] = [
    { id: "1", name: "محمد خليفة السوسي", image: require("../assets/images/trainer.png") },
    { id: "2", name: "أنيس العبايسي", image: require("../assets/images/trainer.png") },
    { id: "3", name: "محمد أنور النجار", image: require("../assets/images/trainer.png") },
    { id: "4", name: "محمد خالد الصدفي", image: require("../assets/images/trainer.png") },
    { id: "5", name: "نسيم عبد المجيد الأخول", image: require("../assets/images/trainer.png") },
    { id: "6", name: "عيسى حسن سعدون", image: require("../assets/images/trainer.png") },
    { id: "7", name: "عماد الكحلة", image: require("../assets/images/trainer.png") },
    { id: "8", name: "العربي حركاتي", image: require("../assets/images/trainer.png") },
    { id: "9", name: "علي سليم", image: require("../assets/images/trainer.png") },
  ]

  const filteredTrainers = trainers.filter((trainer) => trainer.name.toLowerCase().includes(searchText.toLowerCase()))

  const navigateToTrainerDetails = (trainerId: string) => {
    navigation.navigate("TrainerDetails", { trainerId })
  }

  const renderTrainerItem = ({ item, index }: { item: Trainer; index: number }) => (
    <TrainerItem item={item} index={index} onPress={() => navigateToTrainerDetails(item.id)} />
  )

  const title = specializationType === "sports" ? "مدربين فرع التدريب الرياضي" : "مدربين فرع التدريب العسكري"

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} showBackButton />

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
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTrainers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainerItem}
        contentContainerStyle={styles.listContent}
        numColumns={3}
      />

      <QatarFlag size={50} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
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
    marginLeft: 10,
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
  },
  trainerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  trainerName: {
    fontFamily: "Cairo-SemiBold",
    fontSize: 12,
    textAlign: "center",
    color: Colors.text,
  },
})

export default TrainersListScreen
