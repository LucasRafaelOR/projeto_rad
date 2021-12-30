import "./listagem_users.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { findAllUsers } from "../../services/UserService";
import { CardContent, CardHeader, Card } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--primary-dark)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, email) {
  return { name, email };
}

const ListUsersPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let currRows = [];
    findAllUsers().then((data) => {
      for (var i = 0; i < data.length; i++) {
        var user = data[i];
        currRows.push(createData(user.name, user.email));
      }
      setRows(currRows);
    });
  }, []);

  return (
    <main>
      <Card>
        <CardHeader title="Lista de Funcionários" sx={{ paddingBottom: 1 }} />
        <CardContent className="list_users_container">
          <TableContainer component={Paper} sx={{ width: 700 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow sx={{ width: 700 }}>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.email}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </main>
  );
};

export default ListUsersPage;
