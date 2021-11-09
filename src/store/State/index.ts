import { initialWebAudioState, WebAudioState } from "./WebAudioState";

export type State = {
  webAudio: WebAudioState;
};

export const initialState: State = {
  webAudio: initialWebAudioState,
};
