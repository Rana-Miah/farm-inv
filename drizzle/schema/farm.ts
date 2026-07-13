
import { integer, real, sqliteTable, text, } from "drizzle-orm/sqlite-core";

export const itemMasterTable = sqliteTable('ItemMaster', {
    barcode: text('barcode').primaryKey().notNull().unique(),
    item_number: text('item_number').notNull(),
    description: text('description').notNull(),
    uom: text('uom').notNull(),
    packing: integer('packing').notNull(),
    sales_price: real().notNull(),
    vendor: text('vendor').notNull(),
    vendor_code: text('vendor_code').notNull(),
    promo: text('promo', { enum: ['P', 'R'] }),
    cat3: text('cat3').notNull(),
    cat4: text('cat4').notNull()
})



export const inventoryTable = sqliteTable('ItemMaster', {
    barcode: text('barcode').primaryKey().notNull().unique(),
    uom: text('uom').notNull(),
    baruom: text('baruom').notNull(),
    packing: integer('packing').notNull(),
    quantity: integer('quantity').notNull(),
    title: text('title').notNull(),
    pflag: text('pflag')
})