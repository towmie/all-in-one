import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cc } from "../../../utils/utils";

export default function Modal({ children, isOpen, onClose }) {
  const [isClosing, setClosing] = useState(false);
  const prevIsOpen = useRef();

  useEffect(
    function () {
      function handler(e) {
        if (e.key === "Escape") onClose();
      }

      document.addEventListener("keydown", handler);

      return () => {
        document.removeEventListener("keydown", handler);
      };
    },
    [onClose]
  );

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) setClosing(true);

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setClosing(false)}
      className={cc("modal", isClosing && "closing")}
    >
      <div className="overlay" onClick={onClose} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container")
  );
}
