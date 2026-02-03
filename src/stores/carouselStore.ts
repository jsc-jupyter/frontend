import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Carousel {
  system: string;
  usercount: number;
  health: number;
  message: string;
}

interface CarouselMap {
  [system: string]: Carousel;
}

type CarouselStore = {
  carousels: Carousel[];
  setCarousels: (carousels: Carousel[]) => void;
};

type CarouselMapStore = {
  carouselMap: CarouselMap;
  setCarouselMap: (carouselMap: CarouselMap) => void;
  deleteCarousel: (system: string) => void;
  updateSingle: (system: string, data: Carousel) => void;
  updateMultiple: (updates: { system: string; data: Carousel }[]) => void;
};

export const useCarouselStore = create<CarouselStore>()(
  devtools((set) => ({
    carousels: [],
    setCarousels: (carousels: Carousel[]) => set({ carousels }),
  })),
);

export const useCarouselMapStore = create<CarouselMapStore>()(
  devtools((set) => ({
    carouselMap: {},
    setCarouselMap: (carouselMap: CarouselMap) => set({ carouselMap }),
    deleteCarousel: (system: string) =>
      set((state) => {
        const updatedMap = { ...state.carouselMap };
        delete updatedMap[system];
        return { carouselMap: updatedMap };
      }),
    updateSingle: (system: string, data: Carousel) =>
      set((state) => ({
        carouselMap: {
          ...state.carouselMap,
          [system]: data,
        },
      })),
    updateMultiple: (updates: { system: string; data: Carousel }[]) =>
      set((state) => {
        const updatedMap = { ...state.carouselMap };
        updates.forEach(({ system, data }) => {
          updatedMap[system] = data;
        });
        return { carouselMap: updatedMap };
      }),
  })),
);
