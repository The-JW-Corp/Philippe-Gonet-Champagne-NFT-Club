import React, { useState, useEffect } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/checkout-membership.module.css";
import Button from "../../Button/Button";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import Video from "../../Video/Video";
import { useModalContext } from "../../../contexts/ModalContext";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useWalletClient,
} from "wagmi";
import { getAddress, fromHex } from "viem";
import ClubCPG from "@/contracts/ClubCPG.json";
import { useApprove } from "@/hook/useApprove.js";
import { useMint } from "@/hook/useMint.js";
import { MAX_QUANTITY_NFT, PRICE } from "@/utils/constant";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
function CheckoutMembership() {
  const [isPlusToggled, setIsPlusToggled] = useState(false);
  const [isMinusToggled, setIsMinusToggled] = useState(false);
  const [isTimeoutApproveActive, setIsTimeoutApproveActive] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(PRICE);
  const [isMount, setIsMount] = useState(false);
  const [isNoWalletButtonClicked, setIsNoWalletButtonClicked] = useState(false);
  const {
    mintWithWalletSuccessFull,
    setMintWithWalletSuccessull,
    windowWidth,
  } = useModalContext();
  const { address, connector: activeConnector, isConnected } = useAccount();
  const {
    isWaitingApproveUSDCSignatureFromUser,
    isApproveUSDCTxSent,
    approveUSDCMethod,
    approveUSDCReceipt,
    approveUSDCIsError,
    approveUSDCIsLoading,
    approveUSDCError,
  } = useApprove(totalPrice);
  const { openConnectModal } = useConnectModal();
  const {
    isWaitingMintSignatureFromUser,
    isMintTxSent,
    mintMethod,
    mintReceipt,
    mintIsError,
    mintIsLoading,
    mintError,
  } = useMint(address, quantityCount);

  // async function mintMethodTimeout(timer) {
  //   setTimeout(async () => {
  //     try {
  //       console.log("in try");
  //       mintMethod({ from: address });
  //       setIsTimeoutApproveActive(false);
  //     } catch (error) {
  //       console.log("in error");
  //       console.error(error);
  //       if (!isMintTxSent) {
  //         console.log("in callback");
  //         mintMethodTimeout(5000);
  //       }
  //     }
  //   }, timer);
  // }
  useEffect(() => {
    if (approveUSDCReceipt) {
      console.log("in timeout 1");
      setIsTimeoutApproveActive(true);
      // mintMethodTimeout(10000);
      setTimeout(() => {
        console.log("in timeout");
        mintMethod({ from: address });
        console.log("after mint called");
        setIsTimeoutApproveActive(false);
        console.log("after timeout true");
      }, 15000);
    }
  }, [approveUSDCReceipt]);

  useEffect(() => {
    if (mintReceipt) {
      setMintWithWalletSuccessull(true);
    }
  }, [mintReceipt]);

  function handleNoWalletButtonClick(e) {
    e.preventDefault();
    setIsNoWalletButtonClicked(true);
  }

  function handleCountPlusMinusClick() {
    if (isPlusToggled) {
      handleCountMinusClick();
      return;
    }
    setQuantityCount(quantityCount + 1);
  }

  function handleCountMinusClick() {
    if (quantityCount > 1) {
      setQuantityCount(quantityCount - 1);
    }
  }

  useEffect(() => {
    if (quantityCount === MAX_QUANTITY_NFT) {
      setIsPlusToggled(true);
    }
    if (isPlusToggled) {
      setIsPlusToggled(false);
    }
    setTotalPrice(PRICE * quantityCount);
  }, [quantityCount]);

  useEffect(() => {
    setIsMount(true);
  }, []);
  return (
    <>
      {(approveUSDCIsLoading ||
        isWaitingMintSignatureFromUser ||
        mintIsLoading ||
        isTimeoutApproveActive) &&
      isMount ? (
        <>
          <div
            className={
              styles.checkout_membership_payout_loading_mint_wallet_container
            }
          >
            {isConnected && activeConnector && (
              <div
                className={
                  styles.checkout_membership_payout_loading_mint_wallet_type
                }
              >
                Connecté à {activeConnector?.name}{" "}
              </div>
            )}
            <div
              className={
                styles.checkout_membership_payout_loading_mint_wallet_animation_wrapper
              }
            >
              <div
                className={
                  styles.checkout_membership_payout_loading_mint_wallet
                }
              ></div>
              <div
                className={
                  styles.checkout_membership_payout_loading_mint_wallet_image_container
                }
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/metamask.svg?alt=media&token=26bcfafe-a5a8-4f92-a257-3178c76e0256"
                  alt="Metmask logo"
                />
              </div>
            </div>
            <div
              className={styles.checkout_membership_payout_loading_mint_tx_type}
            >
              {isMintTxSent ? (
                <>
                  <span>
                    {"Mint en cours... ­ (2/2)"}
                    <br />
                    {"Ne pas recharger la page"}
                  </span>{" "}
                  <br />
                </>
              ) : (
                <>
                  <span>
                    {"Approve en cours... ­ (1/2) "} <br />
                    {"Ne pas recharger la page"}
                  </span>
                </>
              )}
            </div>
          </div>
          {/* <div className={styles.checkout_membership_payout_loading}>

          </div> */}
        </>
      ) : (
        <>
          <div
            className={
              // TEST
              windowWidth < 950
                ? styles.checkout_membership_container
                : styles.checkout_membership_container
            }
          >
            <div
              className={
                // TEST
                windowWidth < 950
                  ? styles.checkoutmembership_payout_title_and_show_address
                  : ""
              }
            >
              {isConnected && (
                <>
                  <div
                    className={
                      styles.checkout_membership_payout_title_container
                    }
                  >
                    <span
                      className={
                        // TEST
                        windowWidth < 950
                          ? // ? styles.checkout_membership_payout_title_tablet
                            styles.checkout_membership_payout_title
                          : styles.checkout_membership_payout_title
                      }
                    >
                      Paiement
                    </span>
                    <div
                    // className={
                    //   windowWidth < 950
                    //     ? styles.checkout_membership_payout_show_address_container
                    //     : ""
                    // }
                    >
                      <ConnectButton
                        coolMode
                        label="Connect wallet"
                        chainStatus="none"
                        showBalance={false}
                      />
                    </div>
                  </div>
                </>
              )}

              <div
                className={
                  styles.checkout_membership_video_and_selector_and_price_container
                }
              >
                <div
                  className={
                    styles.checkout_membership_video_and_selector_and_price_container_price_wrap
                  }
                >
                  <div className={styles.checkout_membership_selector_title}>
                    Prix
                  </div>
                  <div
                    style={isConnected ? { marginBottom: "40px" } : {}}
                    className={
                      windowWidth < 950
                        ? styles.checkout_membership_price_container_tablet
                        : styles.checkout_membership_price_container
                    }
                  >
                    <div
                      className={
                        windowWidth < 950
                          ? styles.checkout_membership_price_tablet
                          : styles.checkout_membership_price
                      }
                      key={totalPrice}
                    >
                      {totalPrice}
                    </div>
                    <div className={styles.checkout_membership_price_currency}>
                      USDC
                    </div>
                  </div>
                </div>
                <div
                  className={
                    windowWidth < 950
                      ? styles.checkout_membership_video_and_selector_container_tablet
                      : styles.checkout_membership_video_and_selector_container
                  }
                >
                  <div
                    className={
                      windowWidth < 950
                        ? styles.checkout_membership_selector_bloc_container_tablet
                        : styles.checkout_membership_selector_bloc_container
                    }
                  >
                    <div className={styles.checkout_membership_selector_title}>
                      Quantité*
                    </div>
                    <div
                      className={
                        isConnected
                          ? styles.checkout_membership_selector_counter_container_tablet
                          : styles.checkout_membership_selector_counter_container
                      }
                    >
                      <div
                        className={
                          styles.checkout_membership_selector_counter_minus
                        }
                        onClick={handleCountMinusClick}
                      >
                        <span
                          style={
                            isMinusToggled
                              ? { transform: "rotate(360deg)" }
                              : {}
                          }
                        ></span>
                      </div>
                      <div
                        className={
                          styles.checkout_membership_selector_counter_quantity
                        }
                        key={quantityCount}
                      >
                        {quantityCount}
                      </div>
                      <div
                        className={
                          styles.checkout_membership_selector_counter_plus
                        }
                        onClick={handleCountPlusMinusClick}
                      >
                        <span
                          style={
                            isPlusToggled ? { transform: "rotate(360deg)" } : {}
                          }
                        ></span>
                        <span
                          style={
                            isPlusToggled
                              ? { transform: "translateX(-50%) rotate(270deg)" }
                              : {}
                          }
                        ></span>
                      </div>
                    </div>
                    <div
                      className={
                        windowWidth < 950
                          ? styles.checkout_membership_selector_text_limitation_tablet
                          : styles.checkout_membership_selector_text_limitation
                      }
                    >
                      *achat de 4 pass par client maximum
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                //  TEST
                windowWidth < 950
                  ? // ? styles.checkout_membership_explanation_and_buttons_container_tablet
                    styles.checkout_membership_explanation_and_buttons_container
                  : styles.checkout_membership_explanation_and_buttons_container
              }
            >
              <div
                className={
                  windowWidth < 950
                    ? // ? styles.checkout_membership_buttons_container_tablet
                      styles.checkout_membership_buttons_container
                    : styles.checkout_membership_buttons_container
                }
              >
                {isConnected ? (
                  <>
                    <div
                      className={
                        windowWidth < 950
                          ? // ? styles.checkout_membership_payout_buttons_and_description_container_tablet
                            styles.checkout_membership_payout_buttons_and_description_container
                          : styles.checkout_membership_payout_buttons_and_description_container
                      }
                    >
                      {/* {windowWidth < 950 && (
                        <>
                          <div
                            className={
                              styles.checkout_membership_payout_explanation_title_and_description_tablet
                            }
                          >
                            <div
                              className={
                                styles.checkout_membership_payout_explanation_title_tablet
                              }
                            >
                              Le CLUB
                            </div>
                            <div
                              className={
                                styles.checkout_membership_explanation_description_tablet
                              }
                            >
                              Le Club Membre Philippe Gonet propose une
                              expérience exclusive offerte par la maison de
                              champagne Philippe Gonet, réputée pour son
                              engagement en faveur de l'excellence et de
                              l'authenticité. Les membres bénéficient d'une
                              collaboration privilégiée avec quatre chefs de
                              renom, leur ouvrant la porte à des expériences
                              gastronomiques exceptionnelles.
                            </div>
                          </div>
                        </>
                      )} */}
                      <div
                        className={
                          windowWidth < 950
                            ? styles.checkout_membership_payout_buttons_container_tablet
                            : styles.checkout_membership_payout_buttons_container
                        }
                      >
                        <div onClick={approveUSDCMethod}>
                          <Button
                            size={windowWidth < 700 ? "xtra-small" : "small"}
                          >
                            <div>Payer avec mon wallet</div>
                            <div
                              className={
                                styles.checkout_membership_payout_wallet_logo_container
                              }
                            >
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/metamask.svg?alt=media&token=26bcfafe-a5a8-4f92-a257-3178c76e0256"
                                alt=""
                              />

                              <img
                                src="https://www.rainbowkit.com/rainbow.svg"
                                alt=""
                              />
                            </div>
                          </Button>
                        </div>
                        {/* <Button size="small"> */}
                        <CrossmintPayButton
                          collectionId="a61d6995-d907-4adc-84a4-1b41de38faa0"
                          projectId="2c2bc152-8afd-4a73-b345-4335406d4cc6"
                          mintConfig={{
                            totalPrice: `${totalPrice}`,
                            _quantity: `${quantityCount}`,
                          }}
                          environment="staging"
                          mintTo={`${address}`}
                          successCallbackURL="https://club-champagne-philippe-gonet.com/crossmintpayload"
                          getButtonText={(connecting) =>
                            connecting
                              ? "Chargement..."
                              : `Payer par carte bancaire`
                          }
                        />
                        {/* <div>Payer par carte bancaire</div>
                        <div>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/crossmint.svg?alt=media&token=2383cc02-1f5c-43ff-8964-7a86ca450e0a"
                            alt=""
                          />
                        </div> */}
                        {/* </Button> */}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={
                        styles.checkout_membership_payout_buttons_container_first
                      }
                    >
                      <Button
                        connectWalletButton={true}
                        size=""
                        // size={windowWidth < 950 ? "xtra-small" : "small"}
                      >
                        <div onClick={openConnectModal}>Payer en crypto</div>
                      </Button>
                      <div onClick={handleNoWalletButtonClick}>
                        <CrossmintPayButton
                          collectionId="a61d6995-d907-4adc-84a4-1b41de38faa0"
                          projectId="2c2bc152-8afd-4a73-b345-4335406d4cc6"
                          mintConfig={{
                            totalPrice: `${totalPrice}`,
                            _quantity: `${quantityCount}`,
                          }}
                          environment="staging"
                          successCallbackURL="https://club-champagne-philippe-gonet.com/crossmintpayload"
                          getButtonText={(connecting) =>
                            connecting
                              ? "Chargement"
                              : `Payer par carte bancaire`
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.checkout_membership_whatsapp_container}>
                <span>
                  Pour toute question, écrivez nous sur whatsapp, notre équipe
                  est la pour vous aider.
                </span>
                <a href="https://wa.me/message/WZZB6ATQWIKPN1">
                  Nous contacter{" "}
                  <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/whatsapp2.svg?alt=media&token=7a7cde58-ac4c-4e63-943f-c6972e9b0870"></img>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutMembership;
