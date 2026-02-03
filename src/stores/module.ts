interface Module {
  name: string;
  enabled: boolean;
  version: string;
  interactiveOnly?: boolean;
  computeOnly?: boolean;
}

export { Module };
