import React, { useState } from "react";
import { Collapsible } from "radix-ui";
import type { BaseElementProps } from "../types";
import "./ReservationInfo.css";

interface ReservationInfoProps extends BaseElementProps {
  startTime?: string;
  endTime?: string;
  state?: string;
  details?: string;
}

const ReservationInfo: React.FC<ReservationInfoProps> = ({
  startTime = "",
  endTime = "",
  state = "",
  details = "",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="reservation-info">
      <div className="reservation-info__content">
        <div className="reservation-info__row">
          <span className="reservation-info__label">Start Time:</span>
          <span className="reservation-info__value">{startTime}</span>
        </div>
        <div className="reservation-info__row">
          <span className="reservation-info__label">End Time:</span>
          <span className="reservation-info__value">{endTime}</span>
        </div>
        <div className="reservation-info__row">
          <span className="reservation-info__label">State:</span>
          <span className="reservation-info__value">{state}</span>
        </div>

        <Collapsible.Root
          open={open}
          onOpenChange={setOpen}
          className="reservation-info__details"
        >
          <Collapsible.Trigger asChild>
            <button type="button" className="reservation-info__summary">
              {open ? "▾" : "▸"} Detailed reservation information:
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <pre className="reservation-info__pre">
              {details || "No details available."}
            </pre>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
};

export default ReservationInfo;
