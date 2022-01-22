import React from "react";

function Admin_NameCard({ name, socket }) {
  const deleteName = () => socket.emit("deleteName", name);
  return (
    <div style={styles.container}>
      <span>{name}</span>
      <span style={styles.delete} onClick={deleteName}>
        delete
      </span>
    </div>
  );
}

export default Admin_NameCard;

const styles = {
  container: {
    height: "40px",
    width: "500px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: "1px solid",
  },
  delete: {
    color: "blue",
  },
};
