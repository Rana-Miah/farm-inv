import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './drizzle/schema/index.ts',
    out: './drizzle/migration',
    dialect: 'sqlite',
    driver: 'expo', // <--- very important
});
