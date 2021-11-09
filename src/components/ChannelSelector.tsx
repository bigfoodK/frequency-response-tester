import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import useStore from "../store/useStore";

export default function ChannelSelector() {
  const [state, update] = useStore();
  const { channelCount, selectedChannel } = state.webAudio;

  const menuItems: JSX.Element[] = [];
  for (let channel = 0; channel < channelCount; channel++) {
    menuItems.push(
      <MenuItem key={`ChannelSelector-menuItem-${channel}`} value={channel}>
        {channel}
      </MenuItem>
    );
  }

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel>Channel</InputLabel>
          <Select
            label="Channel"
            value={selectedChannel || 0}
            onChange={(event) => {
              const value = event.target.value;
              if (typeof value !== "number") {
                return;
              }
              update((state) => (state.webAudio.selectedChannel = value));
            }}
          >
            {menuItems}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
