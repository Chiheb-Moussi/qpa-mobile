"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Image, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Header from "../components/Header"
import Card from "../components/Card"
import YearSelector from "../components/YearSelector"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import MenuButton from "../components/MenuButton"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedMenuButton, setSelectedMenuButton] = useState<string | null>(null)
  const scrollY = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current
type Props = {
  size?: number;
};

const QatarFlag = ({ size = 20 }: Props) => {
  return (
    <Image
      source={require("../assets/images/qatar-flag.png")}
      style={[
        styles.flag,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
};
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

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
        break
    }
  }

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  })

  const scale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.98],
    extrapolate: "clamp",
  })

  return (
    <SafeAreaView style={styles.container}>
      <Header title="الواجهة" />
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      >
           <View style={styles.menuContainer}>
        <MenuButton
            title="الدورات"
            icon={require("../assets/images/search.png")}
            onPress={() => handleMenuPress("courses")}
            isSelected={selectedMenuButton === "courses"}
          />
           <MenuButton
            title="ليرايا العروض العسكرية"
            icon={require("../assets/images/police.png")}
            onPress={() => handleMenuPress("military")}
            isSelected={selectedMenuButton === "military"}
          />
           <MenuButton
            title="طلبة الدبلوم"
            icon={require("../assets/images/students-icon.png")}
            onPress={() => handleMenuPress("students")}
            isSelected={selectedMenuButton === "students"}
          />
          
          <MenuButton
            title="المدربين"
            icon={require("../assets/images/trainers-icon.png")}
            onPress={() => handleMenuPress("trainers")}
            isSelected={selectedMenuButton === "trainers"}
          />
        </View>
        <Animated.View
          style={[
            styles.mainContent,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <Card style={styles.blueCard}>
            <YearSelector
              currentYear={selectedYear}
              onYearChange={setSelectedYear}
              years={["2023", "2024", "2025", "2026"]}
            />

            <Animated.View style={[styles.instituteImageContainer, { opacity: fadeAnim }]}>
              <Image
                source={require("../assets/images/ecole.png")}
                style={styles.instituteImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.instituteText}>معهد الشرطة - الدوحة</Text>
                <Text style={styles.instituteSubText}>POLICE TRAINING INSTITUTE</Text>
              </View>
            </Animated.View>
          </Card>

          <Card>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <Text style={styles.welcomeMessage}>مرحبا بكم في تطبيق أكاديمية الشرطة</Text>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="account-group" size={28} color={Colors.primary} />
                  <Text style={styles.statNumber}>145</Text>
                  <Text style={styles.statLabel}>المدربين</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="school" size={28} color={Colors.primary} />
                  <Text style={styles.statNumber}>328</Text>
                  <Text style={styles.statLabel}>الطلاب</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="book-open-variant" size={28} color={Colors.primary} />
                  <Text style={styles.statNumber}>42</Text>
                  <Text style={styles.statLabel}>الدورات</Text>
                </View>
              </View>
            </Animated.View>
          </Card>
        </Animated.View>
      </Animated.ScrollView>

      <QatarFlag size={30} />
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
  flag: {
    resizeMode: "cover", // "cover" est mieux que "contain" pour remplir un cercle
    backgroundColor: "transparent", // s'assure qu'il n'y a pas de fond
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
  mainContent: {
    padding: 10,
  },
  blueCard: {
    backgroundColor: Colors.primary,
    marginBottom: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  instituteImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 15,
  },
  instituteImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  instituteText: {
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    textAlign: "center",
  },
  instituteSubText: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  welcomeMessage: {
    fontSize: 18,
    fontFamily: "Cairo-SemiBold",
    textAlign: "center",
    color: Colors.text,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Cairo-Bold",
    fontSize: 20,
    color: Colors.text,
    marginTop: 5,
  },
  statLabel: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
})

export default HomeScreen
