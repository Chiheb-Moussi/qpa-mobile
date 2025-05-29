"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"
import MenuButton from "../components/MenuButton"

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, "Courses">

interface Course {
  id: string
  name: string
  date: string
  status: string
  duration: string
  program: string
  startDate?: string
  endDate?: string
}

const CoursesScreen = () => {
  const navigation = useNavigation<CoursesScreenNavigationProp>()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  // Mock data for courses
  const courses: Course[] = [
    {
      id: "1",
      name: "دوريات أمنية",
      date: "02-01-2025",
      status: "منجزة",
      duration: "4 أسابيع",
      program: "مرفق",
      startDate: "2025/01/02",
      endDate: "2025/01/30",
    },
    {
      id: "2",
      name: "فض شغب",
      date: "10-03-2025",
      status: "منجزة",
      duration: "6 أسابيع",
      program: "مرفق",
      startDate: "2025/03/10",
      endDate: "2025/04/21",
    },
    {
      id: "3",
      name: 'شرطة مستجدين "الدفعة 20"',
      date: "15-04-2025",
      status: "مؤجلة",
      duration: "16 أسبوع",
      program: "مرفق",
      startDate: "2025/04/25",
      endDate: "2025/08/25",
    },
    {
      id: "4",
      name: 'طلبة الدبلوم "الدفعة الثانية"',
      date: "04-06-2025",
      status: "ملغاة",
      duration: "16 أسبوع",
      program: "مرفق",
      startDate: "2025/06/04",
      endDate: "2025/09/24",
    },
    {
      id: "5",
      name: 'طلبة الدبلوم "الدفعة الثالثة"',
      date: "18-07-2025",
      status: "في الإنتظار",
      duration: "16 أسبوع",
      program: "مرفق",
      startDate: "2025/07/18",
      endDate: "2025/11/07",
    },
  ]

  const handleCoursePress = (course: Course) => {
    navigation.navigate("CourseDetail", { course })
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
        navigation.navigate("MilitaryTrainersList")
        break
      case "courses":
        // Already on courses screen
        break
      default:
        break
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="الواجهة" showBackButton />

      <View style={styles.menuContainer}>
        <MenuButton
          title="الدورات"
          icon={require("../assets/images/search.png")}
          onPress={() => handleMenuPress("courses")}
          isSelected={true}
        />
        <MenuButton
          title="سرايا العروض العسكرية"
          icon={require("../assets/images/police.png")}
          onPress={() => handleMenuPress("military")}
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

      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.blueCard}>
            <Text style={styles.title}>رزنامة الدورات</Text>

            <View style={styles.tableContainer}>
            

              {/* Colonnes scrollables */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>برنامج الدورة</Text>
                    <Text style={styles.headerCell}>مدة الدورة</Text>
                    <Text style={styles.headerCell}>حالة الدورة</Text>
                    <Text style={styles.headerCell}>تاريخ الدورة</Text>
                  </View>

                  {courses.map((course, index) => (
                    <TouchableOpacity
                      key={course.id}
                      style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}
                      onPress={() => handleCoursePress(course)}
                    >
                      <Text style={styles.cell}>{course.program}</Text>
                      <Text style={styles.cell}>{course.duration}</Text>
                      <Text style={[styles.cell, styles.statusCell]}>{course.status}</Text>
                      <Text style={styles.cell}>{course.date}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
                {/* Colonne fixe */}
                <View style={styles.fixedColumn}>
                <Text style={[styles.headerCell, styles.fixedHeaderCell]}>اسم الدورة</Text>
                {courses.map((course, index) => (
                  <TouchableOpacity
                    key={course.id}
                    style={[styles.fixedCell, index % 2 === 0 ? styles.evenRow : {}]}
                    onPress={() => handleCoursePress(course)}
                  >
                    <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                      {course.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
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
    padding: 15,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontFamily: "Cairo-Bold",
    color: "white",
    textAlign: "right",
    marginBottom: 15,
  },
  tableContainer: {
    flexDirection: "row",
  },
  fixedColumn: {
    width: 150,
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.3)",
  },
  fixedHeaderCell: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 10,
    textAlign: 'right', 
    writingDirection: 'rtl' 
  },
  fixedCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 10,
  },
  headerCell: {
    width: 120,
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  evenRow: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  cell: {
    width: 120,
    color: "white",
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  statusCell: {
    fontFamily: "Cairo-Bold",
  },
})

export default CoursesScreen
