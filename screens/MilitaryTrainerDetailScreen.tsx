"use client"

import type React from "react"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation, type RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import QatarFlag from "../components/QatarFlag"
import type { RootStackParamList } from "../navigation/AppNavigator"
import Colors from "../constants/Colors"

type MilitaryTrainerDetailScreenRouteProp = RouteProp<RootStackParamList, "MilitaryTrainerDetail">

interface SectionProps {
  title: string
  children: React.ReactNode
  initiallyExpanded?: boolean
}

const Section: React.FC<SectionProps> = ({ title, children, initiallyExpanded = false }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded)
  const animationHeight = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current

  const toggleExpanded = () => {
    setExpanded(!expanded)
    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const bodyHeight = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  })

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggleExpanded} activeOpacity={0.7}>
        <Ionicons name={expanded ? "chevron-down" : "chevron-forward"} size={20} color="white" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.sectionContent, { height: bodyHeight }]}>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 10 }}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  )
}

const MilitaryTrainerDetailScreen = () => {
  const route = useRoute<MilitaryTrainerDetailScreenRouteProp>()
  const navigation = useNavigation()
  const { trainerId } = route.params

  // Mock data for the military trainer
  const trainerData = {
    id: "1",
    name: "محمد وائل",
    nationality: "جزائري",
    militaryId: "175863",
    birthDate: "17/08/2002",
    height: "177 صم",
    weight: "77 كغ",
    specialization: "سرايا العروض العسكرية",
    image: require("../assets/images/trainer.png"),
    courses: [
      {
        name: "دفاع عن النفس",
        date: "2025_4_12",
        cases: "1",
        result: "80.7",
        rating: "5",
      },
      {
        name: "دوريات أمنية",
        date: "2025_6_07",
        cases: "5",
        result: "98.3",
        rating: "10",
      },
      {
        name: "دورة مشاة",
        date: "2025_08_17",
        cases: "--",
        result: "--",
        rating: "--",
      },
      {
        name: "أمن المنشأة",
        date: "2025_9_10",
        cases: "--",
        result: "--",
        rating: "--",
      },
    ],
    tests: [
      {
        name: "1-تحديد مستوى اشتباك والدفاع عن النفس",
        running: "13.22",
        pressure: "50",
        stomach: "48",
        result: "88.4",
        rating: "جيد جدا",
      },
      {
        name: "2-اختبار نهائي لدورة الاشتباك والدفاع عن النفس",
        running: "13.22",
        pressure: "57",
        stomach: "52",
        result: "90.4",
        rating: "ممتاز",
      },
      {
        name: "3-تحديد مستوى دورة إعداد عارضين",
        running: "17.22",
        pressure: "33",
        stomach: "44",
        result: "88.4",
        rating: "راسب",
      },
      {
        name: "4-نهاية دورة إعداد عارضين",
        running: "15.52",
        pressure: "38",
        stomach: "48",
        result: "76.8",
        rating: "جيد",
      },
      {
        name: "5-تحديد مستوى دورة فض الشغب",
        running: "13.22",
        pressure: "50",
        stomach: "48",
        result: "88.4",
        rating: "جيد جدا",
      },
      {
        name: "6-اختبار نهائي دورة فض الشغب",
        running: "12.02",
        pressure: "59",
        stomach: "66",
        result: "100",
        rating: "ممتاز",
      },
    ],
    weights: [
      {
        month: "1-شهر يناير",
        weight: "80.5",
        excess: "+(10)",
        bmi: "26.7",
        note: "سمنة",
      },
      {
        month: "2-شهر فبراير",
        weight: "75.8",
        excess: "+(5)",
        bmi: "25.7",
        note: "وزن زائد",
      },
      {
        month: "3-شهر مارس",
        weight: "73.5",
        excess: "+(2)",
        bmi: "25.2",
        note: "وزن زائد",
      },
      {
        month: "4-شهر ابريل",
        weight: "70.5",
        excess: "+(0)",
        bmi: "24.7",
        note: "عضلي",
      },
      {
        month: "5-شهر مايو",
        weight: "68.3",
        excess: "-(3)",
        bmi: "22.1",
        note: "عادي",
      },
      {
        month: "6-شهر يونيو",
        weight: "60.8",
        excess: "-(10)",
        bmi: "17.7",
        note: "نحيف",
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="بطاقة تعريف الشرطي" showBackButton />

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.name}</Text>
              <Text style={styles.infoLabel}>:الإسم</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.nationality}</Text>
              <Text style={styles.infoLabel}>:الجنسية</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.militaryId}</Text>
              <Text style={styles.infoLabel}>:الرقم العسكري</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{trainerData.birthDate}</Text>
              <Text style={styles.infoLabel}>:تاريخ الميلاد</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image source={trainerData.image} style={styles.trainerImage} />
            <View style={styles.measurementsContainer}>
              <Text style={styles.measurementText}>{trainerData.weight}</Text>
              <Text style={styles.measurementText}>{trainerData.height}</Text>
            </View>
            <Text style={styles.specialization}>{trainerData.specialization}</Text>
          </View>
        </View>

        <Section title="الدورات" initiallyExpanded={true}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>الرتبة</Text>
              <Text style={styles.tableHeaderCell}>النتيجة</Text>
              <Text style={styles.tableHeaderCell}>الحالات</Text>
              <Text style={styles.tableHeaderCell}>تاريخ الدورة</Text>
              <Text style={styles.tableHeaderCell}>اسم الدورة</Text>
            </View>

            {trainerData.courses.map((course, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}>
                <Text style={styles.tableCell}>{course.rating}</Text>
                <Text style={styles.tableCell}>{course.result}</Text>
                <Text style={styles.tableCell}>{course.cases}</Text>
                <Text style={styles.tableCell}>{course.date}</Text>
                <Text style={styles.tableCell}>{course.name}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="الإختبارات">
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>التقدير</Text>
              <Text style={styles.tableHeaderCell}>النتيجة</Text>
              <Text style={styles.tableHeaderCell}>البطن</Text>
              <Text style={styles.tableHeaderCell}>الضغط</Text>
              <Text style={styles.tableHeaderCell}>الجري</Text>
              <Text style={styles.tableHeaderCell}>الإختبارات</Text>
            </View>

            {trainerData.tests.map((test, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}>
                <Text style={styles.tableCell}>{test.rating}</Text>
                <Text style={styles.tableCell}>{test.result}</Text>
                <Text style={styles.tableCell}>{test.stomach}</Text>
                <Text style={styles.tableCell}>{test.pressure}</Text>
                <Text style={styles.tableCell}>{test.running}</Text>
                <Text style={styles.tableCell}>{test.name}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="الوزن">
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>الملاحظة</Text>
              <Text style={styles.tableHeaderCell}>مأشر الكتلة</Text>
              <Text style={styles.tableHeaderCell}>الوزن الزائد</Text>
              <Text style={styles.tableHeaderCell}>الوزن</Text>
              <Text style={styles.tableHeaderCell}>الشهر</Text>
            </View>

            {trainerData.weights.map((weight, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : {}]}>
                <Text style={styles.tableCell}>{weight.note}</Text>
                <Text style={styles.tableCell}>{weight.bmi}</Text>
                <Text style={styles.tableCell}>{weight.excess}</Text>
                <Text style={styles.tableCell}>{weight.weight}</Text>
                <Text style={styles.tableCell}>{weight.month}</Text>
              </View>
            ))}
          </View>
        </Section>
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileInfo: {
    flex: 2,
    paddingRight: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "Cairo-Bold",
    fontSize: 14,
    color: Colors.text,
    marginLeft: 5,
  },
  infoValue: {
    fontFamily: "Cairo-Regular",
    fontSize: 14,
    color: Colors.textSecondary,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  trainerImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#eee",
  },
  measurementsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  measurementText: {
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    color: Colors.text,
  },
  specialization: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    marginTop: 5,
    color: Colors.text,
    textAlign: "center",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "Cairo-Bold",
    fontSize: 16,
    color: "white",
    marginRight: 8,
  },
  sectionContent: {
    overflow: "hidden",
  },
  tableContainer: {
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: "white",
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: Colors.text,
    fontFamily: "Cairo-Regular",
    fontSize: 12,
    textAlign: "center",
  },
})

export default MilitaryTrainerDetailScreen
