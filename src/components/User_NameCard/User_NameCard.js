import React from "react";

function User_NameCard({ name, socket, selected, animated }) {
  return (
    <div style={styles.container}>
      <span
        style={{
          ...styles.name,
          ...{
            color: selected ? "red" : animated ? "green" : "black",
            background: selected ? "lightblue" : "none",
            opacity: animated ? 0 : 1,
            transition: "linear 200ms",
          },
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default User_NameCard;

const styles = {
  container: {
    height: "40px",
    width: "500px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
};
