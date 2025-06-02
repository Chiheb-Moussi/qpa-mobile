"use client"

import Header from "@/components/Header"
import Menu from "@/components/Menu"
import TrainersList from "@/components/TrainersList"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const MilitaryTrainersListScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Header title="سرايا العروض العسكرية" showBackButton />

      <Menu />
    <TrainersList trainerTypeCode="military_shows" trainerTypeName="سرايا العروض العسكرية" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  }
})


export default MilitaryTrainersListScreen
