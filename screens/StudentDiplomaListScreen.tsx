"use client"

import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Dimensions, Platform, ActivityIndicator } from "react-native"
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
  full_name: string
  promotion_id: string
  faction: string
  birth_date: string
  age: number
  height: number
  ideal_weight: number
  nationality: string
  session:string
  photo: string | null
}

const renderStudentItem = ({ item, navigation }: { item: Student, navigation: any }) => 
  {
    const url = "https://qatar-police-academy.starlightwebsolutions.com"
    console.log(item)
    return (

  <TouchableOpacity 
    style={styles.studentCard}
    onPress={() => navigation.navigate("StudentDetail", { student: item })}
    activeOpacity={0.7}
  >
    <View style={styles.imageContainer}>
      <Image 
        source={item.photo ? { uri: `${url}${item.photo}` } : require("../assets/images/default-user.png")} 
        style={styles.studentImage}
        resizeMode="cover"
      />
    </View>
    <Text style={styles.studentName} numberOfLines={2}>{item.full_name}</Text>
  </TouchableOpacity>
)}

// Mock data based on the provided table


const StudentDiplomaListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { promotionName, promotionId } = route.params  
  const [searchText, setSearchText] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    fetchStudents()
  }, [promotionId])

  

  const fetchStudents = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('https://qatar-police-academy.starlightwebsolutions.com/api/students')
      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }
      const data = await response.json()
      const filteredStudents = data.filter((student: any) => student.promotion_academic_year_id === promotionId)
      setStudents(filteredStudents)
    } catch (error) {
      setError('Failed to load students')
      console.error('Error fetching students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStudents = students.filter(student => 
    student.full_name.includes(searchText) || student.military_number.includes(searchText)
  )

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={promotionName} showBackButton />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={promotionName} showBackButton />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    )
  }

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
        renderItem={({item}) => renderStudentItem({item, navigation})}
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

export default StudentDiplomaListScreen 