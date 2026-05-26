import redis from "../config/redis.js";

export async function cacheGet(key) {
  const val = await redis.get(key);
  return val ? JSON.parse(val.toString()) : null;
}

export async function cacheSet(key, value, ttlSeconds = 3600) {
  await redis.setEx(key, ttlSeconds, JSON.stringify(value));
}

export async function cacheDel(key) {
  await redis.del(key);
}

export async function cacheGetOrSet(key, fetchFn, ttlSeconds = 3600) {
  const cached = await cacheGet(key);
  if (cached !== null) return cached;
  const value = await fetchFn();
  await cacheSet(key, value, ttlSeconds);
  return value;
}
