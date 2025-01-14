import fetchURL from "../../utils/fetchURL";
import type { SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

type PoolData = {
  total_volume: number;
  daily_volume: number;
};

const fetch = (chain: string) => async (timestamp: number) => {
  const from = timestamp - 86400; // 60*60*24
  const to = timestamp;
  const stats: PoolData = (
    await fetchURL(
      `https://api.mantissa.finance/api/pool/stats/volume/${chain}/?from_timestamp=${from}&to_timestamp=${to}`
    )
  ).data;
  return {
    totalVolume: `${stats.total_volume}`,
    dailyVolume: `${stats.daily_volume}`,
    timestamp,
  };
};

const adapter: SimpleAdapter = {
  adapter: {
    [CHAIN.POLYGON]: {
      fetch: fetch("137"),
      start: async () => 1679309404,
    },
    [CHAIN.POLYGON_ZKEVM]: {
      fetch: fetch("1101"),
      start: async () => 1685355566,
    },
  },
};

export default adapter;
