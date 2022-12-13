import { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, RootState } from "../app/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}
// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptionsWithSession extends ExtendedRenderOptions {
  session?: Session | null;
}

export function renderWithProvider(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
export function renderWithProviderAndSessionProvider(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    preloadedState = {},
    store = makeStore(preloadedState),
    session = null,
    ...renderOptions
  }: ExtendedRenderOptionsWithSession = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
