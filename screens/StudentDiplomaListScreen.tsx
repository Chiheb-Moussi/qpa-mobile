"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Dimensions, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, type RouteProp } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import Header from "@/components/Header"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList } from "../navigation/AppNavigator"

type Props = NativeStackScreenProps<RootStackParamList, "StudentDiplomaList">

interface Student {
  id: string
  military_number: string
  name: string
  promotion: string
  fraction: string
  birth_date: string
  age: number
  height: number
  ideal_weight: number
  nationality: string
  session:string
 
}

// Mock data based on the provided table
const mockStudents: Student[] = [
  {
    id: "105776",
    military_number: "105776",
    name: "مشعل عبدالله علي البلوي",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1998-01-01",
    age: 27,
    height: 170,
    ideal_weight: 80,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية",
   
  },
  {
    id: "105786",
    military_number: "105786",
    name: "جمعه خميس الشهواني",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1993-01-01",
    age: 32,
    height: 172,
    ideal_weight: 82,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105772",
    military_number: "105772",
    name: "نايف عبدالله حسين حيدر البلوشي",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1996-01-01",
    age: 29,
    height: 187,
    ideal_weight: 97,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105859",
    military_number: "105859",
    name: "محمد عبدالله الغريب الكواري",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "2003-01-01",
    age: 22,
    height: 169,
    ideal_weight: 79,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105800",
    military_number: "105800",
    name: "ناصر حسين صالح حسين احمد",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1999-01-01",
    age: 26,
    height: 185,
    ideal_weight: 95,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105861",
    military_number: "105861",
    name: "سالمين جمعه سالمين المنصوري",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1996-01-01",
    age: 29,
    height: 162,
    ideal_weight: 72,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105746",
    military_number: "105746",
    name: "سالم سالم فرج سالم العنسي",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1998-01-01",
    age: 27,
    height: 177,
    ideal_weight: 87,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105840",
    military_number: "105840",
    name: "راشد صالح محمد الشمس الكبيسي",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "2003-01-01",
    age: 22,
    height: 175,
    ideal_weight: 85,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"

  },
  {
    id: "105837",
    military_number: "105837",
    name: "عبدالرحمن عبدالله مهنا السبيعي",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "2003-01-01",
    age: 22,
    height: 169,
    ideal_weight: 79,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  },
  {
    id: "105760",
    military_number: "105760",
    name: "فيصل عبدالله حسين سالم منصور",
    promotion: "الدفعة الأولى",
    fraction: "الفصيل الأول",
    birth_date: "1997-01-01",
    age: 28,
    height: 173,
    ideal_weight: 83,
    nationality: "قطري",
    session:"طلبة دبلوم العلوم الشرطية"
  }
]

const StudentDiplomaListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { promotionName } = route.params
  const [searchText, setSearchText] = useState("")

  const filteredStudents = mockStudents.filter(student => 
    (student.promotion === promotionName) &&
    (student.name.includes(searchText) || student.military_number.includes(searchText))
  )

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity 
      style={styles.studentCard}
      onPress={() => navigation.navigate("StudentDetail", { student: item })}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={require("@/assets/images/trainer.png")} 
          style={styles.studentImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.studentName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header title={promotionName} showBackButton />
      
      <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="البحث"
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                  textAlign="right"
                />
                <Ionicons name="search" size={15} color="#999" />
              </View>
              </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 6,
    alignItems: "center",
    
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
    paddingVertical: 6,
  },

  searchInput: {
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Cairo-Regular',
    textAlign: "right",
   
  },
  listContent: {
    padding: 8,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  studentCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
    width: "31%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 8,
  },
  studentImage: {
    width: "100%",
    height: "100%",
  },
  studentName: {
    fontFamily: "Cairo-Bold",
    fontSize: 12,
    color: Colors.text,
    textAlign: "center",
  },
})

export default StudentDiplomaListScreen 