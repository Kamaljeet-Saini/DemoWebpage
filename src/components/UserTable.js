import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 350px;
  padding-top: 60px;
  overflow-x: auto;
  border-radius: 20px;
`;

const CenteredTable = styled.table`
  width: 50%;
  height: auto;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.2), 0 -4px 8px rgba(0, 0, 0, 0.2),
    4px 0 8px rgba(0, 0, 0, 0.2), -4px 0 8px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 50px;
  td {
    padding: 20px;
    white-space: pre-wrap;
  }
`;

const Th = styled.th`
  padding: 15px 20px;
`;

const StyledTable = styled.table`
  width: 75%;
  border-collapse: collapse;
  padding: 20px;
`;

const TableHeader = styled.th`
  color: white;
  text-align: center;
  padding: 8px;
  font-size: 20px;
  text-transform: uppercase;
`;

const TableRow = styled.tr``;

const TableData = styled.td`
  color: white;
  padding: 8px;
`;

const ArrowCell = styled.td`
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  margin-left: 4px;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease-in-out;
`;

const AddressCell = styled.td`
  color: white;
  padding: 20px;
  white-space: nowrap;
`;

const EditButton = styled.button`
  background-color: #189898;
  font-size: 12px;
  margin-bottom: 10px;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
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

const parseAddressField = (addressField) => {
  if (typeof addressField === "object") {
    const { street, suite, city, zipcode, geo } = addressField;
    const geoString = geo ? ` Geo: Lat: ${geo.lat}, Lng: ${geo.lng}` : "";
    return (
      <>
        {`Street: ${street}, Suite: ${suite}, City: ${city}, Zipcode: ${zipcode}${geoString}`}
      </>
    );
  } else {
    console.error("Invalid address field format:", addressField);
    return addressField;
  }
};

const parseCompanyField = (companyField) => {
  if (typeof companyField === "object") {
    return Object.keys(companyField).map((key) => (
      <div key={key}>
        <strong>{key}:</strong> {companyField[key]}
      </div>
    ));
  } else {
    console.error("Invalid company field format:", companyField);
    return companyField;
  }
};

const UserTable = ({ data, onEditUser, onDelete }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows((prev) => prev.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows((prev) => [...prev, id]);
    }
  };

  const headers = Object.keys(data[0]);

  return (
    <Container>
      <CenteredTable>
        <thead>
          <TableRow>
            {headers.map(
              (header) =>
                header !== "address" && (
                  <TableHeader key={header}>{header}</TableHeader>
                )
            )}
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                {Object.entries(row).map(
                  ([key, value]) =>
                    key !== "address" && (
                      <TableData key={key}>
                        {key === "company" ? (
                          parseCompanyField(value)
                        ) : (
                          <>
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </>
                        )}
                      </TableData>
                    )
                )}
                <ArrowCell onClick={() => toggleRow(row.id)}>
                  <ArrowIcon isOpen={expandedRows.includes(row.id)}>
                    ▼
                  </ArrowIcon>
                </ArrowCell>
                <EditCell>
                  <EditButton onClick={() => onEditUser(row)}>Edit</EditButton>
                  <DeleteButton onClick={() => onDelete()}>Delete</DeleteButton>
                </EditCell>
              </TableRow>
              {expandedRows.includes(row.id) && (
                <TableRow>
                  <AddressCell colSpan={headers.length}>
                    {parseAddressField(row.address)}
                  </AddressCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </CenteredTable>
    </Container>
  );
};

export default UserTable;
