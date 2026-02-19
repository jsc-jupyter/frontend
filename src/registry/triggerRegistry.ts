export interface TriggerContext {
  fieldName: string;
  serviceId: string;
  getFieldValue: (name: string) => unknown;
  setFieldValue: (name: string, value: unknown) => void;
  getAllValues: () => Record<string, unknown>;
}

export type TriggerFunction = (
  value: unknown,
  context: TriggerContext,
) => void | Promise<void>;

/* 
  Trigger Registry — maps trigger name strings from the frontend config
  Separate from the ComponentRegistry: triggers are _behaviour_, not _UI_.
*/
class TriggerRegistry {
  private triggers = new Map<string, TriggerFunction>();

  register(name: string, fn: TriggerFunction) {
    this.triggers.set(name, fn);
  }

  get(name: string): TriggerFunction | undefined {
    return this.triggers.get(name);
  }

  has(name: string): boolean {
    return this.triggers.has(name);
  }

  async execute(
    name: string,
    value: unknown,
    context: TriggerContext,
  ): Promise<void> {
    const fn = this.triggers.get(name);
    if (fn) {
      await fn(value, context);
    } else {
      console.warn(`[TriggerRegistry] trigger "${name}" not found`);
    }
  }

  getRegisteredTriggers(): string[] {
    return Array.from(this.triggers.keys());
  }
}

export const triggerRegistry = new TriggerRegistry();
