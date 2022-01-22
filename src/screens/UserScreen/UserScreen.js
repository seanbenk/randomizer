import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";

import Screen from "../../components/Screen";
import Card from "../../components/User_NameCard";

function UserScreen({ socket, names, setNames }) {
  const [fadedNames, setFadedNames] = useState([]);

  const playLottery = (names, randomName) => {
    const shuffledNames = shuffle(names.filter((name) => name !== randomName));
    console.log("names: ", names);
    for (let i = 0; i < shuffledNames.length; i++) {
      setTimeout(() => {
        setFadedNames((prev) => [...prev, shuffledNames[i]]);
      }, i * 800);
    }
  };

  useEffect(() => {
    const namesListener = (newNames) => {
      setNames((preNames) => {
        return newNames;
      });
    };

    const lotteryListener = ({ names, randomName }) => {
      playLottery(names, randomName);
    };

    socket.emit("getNames");

    socket.on("names", namesListener);

    socket.on("lottery", lotteryListener);

    socket.on("resetAnimations", () => {
      console.log("animations resetting");
      setFadedNames([]);
    });
  }, [socket]);

  // useEffect(() => {

  // }, []);

  // function playLottery(randomName) {
  //   console.log(randomName);
  //   console.log(getNames());
  //   const randomNameIdx = getNames().indexOf(randomName);
  //   console.log("name idx: ", randomNameIdx);
  //   for (let i = 0; i < 5; i++) {
  //     for (let j = 1; j < names.length; j++) {
  //       setTimeout(() => {
  //         if (i >= 4 && j === randomNameIdx) setRandomName(randomName);
  //         if (i >= 4 && j > randomNameIdx) {
  //           return;
  //         } else {
  //           setAnimatedName(() => names[j]);
  //         }
  //       }, j * 100 + i * names.length * 100);
  //     }
  //   }
  // }

  // (j * 100 + i * names.length * 100)

  return (
    <Screen style={styles.container}>
      <h1>GA Lottery</h1>
      {names.map((name, idx) => (
        <Card
          key={idx}
          name={name}
          // selected={name === randomName}
          animated={fadedNames.includes(name)}
        />
      ))}
    </Screen>
  );
}

export default UserScreen;

const styles = {
  container: {
    paddingTop: 100,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
};
