import { Button, Pressable, Text, View } from "react-native";

export default function LoginForm() {
  return (
    <View style={{ gap: 16 }}>
      <Button title="Sign-in using Google" />
      <Pressable onPress={() => console.log("guest press")}>
        <Text style={{ color: "black", textAlign: "center" }}>Continue as Guest</Text>
      </Pressable>
    </View>
  );
}
