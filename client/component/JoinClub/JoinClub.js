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
          La pré-vente est fermée. L’ouverture de la phase public aura lieu le
          dimanche 3 mars 2024.
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

      <div className={styles.join_club_price}>
        Le prix est de 320$ (290€) + 6% de frais de carte bancaire
      </div>
      <div
        style={windowWidth < 450 ? { fontSize: "12px" } : {}}
        className={styles.join_club_price}
      >
        Une fois le paiement confirmé, une fenêtre va s’ouvrir. <br />
        N’oubliez pas de nous communiquer votre adresse e-mail afin d’être
        recontacté.
        <br /> <br />
        <span>
          Si vous faites un cadeau, après avoir donné votre adresse e-mail,
          n’oubliez pas de cocher sur la case correspondante
        </span>
      </div>
    </div>
  );
}

export default JoinClub;
