import {
  TextField,
  Checkbox,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const onAddTodo = (event) => {
    if (event.key === "Enter") {
      const newTodoText = event.target.value;
      if (newTodoText === "") {
        alert("Todo cannot be blank !");
      } else {
        const id = uuid();
        const todo = { id: id, text: newTodoText, checked: false };
        setTodos([...todos, todo]);
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
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 800,
          minWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {todos.length === 0 ? (
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
