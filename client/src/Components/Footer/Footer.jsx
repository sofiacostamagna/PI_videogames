import React from "react";
import { Link } from "react-router-dom";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div>
      <div>
        <h1 className={styles.tituloName}>COSTAMAGNA SOFIA</h1>
        <div>
          <a href="https://www.linkedin.com/in/costamagnasofia/" target="_blank">
            <img clasname={styles.img2} src="https://example.com/linkedin-icon.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/sofiacostamagna" target="_blank">
            <img className={styles.imaG2} src="https://example.com/github-icon.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </div>
  );
}
