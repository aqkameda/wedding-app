import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "../../../shared/ui";
import { Guest } from "../../../entities/guest";

interface AddGuestFormProps {
  onAdd: (guest: Guest) => void;
  disabled?: boolean;
}

export const AddGuestForm: React.FC<AddGuestFormProps> = ({
  onAdd,
  disabled,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [side, setSide] = useState<"groom" | "bride">("groom");

  const handleAdd = () => {
    if (!name || !age) return;
    onAdd({
      id: Date.now().toString(),
      name,
      age: Number(age),
      gender,
      side,
    });
  };

  return (
    <View style={styles.form}>
      <Input value={name} onChangeText={setName} placeholder="Имя" />
      <Input
        value={age}
        onChangeText={setAge}
        placeholder="Возраст"
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <Button
          title="Мужчина"
          onPress={() => setGender("male")}
          style={gender === "male" ? styles.selected : styles.unselected}
        />
        <Button
          title="Женщина"
          onPress={() => setGender("female")}
          style={gender === "female" ? styles.selected : styles.unselected}
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Жених"
          onPress={() => setSide("groom")}
          style={side === "groom" ? styles.selected : styles.unselected}
        />
        <Button
          title="Невеста"
          onPress={() => setSide("bride")}
          style={side === "bride" ? styles.selected : styles.unselected}
        />
      </View>
      <Button title="Добавить гостя" onPress={handleAdd} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  selected: {
    backgroundColor: "#4F8EF7",
  },
  unselected: {
    backgroundColor: "#e0e0e0",
  },
});
