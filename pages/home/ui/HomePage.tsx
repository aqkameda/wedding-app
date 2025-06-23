import React, { useReducer } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  TableState,
  initialState,
  addTable,
  addGuest,
  toggleCollapse,
  removeTable,
  removeGuest,
} from "../../../entities/table";
import { AddTableButton } from "../../../features/add-table";
import { TableList } from "../../../widgets/table-list";

export const HomePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [state, dispatch] = useReducer((state: TableState, action: any) => {
    switch (action.type) {
      case "addTable":
        return addTable(state);
      case "addGuest":
        return addGuest(state, action.tableId, action.guest);
      case "toggleCollapse":
        return toggleCollapse(state, action.tableId);
      case "removeTable":
        return removeTable(state, action.tableId);
      case "removeGuest":
        return removeGuest(state, action.tableId, action.guestId);
      default:
        return state;
    }
  }, initialState);

  const handleAddGuest = (tableId: string, guest: any) => {
    dispatch({ type: "addGuest", tableId, guest });
  };
  const handleRemoveTable = (tableId: string) => {
    dispatch({ type: "removeTable", tableId });
  };
  const handleRemoveGuest = (tableId: string, guestId: string) => {
    dispatch({ type: "removeGuest", tableId, guestId });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f4f8" }}>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={[
            styles.container,
            { paddingBottom: 80 + insets.bottom },
          ]}
          data={[]}
          keyExtractor={() => ""}
          renderItem={() => null}
          ListFooterComponent={
            <TableList
              state={state}
              onToggleCollapse={(tableId) =>
                dispatch({ type: "toggleCollapse", tableId })
              }
              onAddGuest={handleAddGuest}
              onRemoveTable={handleRemoveTable}
              onRemoveGuest={handleRemoveGuest}
            />
          }
        />
        <View
          style={[styles.addButtonContainer, { bottom: 24 + insets.bottom }]}
        >
          <AddTableButton onAdd={() => dispatch({ type: "addTable" })} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
    flexGrow: 1,
  },
  addButtonContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 10,
  },
});
