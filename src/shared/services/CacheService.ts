import { createClient, RedisClientType } from "redis";

class CacheService {
  private client: RedisClientType;
  private isConnected = false;

  constructor() {
    const redisHost = process.env.REDIS_HOST || "localhost";
    const redisPort = process.env.REDIS_PORT || "6379";

    this.client = createClient({
      url: `redis://${redisHost}:${redisPort}`,
    });

    this.client.on("error", (err) => console.error("Redis Client Error", err));

    this.connect();
  }

  private async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log("✅ Connected to Redis.");
    }
  }

  async get(key: string): Promise<any | null> {
    try {
      const data = await this.client.get(key);

      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data from Redis for key ${key}`, error);

      return null;
    }
  }

  async set(
    key: string,
    value: any,
    expirationTimeInSeconds: number = 3600
  ): Promise<void> {
    try {
      const data = JSON.stringify(value);

      await this.client.set(key, data, { EX: expirationTimeInSeconds });
    } catch (error) {
      console.error(`Error setting data to Redis for key ${key}`, error);
    }
  }

  async invalidate(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Error invalidating data from Redis for key ${key}`, error);
    }
  }
}

export default new CacheService();
