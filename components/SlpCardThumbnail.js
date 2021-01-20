import React from "react";
import Image from "next/image";
import styles from "./SlpCardThumbnail.module.scss";

const SlpCardThumbnail = ({ players, stage }) => {
  const p1 = players[0];
  const p2 = players[1];

  return (
    <div className={styles.SlpCardThumbnail}>
      <div
        className={styles.stage}
        style={{
          background: `url(/static/images/stages/${stage}.png)`,
        }}
      />
      <img
        className={styles.p1Char}
        src={`/static/images/character-poses/${p1.characterId}/${p1.characterColor}.png`}
      />
      <img
        className={styles.p2Char}
        src={`/static/images/character-poses/${p2.characterId}/${p2.characterColor}.png`}
      />
    </div>
  );
};

export default SlpCardThumbnail;
