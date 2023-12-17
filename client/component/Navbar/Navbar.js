import React, { useEffect, useState } from "react";
import styles from "../../styles/navbar.module.css";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // si le scroll est de plus de 20ox alors isScrolled deviens true
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={styles.navbar_container}
      style={{
        backgroundColor: isScrolled ? "black" : "transparent",
        transition: "background-color 300ms",
      }}
    >
      <div className={styles.navbar_wrap}>
        <div className={styles.navbar_logo_container}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/philippe-gonnet-white-logo.svg?alt=media&token=905d7718-274e-484d-907f-5670534b4c1f"
            alt="Philippe Gonet Logo"
          />
        </div>
        <div className={styles.navbar_menu_container}>
          <div className={styles.navbar_menu_wrap}>
            <a
              href="https://www.champagne-philippe-gonet.com/club/"
              target="_blank"
              className={styles.navbar_menu_club}
            >
              Le club
            </a>
            <a
              href="https://wa.me/message/WZZB6ATQWIKPN1"
              target="_blank"
              className={styles.navbar_menu_our_history}
            >
              <img
                className={styles.navbar_logo}
                src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/whatsapp2.svg?alt=media&token=7a7cde58-ac4c-4e63-943f-c6972e9b0870"
              />
            </a>
            <a
              href="https://discord.gg/evb3c6sSh7"
              target="_blank"
              className={styles.navbar_menu_vintage}
            >
              <img
                className={styles.navbar_logo}
                src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/discord2.svg?alt=media&token=252dac3a-179c-4bb8-9767-79f6156a73fc"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
