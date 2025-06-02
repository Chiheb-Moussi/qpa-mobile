"use client"

import React, { useRef, useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import Card from "../components/Card"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import Menu from "@/components/Menu"

type TrainerSpecializationScreenNavigationProp = StackNavigationProp<RootStackParamList, "TrainerSpecialization">

interface TrainerType {
  id: number
  name: string
  code: string
  trainers: string[]
}

const TrainerSpecializationScreen = () => {
  const navigation = useNavigation<TrainerSpecializationScreenNavigationProp>()
  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current
  const [trainerTypes, setTrainerTypes] = useState<TrainerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrainerTypes()
  }, [])

  const fetchTrainerTypes = async () => {
    try {
      const response = await fetch("https://qpa-api.starlightwebsolutions.com/api/trainer_types")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTrainerTypes(data["member"])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching trainer types:", err)
      setError("Failed to load trainer types")
      setLoading(false)
    }
  }

  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const navigateToTrainersList = ({ trainerTypeCode, trainerTypeName }: { trainerTypeCode: string; trainerTypeName: string }) => {
    navigation.navigate("TrainersList", { trainerTypeCode, trainerTypeName  })
  }

  const handleMenuPress = (menuItem: string) => {
    switch (menuItem) {
      case "trainers":
        // Already on trainers screen
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
        break
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="المدربين" showBackButton />
        <Menu />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="المدربين" showBackButton />
        <Menu />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="المدربين" showBackButton />
      <Menu />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Card style={styles.blueCard}>
            <Animated.Text
              style={[
                styles.title,
                {
                  opacity: fadeAnim1,
                  transform: [
                    {
                      translateX: fadeAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              المدربين
            </Animated.Text>

            <View style={styles.specializationList}>
              {trainerTypes.filter((type) => type.code !== "military_shows").map((type, index) => (
                <React.Fragment key={type.id}>
                  {index > 0 && <View style={styles.divider} />}
                  <Animated.View
                    style={{
                      opacity: fadeAnim1,
                      transform: [
                        {
                          translateY: fadeAnim1.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    }}
                  >
                    <TouchableOpacity
                      style={styles.specializationButton}
                      onPress={() => navigateToTrainersList({ trainerTypeCode: type.code, trainerTypeName: type.name })}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.specializationText}>{type.name}</Text>
                      <View style={styles.arrowContainer}>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                </React.Fragment>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  blueCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "right",
    marginBottom: 10,
    marginTop: -10,
  },
  specializationList: {
    width: "100%",
  },
  specializationButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  specializationText: {
    fontSize: 16,
    fontFamily: "Cairo-SemiBold",
    color: "white",
    textAlign: "right",
    flex: 1,
  },
  arrowContainer: {
    borderRadius: 15,
    padding: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
})

export default TrainerSpecializationScreen
