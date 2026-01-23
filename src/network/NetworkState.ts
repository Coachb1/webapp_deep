let online = true;

export function setNetworkState(state: boolean) {
  online = state;
}

export function getNetworkState() {
  return online;
}
