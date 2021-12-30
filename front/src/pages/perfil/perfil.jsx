import "./perfil.css";
import {
  IconButton,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { deleteUser, updateUser } from "../../services/UserService";
import { currentUser, logout } from "../../services/AuthService";
import { Close, DeleteOutline, Edit as EditIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PerfilPage = () => {
  const [user, setUser] = useState({ ...currentUser.user });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = () => {
    if (window.confirm("Deseja mesmo excluir seu usuário?")) {
      deleteUser(user.id).then(() => {
        logout();
        navigate("/login");
      });
    }
  };

  const handleSalvar = (newUser) => {
    setIsLoading(true);
    updateUser(user.id, newUser).then(() => {
      setIsLoading(false);
      setIsEdit(false);
      setUser(newUser);
    });
  };

  return (
    <main>
      <Card sx={{ width: "max(30%, 200px)" }}>
        <CardHeader
          title="Meu Perfil"
          action={
            !isEdit ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton color="success" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteOutline />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setIsEdit(false)}>
                <Close />
              </IconButton>
            )
          }
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {isEdit ? (
            <Editar onSalvar={handleSalvar} user={user} isLoading={isLoading} />
          ) : (
            <Show user={user} />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

const Show = ({ user }) => {
  return (
    <>
      <Box>
        <b>Nome</b>
        <Typography variant="h6">{user.name}</Typography>
      </Box>
      <Box>
        <b>Email</b>
        <Typography variant="h6">{user.email}</Typography>
      </Box>
    </>
  );
};

const Editar = ({ user, onSalvar, isLoading }) => {
  const [editUser, setEditUser] = useState({ ...user });

  const handleSalvar = () => {
    onSalvar(editUser);
  };

  return (
    <>
      <TextField
        variant="outlined"
        value={editUser.name}
        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
        label="Nome"
      />
      <TextField
        variant="outlined"
        value={editUser.email}
        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
        label="Email"
      />
      <Button disabled={isLoading} onClick={handleSalvar} variant="contained">
        {isLoading ? <CircularProgress size={24} /> : "salvar"}
      </Button>
    </>
  );
};

export default PerfilPage;
