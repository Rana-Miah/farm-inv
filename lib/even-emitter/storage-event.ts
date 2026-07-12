import EventEmitter from "eventemitter3"

export const storageEvent = new EventEmitter<{ permissionChanged: [] }>()