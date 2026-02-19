import type { ComponentType } from "react";
import type { BaseElementProps } from "@/components/elements/types";

export type RegisteredComponentProps = BaseElementProps & {
  onChange?: (value: unknown) => void;
  isFirstRow?: boolean;
};

// Registry for mapping input types to React components
class ComponentRegistry {
  private components = new Map<
    string,
    ComponentType<RegisteredComponentProps>
  >();

  /*
   * Register a component for a given input type.
   * Accepts ComponentType<any> because some components (e.g. HorizontalRule,
   * FlavorLegend) have narrower or empty prop interfaces.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(type: string, component: ComponentType<any>) {
    this.components.set(type, component);
  }

  get(type: string): ComponentType<RegisteredComponentProps> | undefined {
    return this.components.get(type);
  }

  has(type: string): boolean {
    return this.components.has(type);
  }

  getOrThrow(type: string): ComponentType<RegisteredComponentProps> {
    const component = this.components.get(type);
    if (!component) {
      throw new Error(`No component registered for type: "${type}"`);
    }
    return component;
  }

  getRegisteredTypes(): string[] {
    return Array.from(this.components.keys());
  }
}

export const componentRegistry = new ComponentRegistry();
