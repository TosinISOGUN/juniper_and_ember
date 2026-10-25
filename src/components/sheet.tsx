import { X } from "@phosphor-icons/react";
import { useEffect, useRef, type ReactNode } from "react";

type Side = "right" | "left" | "bottom" | "full";

type Props = {
  open: boolean;
  onClose: () => void;
  side: Side;
  /** Accessible name of the dialog. */
  label: string;
  /** Visible heading inside the header bar. Omit for dialogs that bring their own. */
  title?: string;
  children: ReactNode;
};

/**
 * A modal dialog built on the native <dialog> element: focus is trapped, Escape closes it, the
 * page behind is inert, a click on the backdrop dismisses it, and focus returns to whatever opened
 * it. Children render only while it is open.
 */
export function Sheet({ open, onClose, side, label, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`sheet sheet-${side}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {open && (
        <div className="flex h-full max-h-[inherit] flex-col">
          {title && (
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <h2 className="display-sm">{title}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={onClose}
                aria-label={`Close ${label}`}
              >
                <X size={22} aria-hidden />
              </button>
            </div>
          )}
          {children}
        </div>
      )}
    </dialog>
  );
}
