import React from "react";
import styled from "styled-components";
import useExpandedRows from "../hooks/useExpandedRows"; // Importing the custom hook

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 350px;
  padding-top: 60px;
  overflow-x: auto;
  border-radius: 10px 10px;
`;

const CenteredTable = styled.table`
  width: 80%;
  height: auto;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.2),
    /* Top shadow with increased y-offset */ 0 -4px 8px rgba(0, 0, 0, 0.2),
    /* Bottom shadow */ 4px 0 8px rgba(0, 0, 0, 0.2),
    /* Left shadow */ -4px 0 8px rgba(0, 0, 0, 0.2); /* Right shadow */
  padding: 20px 20px 50px;
  td {
    padding: 10px;
    white-space: pre-wrap;
  }
`;

const StyledTable = styled.table`
  width: 75%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  color: white;
  text-align: center;
  padding: 8px;
  text-transform: uppercase;
  font-size: 23px;
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  color: white;
  padding: 15px;
`;

const EditButton = styled.button`
  background-color: #189898;
  font-size: 12px;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const EditCell = styled.td`
  padding: 8px;
`;

const DeleteButton = styled.button`
  font-size: 12px;
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

const PostTable = ({ data, tableType, onEditPost, onDelete }) => {
  const { expandedRows, toggleRow } = useExpandedRows();

  console.log("Table Data:", data);
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <Container>
      <CenteredTable>
        <thead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header}>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                {headers.map((header) => (
                  <TableData key={header}>
                    {typeof row[header] === "object"
                      ? JSON.stringify(row[header])
                      : row[header]}
                  </TableData>
                ))}
                <EditCell>
                  <EditButton onClick={() => onEditPost(row)}>Edit</EditButton>
                  <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
                </EditCell>
              </TableRow>
            </React.Fragment>
          ))}
        </tbody>
      </CenteredTable>
    </Container>
  );
};

export default PostTable;
