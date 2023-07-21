"use client";

import classNames from "classnames";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import FocusLock from "react-focus-lock";

type ModalSizesType = "xs" | "sm" | "md" | "lg" | "xl";

export type ModalType = {
  isOpen: boolean;
  /** Callback fired when esc key is pressed or user clicks outside of modal*/
  onClose: () => void;
  children: ReactNode;
  contentSize?: ModalSizesType;
  dataTestId?: string;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  contentSize = "sm",
  dataTestId,
}: ModalType) => {
  const wrapperClass = classNames("modal-container modal", {
    "-xs": contentSize === "xs",
    "-sm": contentSize === "sm",
    "-md": contentSize === "md",
    "-lg": contentSize === "lg",
    "-xl": contentSize === "xl",
  });

  useEffect(() => {
    // Prevents scrolling when modal is open
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // When esc key is pressed
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [isOpen, onClose]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <FocusLock autoFocus={false}>
        <div
          className={wrapperClass}
          aria-label="modal"
          data-testid={dataTestId}
        >
          <div className="body" aria-modal role="dialog" tabIndex={-1}>
            {children}
          </div>
          <div className="background" onClick={() => onClose()} />
        </div>
      </FocusLock>,
      document.body,
    );
  }

  return null;
};

export default Modal;
