import React, { Component, ReactNode } from "react";
import { initialState, State } from "./State";
import produce, { createDraft, finishDraft } from "immer";
import { context } from "./context";

type ProviderProps = {
  children: ReactNode;
};

type ProviderState = State;

export default class Provider extends Component<ProviderProps, ProviderState> {
  private stateBuffer: State = initialState;

  constructor(props: ProviderProps) {
    super(props);
    this.state = initialState;
    this.update = this.update.bind(this);
  }

  private async update(updater: (state: State) => void | Promise<void>) {
    const draft = createDraft(this.stateBuffer);
    await updater(draft);
    const newState = finishDraft(draft);
    this.stateBuffer = newState;
    this.setState(newState);
  }

  render() {
    return (
      <context.Provider value={[this.state, this.update]}>
        {this.props.children}
      </context.Provider>
    );
  }
}
