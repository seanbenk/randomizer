import React, { useState, useEffect } from "react";
import Screen from "../../components/Screen";
import Card from "../../components/Admin_NameCard";

function AdminScreen({ socket }) {
  const [value, setValue] = useState("");
  const [names, setNames] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    socket.on("names", (names) => {
      setNames(names);
    });
    socket.emit("getNames");
  }, [socket]);

  useEffect(() => {
    socket.emit("getNames");
  }, []);

  const toggleShowForm = () => setShowForm((prev) => !prev);

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("newName", value);
    setValue("");
  };

  const selectRandom = () => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 5000);
    socket.emit("random");
  };

  const resetAnimations = () => {
    socket.emit("resetAnimations");
  };

  return (
    <Screen style={styles.container}>
      {showForm && (
        <form onSubmit={submitForm}>
          <input
            autoFocus
            value={value}
            placeholder="New Name"
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
          <input type="submit" />
        </form>
      )}
      <button onClick={toggleShowForm}>{showForm ? "Hide" : "Show"}</button>
      <button
        style={{
          ...styles.button,
          backgroundColor: buttonHover ? "red" : "green",
          cursor: "pointer",
          opacity: buttonDisabled ? 0.2 : 1,
        }}
        disabled={buttonDisabled}
        onClick={selectRandom}
        onPointerOver={() => setButtonHover(true)}
        onPointerOut={() => setButtonHover(false)}
      >
        GO
      </button>
      <button onClick={resetAnimations}>Reset Animations</button>
      <h2>Names:</h2>
      {names.map((name, idx) => (
        <Card key={idx} name={name} socket={socket} />
      ))}
    </Screen>
  );
}

export default AdminScreen;

const styles = {
  container: {
    paddingTop: 50,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    margin: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "green",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    border: "none",
    "&hover": {
      color: "red",
    },
  },
};
