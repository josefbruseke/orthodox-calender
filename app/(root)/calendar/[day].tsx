import CalendarView from "@/components/CalendarView";
import { useLocalSearchParams, router } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CalendarDay() {
  const selected_date = useLocalSearchParams().date as string;

  return (
    <View style={{ flex: 1, backgroundColor: "#FBF8F6" }}>
      {/* Custom back button */}
    <TouchableOpacity
      onPress={() => router.back()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#D9534F",
        borderRadius: 8,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      <Text style={{ marginLeft: 8, fontSize: 16, color: "#FFFFFF", fontWeight: "bold" }}>Back</Text>
    </TouchableOpacity>

      {/* Calendar content */}
      <CalendarView date={selected_date} />
    </View>
  );
}
