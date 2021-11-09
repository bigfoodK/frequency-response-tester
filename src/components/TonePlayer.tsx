import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import useStore from "../store/useStore";

export default function TonePlayer() {
  const [state, update] = useStore();
  const { selectedChannel, context, oscillator, channelMerger } =
    state.webAudio;

  if (selectedChannel < 0) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Button
          onClick={() => {
            if (oscillator) {
              oscillator.stop();
              oscillator.disconnect();
              channelMerger?.disconnect();
              update((state) => {
                state.webAudio.oscillator = undefined;
                state.webAudio.channelMerger = undefined;
              });
              return;
            }

            const newChannelMerger = context.createChannelMerger(
              context.destination.channelCount
            );
            newChannelMerger.connect(context.destination);
            const newOscillator = context.createOscillator();
            newOscillator.connect(newChannelMerger, 0, selectedChannel);
            newOscillator.start();
            update((state) => {
              state.webAudio.oscillator = newOscillator;
              state.webAudio.channelMerger = newChannelMerger;
            });
          }}
        >
          tone
        </Button>
      </CardContent>
    </Card>
  );
}
