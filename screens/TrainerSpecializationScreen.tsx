"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import Card from "../components/Card"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import MenuButton from "../components/MenuButton"

type TrainerSpecializationScreenNavigationProp = StackNavigationProp<RootStackParamList, "TrainerSpecialization">

const TrainerSpecializationScreen = () => {
  const navigation = useNavigation<TrainerSpecializationScreenNavigationProp>()
  const fadeAnim1 = useRef(new Animated.Value(0)).current
  const fadeAnim2 = useRef(new Animated.Value(0)).current

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

  const navigateToTrainersList = (specializationType: string) => {
    navigation.navigate("TrainersList", { specializationType })
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="المدربين" showBackButton />


      <View style={styles.menuContainer}>
      <MenuButton title="الدورات" icon={require("../assets/images/search.png")} onPress={() => {}} />
        <MenuButton
          title="سرايا العروض العسكرية"
          icon={require("../assets/images/police.png")}
          onPress={() => {}}
        />
          <MenuButton title="طلبة الدبلوم" icon={require("../assets/images/students-icon.png")} onPress={() => {}} />
        <MenuButton
          title="المدربين"
          icon={require("../assets/images/trainers-icon.png")}
          onPress={() => {}}
          isSelected={true}
        />
      
      
        
      </View>

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
                  onPress={() => navigateToTrainersList("sports")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.specializationText}>مدربين فرع التدريب الرياضي</Text>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.divider} />

              <Animated.View
                style={{
                  opacity: fadeAnim2,
                  transform: [
                    {
                      translateY: fadeAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.specializationButton}
                  onPress={() => navigateToTrainersList("military")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.specializationText}>مدربين فرع التدريب العسكري</Text>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <QatarFlag size={50} />
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
    marginBottom: 20,
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
    paddingVertical: 15,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 15,
  },
})

export default TrainerSpecializationScreen
