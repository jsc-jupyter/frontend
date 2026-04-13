import { InfoCircledIcon } from "@radix-ui/react-icons";

interface FlavorDescription {
  display_name: string;
  description: string;
  current?: number;
  max: number;
  weight?: number;
}

interface FlavorBarProps {
  description: FlavorDescription;
}

const FlavorBar = ({ description }: FlavorBarProps) => {
  const current = description.current ?? 2;
  const maxAllowed = description.max;
  // Flavor not valid, skip rendering
  if (
    maxAllowed === 0 ||
    current < 0 ||
    maxAllowed == null ||
    current == null
  ) {
    return null;
  }

  let bgColor = "bg-primary";
  let progressTooltip: string;
  let maxAllowedLabel: number | string;
  let currentWidth: number;
  let maxAllowedWidth: number;

  if (maxAllowed === -1) {
    // Infinite allowed
    progressTooltip = `${current} used`;
    maxAllowedLabel = "∞";
    if (current === 0) {
      currentWidth = 0;
      maxAllowedWidth = 100;
    } else {
      currentWidth = 20;
      maxAllowedWidth = 80;
    }
  } else {
    progressTooltip = `${current} out of ${maxAllowed} used`;
    maxAllowedLabel = maxAllowed - current;
    currentWidth = (current / maxAllowed) * 100;
    maxAllowedWidth = (maxAllowedLabel / maxAllowed) * 100;

    if (maxAllowedLabel < 0) {
      maxAllowedLabel = 0;
      maxAllowedWidth = 0;
      bgColor = "bg-danger";
    }
  }

  return (
    <div className="row align-items-center g-0 mt-4">
      <div className="col-4">
        <span>{description.display_name}</span>
        <a
          className="lh-1 ms-3"
          style={{ paddingTop: "1px" }}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={description.description}
        >
          <InfoCircledIcon />
        </a>
      </div>
      <div
        className="progress col ms-2 fw-bold"
        style={{ height: "20px" }}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={progressTooltip}
      >
        <div
          className={`progress-bar ${bgColor}`}
          role="progressbar"
          style={{ width: `${currentWidth}%` }}
        >
          {current}
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${maxAllowedWidth}%`, backgroundColor: "green" }} // TODO Change to variable and check why bg-success is not working
        >
          {maxAllowedLabel}
        </div>
      </div>
    </div>
  );
};

export default FlavorBar;
