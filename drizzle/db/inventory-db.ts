import { ensureDbDir } from "@/lib/expo-file-system";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("inventory.db", { enableChangeListener: true }, ensureDbDir().uri);
export const inventoryDb = drizzle(expo);
