import { useState } from "react";

const useExpandedRows = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowId) => {
    const currentExpandedRows = expandedRows.includes(rowId)
      ? expandedRows.filter((id) => id !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(currentExpandedRows);
  };

  return { expandedRows, toggleRow };
};

export default useExpandedRows;
