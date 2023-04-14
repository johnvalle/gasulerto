import Sound from "react-native-sound";
import { create } from "zustand";

import { Nullable } from "@coreTypes/generics/nullable";

type BuzzerSound = {
  sound: Nullable<Sound>;
};

export type BuzzerSoundStore = {
  setSound: (sound: Sound) => void;
} & BuzzerSound;

const defaultState = { sound: null };

export const useBuzzerSoundStore = create<BuzzerSoundStore>()(set => ({
  ...defaultState,
  setSound: sound => set(prevState => ({ ...prevState, sound }))
}));
