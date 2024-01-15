import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { StoreProviderDecorator } from "./StoreProviderDecorator";
const meta = {
  title: "Todolists/app",
  component: App,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [StoreProviderDecorator],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
