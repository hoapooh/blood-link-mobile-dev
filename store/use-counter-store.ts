import { create } from "zustand";

interface CounterState {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
	updateBears: (newBears: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
	bears: 0,
	increasePopulation: () => set((state: CounterState) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
	updateBears: (newBears: number) => set({ bears: newBears }),
}));
