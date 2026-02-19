import type { Dependency } from "@/types/frontendConfig";

export interface DependencyResult {
  visible: boolean;
  disabled: boolean;
}

export function evaluateDependency(
  dependency: Dependency | undefined,
  currentValues: Record<string, unknown>,
): DependencyResult {
  if (!dependency) {
    return { visible: true, disabled: false };
  }

  for (const [depField, allowedValues] of Object.entries(dependency)) {
    const currentValue = currentValues[depField];

    // Dependency field has no value yet → hide
    if (
      currentValue === undefined ||
      currentValue === null ||
      currentValue === ""
    ) {
      return { visible: false, disabled: true };
    }

    // Compare case-insensitively
    const currentStr = String(currentValue).toLowerCase();
    const allowed = (allowedValues as string[]).map((v) => v.toLowerCase());

    if (!allowed.includes(currentStr)) {
      return { visible: false, disabled: true };
    }
  }

  return { visible: true, disabled: false };
}

export function areDependenciesMet(
  dependency: Dependency | undefined,
  currentValues: Record<string, unknown>,
): boolean {
  return evaluateDependency(dependency, currentValues).visible;
}
