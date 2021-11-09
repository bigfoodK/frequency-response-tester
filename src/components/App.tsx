import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import useStore from "../store/useStore";
import ChannelSelector from "./ChannelSelector";
import TonePlayer from "./TonePlayer";

export default function App() {
  const [state, update] = useStore();

  useEffect(() => {
    update((state) => {
      const { webAudio } = state;
      const { context } = webAudio;
      context.destination.channelCount = context.destination.maxChannelCount;
      webAudio.channelCount = context.destination.channelCount;
    });
  }, [state.webAudio.context]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ChannelSelector />
      </Grid>
      <Grid item xs={12}>
        <TonePlayer />
      </Grid>
    </Grid>
  );
}
