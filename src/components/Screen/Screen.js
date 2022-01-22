import React from "react";

function Screen({ children, style = {} }) {
  return <div style={{ ...styles.container, ...style }}>{children}</div>;
}

export default Screen;

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
  },
};
