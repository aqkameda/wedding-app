import React from "react";
import { Button } from "../../../shared/ui";

interface AddTableButtonProps {
  onAdd: () => void;
}

export const AddTableButton: React.FC<AddTableButtonProps> = ({ onAdd }) => (
  <Button title="Добавить стол" onPress={onAdd} />
);
