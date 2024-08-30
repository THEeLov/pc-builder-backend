/**
 * Toto sa bude posielať vždy ako query ked budete fetchovat
 * akukolvek komponentu.
 * Napr getMany v processore by pracovalo len so socketom...
 * Je to myslienka aby bol jednotny objekt pomocou ktoreho
 * vieme popisat request na akukolvek komponentu...
 */
type ComponentQuery = {
    socket?: string
    formFactor?: string
    ramSlots?: { gte: number }
    ramType?: string
    gpuInterface?: string
    storageBusType?: string
    powerIO?: number
    minPrice?: number
    maxPrice?: number
}

export default ComponentQuery
