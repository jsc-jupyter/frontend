import React, { useContext, useMemo } from "react";
import type { BaseElementProps } from "../types";
import "./FlavorInfo.css";
import { useConfigById } from "@/stores/hooks";
import { JupyterlabIDContext } from "@/stores";
import { useCombinedStore } from "@/stores/combinedStore";
import FlavorBar from "./FlavorBar";

interface FlavorDescription {
  display_name: string;
  description: string;
  current?: number;
  max: number;
  weight?: number;
}

interface Flavors {
  [key: string]: FlavorDescription;
}

interface FlavorInfoProps extends BaseElementProps {
  children?: React.ReactNode;
  flavors?: Flavors;
}

const FlavorInfo = ({ elementId, flavors, children }: FlavorInfoProps) => {
  const configIndex = useContext(JupyterlabIDContext);
  const system = useConfigById(configIndex)?.system;
  const kubeOutpostFlavors = useCombinedStore(
    (state) => state.kubeOutpostFlavors,
  );

  // Resolve the flavors to display: prefer the prop, fall back to the global
  // kubeOutpostFlavors lookup keyed by system (mirrors legacy allFlavors logic).
  const resolvedFlavors: Flavors | undefined = useMemo(() => {
    if (flavors !== undefined) return flavors;
    if (system) return kubeOutpostFlavors?.[system];
    return undefined;
  }, [flavors, system, kubeOutpostFlavors]);

  // Sort by weight descending (missing weight defaults to 99)
  const sortedFlavors = useMemo<FlavorDescription[]>(() => {
    if (!resolvedFlavors) return [];

    return Object.entries(resolvedFlavors)
      .filter(([, value]) => value.max !== 0)
      .sort(([, a], [, b]) => {
        const weightA = a.weight ?? 99;
        const weightB = b.weight ?? 99;
        return weightB - weightA; // descending
      })
      .map(([, description]) => description);
  }, [resolvedFlavors]);

  // Only render when a single kube-flavor system is selected
  if (!system || !resolvedFlavors) return null;

  return (
    <div id={`${elementId}-flavor-info`} className="flavor-info">
      {sortedFlavors.map((description) => (
        <FlavorBar key={description.display_name} description={description} />
      ))}
      {children}
    </div>
  );
};

export default FlavorInfo;
