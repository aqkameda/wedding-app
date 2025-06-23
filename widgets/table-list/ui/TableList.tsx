import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Table,
  Guest,
  TableState,
  toggleCollapse,
  MAX_GUESTS_PER_TABLE,
} from "../../../entities/table";
import { AddGuestForm } from "../../../features/add-guest";
import { Button } from "../../../shared/ui";

interface TableListProps {
  state: TableState;
  onToggleCollapse: (tableId: string) => void;
  onAddGuest: (tableId: string, guest: Guest) => void;
  onRemoveTable: (tableId: string) => void;
  onRemoveGuest: (tableId: string, guestId: string) => void;
}

export const TableList: React.FC<TableListProps> = ({
  state,
  onToggleCollapse,
  onAddGuest,
  onRemoveTable,
  onRemoveGuest,
}) => (
  <FlatList
    data={state.tables}
    keyExtractor={(table) => table.id}
    renderItem={({ item: table }) => (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeaderRow}>
          <TouchableOpacity
            onPress={() => onToggleCollapse(table.id)}
            style={styles.tableHeader}
          >
            <Text style={styles.tableTitle}>{table.name}</Text>
            <Text style={styles.arrow}>
              {state.collapsed[table.id] ? "▼" : "▲"}
            </Text>
          </TouchableOpacity>
          <Button
            title="Удалить стол"
            onPress={() => onRemoveTable(table.id)}
            style={styles.deleteTableBtn}
          />
        </View>
        {!state.collapsed[table.id] && (
          <View style={styles.guestsContainer}>
            {table.guests.length === 0 && (
              <Text style={styles.empty}>Нет гостей</Text>
            )}
            {table.guests.map((guest) => (
              <View
                key={guest.id}
                style={[
                  styles.guest,
                  guest.side === "groom" ? styles.groom : styles.bride,
                  styles.guestRow,
                ]}
              >
                <Text style={styles.guestText}>
                  {guest.name}, {guest.age} —{" "}
                  {guest.gender === "male" ? "М" : "Ж"} (
                  {guest.side === "groom" ? "Жених" : "Невеста"})
                </Text>
                <Button
                  title="Удалить"
                  onPress={() => onRemoveGuest(table.id, guest.id)}
                  style={styles.deleteGuestBtn}
                />
              </View>
            ))}
            <AddGuestForm
              onAdd={(guest) => onAddGuest(table.id, guest)}
              disabled={table.guests.length >= MAX_GUESTS_PER_TABLE}
            />
          </View>
        )}
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 8,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
    color: "#888",
    marginLeft: 8,
  },
  deleteTableBtn: {
    backgroundColor: "#cc3e3e",
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  guestsContainer: {
    padding: 12,
    backgroundColor: "#fafafa",
  },
  guest: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteGuestBtn: {
    backgroundColor: "#cc3e3e",
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  groom: {
    backgroundColor: "#e6f7e6",
  },
  bride: {
    backgroundColor: "#ffe6f0",
  },
  guestText: {
    fontSize: 16,
    flex: 1,
  },
  empty: {
    color: "#aaa",
    fontStyle: "italic",
  },
});
