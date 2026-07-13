import { ensureDbDir } from "@/lib/expo-file-system";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("Farm.db", undefined, ensureDbDir().uri);
export const farmDb = drizzle(expo);
