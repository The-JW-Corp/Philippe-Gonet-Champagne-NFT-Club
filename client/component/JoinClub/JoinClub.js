import React, { useState, useEffect } from "react";
import styles from "../../styles/join-club.module.css";
import Video from "../Video/Video";
import { useModalContext } from "@/contexts/ModalContext";
function JoinClub({ handleMintButtonClick }) {
  const { windowWidth, setWindowWidth } = useModalContext();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.join_club_container}>
      <div className={styles.join_club_title_and_mint_button_container}>
        <div className={styles.join_club_title_container}>
          REJOIGNEZ LE CLUB CHAMPAGNE PHILIPPE GONET
        </div>
        <div className={styles.join_club_subtitle}>
          La vente est ouverte. N’attendez plus et achetez votre carte membre
          dès maintenant.
        </div>
      </div>
      <a
        target="_blank"
        href="https://www.champagne-philippe-gonet.com/club/"
        className={styles.join_club_know_more_container}
      >
        <div className={styles.join_club_know_more}>Découvrir le projet</div>
        <div className={styles.join_club_know_more_champagne_logo}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/champagne-bottle.svg?alt=media&token=4029a756-d719-486d-94c9-2fcaed9e96ff"
            alt="champagne bouteille logo"
          />
        </div>
      </a>
    </div>
  );
}

export default JoinClub;
