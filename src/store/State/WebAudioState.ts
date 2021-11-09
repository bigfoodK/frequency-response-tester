export type WebAudioState = {
  context: AudioContext;
  channelCount: number;
  selectedChannel: number;
  oscillator?: OscillatorNode;
  channelMerger?: ChannelMergerNode;
};

export const initialWebAudioState: WebAudioState = {
  context: new AudioContext(),
  selectedChannel: -1,
  channelCount: 0,
};
