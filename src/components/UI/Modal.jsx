import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open,onClose, className = "" }) {
  const dialogRef = useRef();
  useEffect(() => {
    const modalCurrent = dialogRef.current;
    if (open) {
      modalCurrent.showModal();
    }
    return () => modalCurrent.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
