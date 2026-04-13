import React from "react";
import {
  PlayIcon,
  Share1Icon,
  Link2Icon,
  DownloadIcon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import ShareModal from "./ShareModal";

type ButtonType =
  | "share"
  | "rtc"
  | "getlink"
  | "reset"
  | "delete"
  | "save"
  | "create"
  | "start"
  | "startblue"
  | "startgreen"
  | "new"
  | "open"
  | "retry"
  | "cancel"
  | "stop";

type ButtonOptions = {
  text?: string;
  trigger?: string;
  show?: boolean;
  alignRight?: boolean;
  textFirst?: boolean;
  firstRow?: boolean;
  defaultRow?: boolean;
  dependency?: Record<string, string[]>;
};

type ButtonRowConfig = {
  input: {
    type: "buttons";
    options: {
      buttons: ButtonType[];
    } & Partial<Record<ButtonType, ButtonOptions>>;
  };
};

type ButtonRowProps = {
  buttonRowConfig: ButtonRowConfig;
  serviceId: string;
  rowId: string;
  isFirstRow: boolean;
  pageType: string;
};

function isButtonVisible(
  button: ButtonType,
  config: ButtonRowConfig,
  isFirstRow: boolean,
): boolean {
  const buttons = config.input.options.buttons;
  if (!buttons.includes(button)) return false;

  const opts = config.input.options[button];
  if (isFirstRow) return opts?.firstRow !== false;
  return opts?.defaultRow !== false;
}

function getOpts(button: ButtonType, config: ButtonRowConfig): ButtonOptions {
  return config.input.options[button] ?? {};
}

function getDependencyAttrs(opts: ButtonOptions): Record<string, string> {
  const attrs: Record<string, string> = {};
  if (opts.dependency) {
    for (const [key, values] of Object.entries(opts.dependency)) {
      attrs[`data-dependency-${key}`] = "true";
      for (const value of values) {
        attrs[`data-dependency-${key}-${value}`] = "true";
      }
    }
  }
  return attrs;
}

type ActionButtonProps = {
  serviceId: string;
  rowId: string;
  onClick?: () => void;
  opts: ButtonOptions;
  buttonKey: string;
  svgKey: string;
  defaultText: string;
  variantClass: string;
  hidden?: boolean;
};

const getSVG = (key: string) => {
  switch (key) {
    case "share":
      return <Share1Icon />;
    case "rtc":
      return <PlayIcon />;
    case "link":
      return <Link2Icon />;
    case "save":
      return <DownloadIcon />;
    case "reset":
      return <ResetIcon />;
    case "delete":
      return <TrashIcon />;
    default:
      return null;
  }
};

const ActionButton = ({
  serviceId,
  rowId,
  onClick,
  opts,
  buttonKey,
  svgKey,
  defaultText,
  variantClass,
  hidden = false,
}: ActionButtonProps) => {
  const alignClass = opts.alignRight ? "ms-auto" : "me-2";
  const buttonText = opts.text || defaultText;
  const icon = getSVG(svgKey);
  const content = opts.textFirst ? (
    <>
      {buttonText} {icon}
    </>
  ) : (
    <>
      {icon} {buttonText}
    </>
  );

  return (
    <button
      type="button"
      data-service={serviceId}
      data-row={rowId}
      id={`${serviceId}-${rowId}-${buttonKey}-btn`}
      className={`btn ${variantClass} ${alignClass} ${hidden ? "d-none" : ""}`.trim()}
      onClick={onClick}
      {...getDependencyAttrs(opts)}
    >
      {content}
    </button>
  );
};

const ButtonRow = ({
  buttonRowConfig,
  serviceId,
  rowId,
  isFirstRow,
  pageType,
}: ButtonRowProps) => {
  const modalId = `${serviceId}-${rowId}-modal`;
  const copyBtnId = `${serviceId}-${rowId}-modal-copy-btn`;
  const buttonsDivId = `${serviceId}-${rowId}-buttons-div`;

  if (["share", "start"].includes(pageType)) {
    return (
      <ShareModal
        modalId={modalId}
        copyBtnId={copyBtnId}
        serviceId={serviceId}
        rowId={rowId}
      />
    );
  }

  const show = (button: ButtonType) =>
    isButtonVisible(button, buttonRowConfig, isFirstRow);
  const opts = (button: ButtonType) => getOpts(button, buttonRowConfig);

  // Instead of the trigger design use direct eventHandlers for each

  const handleShare = () => {
    console.log(opts("share").trigger);
  };

  const handleRtc = () => {
    console.log(opts("rtc").trigger);
  };

  const handleGetLink = () => {
    console.log(opts("getlink").trigger);
  };

  const handleSave = () => {
    console.log(opts("save").trigger);
  };

  const handleReset = () => {
    console.log(opts("reset").trigger);
  };

  const handleDelete = () => {
    console.log(opts("delete").trigger);
  };

  const handleCreate = () => {
    console.log(opts("create").trigger);
  };

  const handleStart = () => {
    console.log(opts("start").trigger);
  };

  const handleStartBlue = () => {
    console.log(opts("startblue").trigger);
  };

  const handleStartGreen = () => {
    console.log(opts("startgreen").trigger);
  };

  const handleNew = () => {
    console.log(opts("new").trigger);
  };

  const handleOpen = () => {
    console.log(opts("open").trigger);
  };

  const handleRetry = () => {
    console.log(opts("retry").trigger);
  };

  const handleCancel = () => {
    console.log(opts("cancel").trigger);
  };

  const handleStop = () => {
    console.log(opts("stop").trigger);
  };

  const hasAnyButton =
    show("share") ||
    show("rtc") ||
    show("getlink") ||
    show("reset") ||
    show("delete") ||
    show("save") ||
    show("create") ||
    show("start") ||
    show("startblue") ||
    show("startgreen") ||
    show("new") ||
    show("open") ||
    show("retry") ||
    show("cancel") ||
    show("stop");

  if (!hasAnyButton) {
    return (
      <ShareModal
        modalId={modalId}
        copyBtnId={copyBtnId}
        serviceId={serviceId}
        rowId={rowId}
      />
    );
  }

  const common = { serviceId, rowId };

  return (
    <>
      <hr />
      <div className="d-flex" id={buttonsDivId} role="dialog" tabIndex={-1}>
        {show("share") && (
          <ActionButton
            {...common}
            buttonKey="share"
            svgKey="share"
            defaultText="Share"
            variantClass=""
            opts={opts("share")}
            onClick={handleShare}
          />
        )}

        {show("rtc") && (
          <ActionButton
            {...common}
            buttonKey="rtc"
            svgKey="rtc"
            defaultText="RTC"
            variantClass=""
            opts={opts("rtc")}
            hidden={opts("rtc").show === false}
            onClick={handleRtc}
          />
        )}

        {show("getlink") && (
          <ActionButton
            {...common}
            buttonKey="getlink"
            svgKey="link"
            defaultText=""
            variantClass=""
            opts={opts("getlink")}
            onClick={handleGetLink}
          />
        )}

        {show("save") && (
          <ActionButton
            {...common}
            buttonKey="save"
            svgKey="save"
            defaultText="Save"
            variantClass="btn-success"
            opts={opts("save")}
            onClick={handleSave}
          />
        )}

        {show("create") && (
          <ActionButton
            {...common}
            buttonKey="create"
            svgKey="plus"
            defaultText="Create"
            variantClass="btn-primary"
            opts={opts("create")}
            onClick={handleCreate}
          />
        )}

        {show("start") && (
          <ActionButton
            {...common}
            buttonKey="start"
            svgKey="start"
            defaultText="Start"
            variantClass="btn-success"
            opts={opts("start")}
            onClick={handleStart}
          />
        )}

        {show("startblue") && (
          <ActionButton
            {...common}
            buttonKey="startblue"
            svgKey="start"
            defaultText="Start"
            variantClass="btn-primary"
            opts={opts("startblue")}
            onClick={handleStartBlue}
          />
        )}

        {show("startgreen") && (
          <ActionButton
            {...common}
            buttonKey="startgreen"
            svgKey="start"
            defaultText="Start"
            variantClass="btn-success"
            opts={opts("startgreen")}
            onClick={handleStartGreen}
          />
        )}

        {show("new") && (
          <ActionButton
            {...common}
            buttonKey="new"
            svgKey="plus"
            defaultText="New"
            variantClass="btn-primary"
            opts={opts("new")}
            onClick={handleNew}
          />
        )}

        {show("open") && (
          <ActionButton
            {...common}
            buttonKey="open"
            svgKey="open"
            defaultText="Open"
            variantClass="btn-success"
            opts={opts("open")}
            onClick={handleOpen}
          />
        )}

        {show("retry") && (
          <ActionButton
            {...common}
            buttonKey="retry"
            svgKey="retry"
            defaultText="Retry"
            variantClass="btn-success"
            opts={opts("retry")}
            onClick={handleRetry}
          />
        )}

        {show("reset") && (
          <ActionButton
            {...common}
            buttonKey="reset"
            svgKey="reset"
            defaultText="Reset"
            variantClass="btn-danger"
            opts={opts("reset")}
            onClick={handleReset}
          />
        )}

        {show("delete") && (
          <ActionButton
            {...common}
            buttonKey="delete"
            svgKey="delete"
            defaultText="Delete"
            variantClass="btn-danger"
            opts={opts("delete")}
            onClick={handleDelete}
          />
        )}

        {show("cancel") && (
          <ActionButton
            {...common}
            buttonKey="cancel"
            svgKey="stop"
            defaultText="Cancel"
            variantClass="btn-danger"
            opts={opts("cancel")}
            onClick={handleCancel}
          />
        )}

        {show("stop") && (
          <ActionButton
            {...common}
            buttonKey="stop"
            svgKey="stop"
            defaultText="Stop"
            variantClass="btn-success"
            opts={opts("stop")}
            onClick={handleStop}
          />
        )}
      </div>
      <ShareModal
        modalId={modalId}
        copyBtnId={copyBtnId}
        serviceId={serviceId}
        rowId={rowId}
      />
    </>
  );
};

export default ButtonRow;
