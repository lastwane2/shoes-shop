    import { create } from "zustand"


    export const useStore = create((set) => ({
        productsOnPage: [],
        loadProducts: (data) => set({ productsOnPage: data }),

        dataFetched: false,
        setDataFetched: (data) => set({ dataFetched: data }),
    }));