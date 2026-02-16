import React, { useCallback } from "react";
import { Dialog } from "radix-ui";
import {
  Share1Icon,
  LinkBreak2Icon,
  ResetIcon,
  TrashIcon,
  PlusIcon,
  PlayIcon,
  StopIcon,
  ExternalLinkIcon,
  CopyIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import type { BaseElementProps, ButtonConfig } from "../types";
import "./ActionButtons.css";

interface ActionButtonsProps extends BaseElementProps {
  isFirstRow?: boolean;
  onAction?: (action: string) => void;
}

const BUTTON_VARIANT: Record<string, string> = {
  start: "success",
  startgreen: "success",
  startblue: "primary",
  save: "success",
  open: "success",
  retry: "success",
  create: "primary",
  new: "primary",
  stop: "danger",
  cancel: "danger",
  reset: "danger",
  delete: "danger",
  share: "outline",
  rtc: "outline",
  getlink: "outline",
};

const BUTTON_TEXT: Record<string, string> = {
  start: "Start",
  startgreen: "Start",
  startblue: "Start",
  save: "Save",
  open: "Open",
  retry: "Retry",
  create: "Create",
  new: "New",
  stop: "Stop",
  cancel: "Cancel",
  reset: "Reset",
  delete: "Delete",
  share: "Share",
  rtc: "RTC",
  getlink: "",
};

const BUTTON_ICON: Record<string, React.ReactNode> = {
  start: <PlayIcon />,
  startgreen: <PlayIcon />,
  startblue: <PlayIcon />,
  save: <CopyIcon />,
  open: <ExternalLinkIcon />,
  retry: <UpdateIcon />,
  create: <PlusIcon />,
  new: <PlusIcon />,
  stop: <StopIcon />,
  cancel: <StopIcon />,
  reset: <ResetIcon />,
  delete: <TrashIcon />,
  share: <Share1Icon />,
  rtc: <LinkBreak2Icon />,
  getlink: <LinkBreak2Icon />,
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  serviceId,
  rowId,
  elementOptions,
  isFirstRow = false,
  onAction,
}) => {
  const buttons: string[] =
    (elementOptions.input?.options?.buttons as string[]) ?? [];

  const handleClick = useCallback(
    (action: string) => {
      onAction?.(action);
    },
    [onAction],
  );

  const visibleButtons = buttons.filter((btn) => {
    const btnOpts = (elementOptions.input?.options?.[btn] ?? {}) as ButtonConfig;
    if (isFirstRow && btnOpts.firstRow === false) return false;
    if (!isFirstRow && btnOpts.defaultRow === false) return false;
    return true;
  });

  const shareDialog = (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="action-buttons__btn action-buttons__btn--outline"
          aria-label="Share"
        >
          <Share1Icon /> Share
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="action-buttons__dialog-overlay" />
        <Dialog.Content className="action-buttons__dialog-content">
          <Dialog.Title className="action-buttons__dialog-title">
            Share Workshop
          </Dialog.Title>
          <Dialog.Description className="action-buttons__dialog-description">
            Share your configuration with others.
          </Dialog.Description>
          <div className="action-buttons__dialog-footer">
            <Dialog.Close asChild>
              <button
                type="button"
                className="action-buttons__dialog-close"
              >
                Close
              </button>
            </Dialog.Close>
            <button
              type="button"
              className="action-buttons__btn action-buttons__btn--outline"
              onClick={() => handleClick("copy-url")}
            >
              <CopyIcon /> Copy URL
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

  if (visibleButtons.length === 0) {
    return <div className="action-buttons">{shareDialog}</div>;
  }

  return (
    <div className="action-buttons">
      <hr className="action-buttons__divider" />
      <div className="action-buttons__row">
        {visibleButtons.map((btn) => {
          if (btn === "share") {
            return <React.Fragment key={btn}>{shareDialog}</React.Fragment>;
          }

          const btnOpts = (elementOptions.input?.options?.[btn] ?? {}) as ButtonConfig;
          const variant = BUTTON_VARIANT[btn] ?? "primary";
          const text = btnOpts.text || BUTTON_TEXT[btn] || btn;
          const icon = BUTTON_ICON[btn];
          const align = btnOpts.alignRight ? "action-buttons__btn--spacer" : "";

          return (
            <button
              key={btn}
              type="button"
              id={`${serviceId}-${rowId}-${btn}-btn`}
              className={`action-buttons__btn action-buttons__btn--${variant} ${align}`}
              onClick={() => handleClick(btn)}
            >
              {btnOpts.textFirst ? (
                <>
                  {text} {icon}
                </>
              ) : (
                <>
                  {icon} {text}
                </>
              )}
            </button>
          );
        })}
      </div>
      {shareDialog}
    </div>
  );
};

export default ActionButtons;
