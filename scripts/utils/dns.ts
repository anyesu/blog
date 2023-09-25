import dns from 'node:dns';

export function useIpv6First() {
  dns.setDefaultResultOrder('verbatim');
}

export function useIpv4First() {
  dns.setDefaultResultOrder('ipv4first');
}
