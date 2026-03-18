// lib/pillRegistry.ts
const MAX_PILLS = 4;

export interface PillEntry {
  id: string;
  title: string;
  onRestore: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

const registry: PillEntry[] = [];
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((fn) => fn());
}

export function subscribe(fn: () => void): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export function getPills(): readonly PillEntry[] {
  return registry;
}

export function registerPill(entry: PillEntry): () => void {
  const existing = registry.findIndex((e) => e.id === entry.id);
  if (existing !== -1) registry.splice(existing, 1);
  registry.push(entry);
  while (registry.length > MAX_PILLS) registry.shift();
  notify();
  return () => unregisterPill(entry.id);
}

export function unregisterPill(id: string): void {
  const idx = registry.findIndex((e) => e.id === id);
  if (idx !== -1) { registry.splice(idx, 1); notify(); }
}