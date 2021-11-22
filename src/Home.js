import {
  TextField,
  Checkbox,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const addTodoEndpoint =
  "https://todo-project-backend.herokuapp.com/api/protected/todo/add";
const deleteTodoEndpoint =
  "https://todo-project-backend.herokuapp.com/api/protected/todo/delete";
const fetchAllTodosEndpoint =
  "https://todo-project-backend.herokuapp.com/api/protected/todos";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [addTodoLoading, setAddTodoLoading] = useState(false);
  const [fetchTodosLoading, setFetchTodosLoading] = useState(false);
  useEffect(() => {
    fetchTodoSync();
  }, []);
  const localStorageToken = localStorage.getItem("token");
  const headerConfig = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorageToken,
  };

  //TODO StatusTodoSync

  //TODO EditTodoSync

  const deleteTodoSync = (id) => {
    const deleteTodo = { id: id };
    console.log(deleteTodo);
    setAddTodoLoading(true);
    axios
      .delete(deleteTodoEndpoint, { headers: headerConfig, data: deleteTodo })
      .then(({ status }) => {
        setAddTodoLoading(false);
        if (status === 200) {
          console.log("Todo has been deleted and synced");
        } else {
          console.log("Todo couldn't be deleted. Something went wrong !");
        }
      })
      .catch((error) => {
        setAddTodoLoading(false);
        console.log(error);
      });
  };

  const fetchTodoSync = () => {
    setFetchTodosLoading(true);
    axios
      .get(fetchAllTodosEndpoint, {
        headers: headerConfig,
      })
      .then(({ status, data }) => {
        setFetchTodosLoading(false);
        if (status === 200) {
          const todos = data.todos;
          setTodos(todos);
          console.log(
            "Todos have been fetched and local state will be updated"
          );
        } else {
          console.log("Todos couldn't be fetched, something went wrong !");
        }
      })
      .catch((error) => {
        setFetchTodosLoading(false);
        console.log(error);
      });
  };

  const addTodoSync = (todo) => {
    setAddTodoLoading(true);
    axios
      .post(addTodoEndpoint, todo, {
        headers: headerConfig,
      })
      .then(({ status }) => {
        setAddTodoLoading(false);
        if (status === 201) {
          console.log("Added todo has been synced");
        } else {
          console.log("Added todo not synced, something went wrong !");
        }
      })
      .catch((error) => {
        setAddTodoLoading(false);
        console.log(error);
      });
  };

  const onAddTodo = (event) => {
    if (event.key === "Enter") {
      const newTodoText = event.target.value;
      if (newTodoText === "") {
        alert("Todo cannot be blank !");
      } else {
        const id = uuid();
        const todo = { id: id, text: newTodoText, checked: false };
        setTodos([...todos, todo]);
        addTodoSync(todo);
        event.target.blur();
        setNewTodo("");
      }
    }
  };

  const onEditTodo = (event) => {
    if (event.key === "Enter") {
      const newTodoText = event.target.value;
      const selectedTodoId = event.target.id;
      if (newTodoText === "") {
        alert("Todo cannot be blank !");
      } else {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === selectedTodoId) {
            todo.text = newTodoText;
            return todo;
          }
          return todo;
        });
        setTodos(updatedTodos);
        event.target.blur();
        event.target.value = "";
      }
    }
  };

  const updateTodoStatus = (event) => {
    const checkedValue = event.target.checked;
    const selectedTodoId = event.target.id;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodoId) {
        todo.checked = checkedValue;
        return todo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (event) => {
    const deleteTodoId = event.target.id;
    const filteredTodos = todos.filter((todo) => todo.id !== deleteTodoId);
    setTodos(filteredTodos);
    deleteTodoSync(deleteTodoId);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>Your Todos</p>
        <TextField
          margin="normal"
          label="Add Todo"
          value={newTodo}
          onChange={(event) => {
            const value = event.target.value;
            setNewTodo(value);
          }}
          onKeyPress={onAddTodo}
        />
        {addTodoLoading ? (
          <div style={{ padding: 10 }}>
            <div style={{ padding: 10 }}>Syncing in progress</div>
            <CircularProgress />
          </div>
        ) : null}
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 800,
          minWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {fetchTodosLoading ? (
          <div style={{ padding: 10, textAlign: "center" }}>
            <div style={{ padding: 10 }}>Fetching Todos from the cloud</div>
            <CircularProgress />
          </div>
        ) : todos.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <p>You have no todos ! Please add Todo</p>
          </div>
        ) : (
          todos.map((todo) => {
            const id = todo.id;
            const text = todo.text;
            const checked = todo.checked;

            return (
              <ListItem key={id}>
                <ListItemIcon>
                  <Checkbox
                    id={id}
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    onChange={updateTodoStatus}
                  />
                </ListItemIcon>
                <ListItemText id={id} primary={text} />
                <ListItemIcon>
                  <TextField
                    id={id}
                    onKeyPress={onEditTodo}
                    margin="normal"
                    label="Edit Todo"
                  />
                </ListItemIcon>
                <ListItemIcon style={{ padding: 20 }}>
                  <Button
                    id={id}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={deleteTodo}
                  >
                    Delete
                  </Button>
                </ListItemIcon>
              </ListItem>
            );
          })
        )}
      </List>
    </div>
  );
}

export default Home;
