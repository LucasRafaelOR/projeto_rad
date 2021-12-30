import "./listagem_events.css";
import {
  Card,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  findAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/EventService";

const emptyEvent = {
  id: null,
  title: "",
  description: "",
  status: "",
  date: "",
  contratante: "",
};

const ListEventsPage = () => {
  const [open, setOpen] = useState(false);
  const [currData, setCurrData] = useState([]);
  const [editEvent, setEditEvent] = useState(emptyEvent);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    refreshEvents();
  }, []);

  const clickOpenNew = () => {
    setIsNew(true);
    setEditEvent(emptyEvent);
    setOpen(true);
  };

  const clickOpenEdit = (event) => {
    setIsNew(false);
    setEditEvent(event);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja mesmo excluir esse Evento?"))
      deleteEvent(id).then(() => {
        refreshEvents();
      });
  };

  const newEvent = () => {
    createEvent(editEvent).then((data) => {
      console.log(data);
      setOpen(false);
      refreshEvents();
    });
  };

  const saveEditEvent = () => {
    updateEvent(editEvent.id, editEvent).then(() => {
      setOpen(false);
      refreshEvents();
    });
  };

  const handleDialogSave = () => {
    if (isNew) newEvent();
    else saveEditEvent();
  };

  const refreshEvents = () => {
    findAllEvents().then((data) => {
      setCurrData(data);
    });
  };

  return (
    <main>
      {/* Card com o botão de adicionar novo evento */}
      <Card className="event-add" variant="outlined" sx={{ width: "50%" }}>
        <CardHeader
          title="Eventos"
          action={
            <Button
              variant="contained"
              sx={{ width: 50, height: 50, borderRadius: 100 }}
              onClick={clickOpenNew}
            >
              <Add sx={{ width: 50 }} />
            </Button>
          }
        />
      </Card>

      <div className="events">
        {/* Listagem de todos eventos no banco */}
        {currData.map((i) => (
          <div key={i.id} className="card-event">
            {/* Card i */}
            <CardHeader
              title={i.title}
              action={
                <>
                  {/* Botão de editar */}
                  <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => clickOpenEdit(i)}
                  >
                    <Edit />
                  </IconButton>

                  {/* Botão de deletar */}
                  <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(i.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            />

            {/* Descrição do card i */}
            <CardContent>
              <Typography>
                <b>Status:</b> {i.status}
              </Typography>
              <Typography>
                <b>Date:</b> {i.date}
              </Typography>
              <Typography>
                <b>Contratante:</b> {i.contratante}
              </Typography>
              <br />
              <Typography>
                <b>Descrição:</b> <br /> {i.description}
              </Typography>
            </CardContent>
          </div>
        ))}
      </div>

      {/* Dialogo  */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {/* Formulários-dialog para criar e editar eventos */}
        <DialogTitle>{isNew ? "Novo" : "Editar"} Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={editEvent.title}
            onChange={(event) => {
              const newEvent = { ...editEvent, title: event.target.value };
              setEditEvent(newEvent);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descrição"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={editEvent.description}
            onChange={(event) => {
              const newEvent = {
                ...editEvent,
                description: event.target.value,
              };
              setEditEvent(newEvent);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status"
            type="text"
            fullWidth
            variant="outlined"
            value={editEvent.status}
            onChange={(event) => {
              const newEvent = { ...editEvent, status: event.target.value };
              setEditEvent(newEvent);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Data"
            type="text"
            fullWidth
            variant="outlined"
            value={editEvent.date}
            onChange={(event) => {
              const newEvent = { ...editEvent, date: event.target.value };
              setEditEvent(newEvent);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Contratante"
            type="text"
            fullWidth
            variant="outlined"
            value={editEvent.contratante}
            onChange={(event) => {
              const newEvent = {
                ...editEvent,
                contratante: event.target.value,
              };
              setEditEvent(newEvent);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDialogSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ListEventsPage;
