import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastPosition } from "./Toast";
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
    position: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
    duration: {
      control: { type: "number", min: 0, max: 10000, step: 1000 },
    },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: "Operation completed",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "An error occurred",
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    message: "Action cannot be undone",
    type: "warning",
  },
};

export const Info: Story = {
  args: {
    message: "Updates available",
    type: "info",
  },
};

export const WithCloseButton: Story = {
  args: {
    message: "Close manually",
    type: "info",
    showCloseButton: true,
  },
};

export const ShortDuration: Story = {
  args: {
    message: "Disappears in 2 seconds",
    type: "success",
    duration: 2000,
  },
};

export const ToastWithDifferentPositions = () => {
  const [position, setPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom-right');
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Position:</label>
        <select 
          value={position} 
          onChange={(e) => setPosition(e.target.value as ToastPosition)}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>
      
      <Toast
        message={`Toast at ${position}`}
        type="info"
        position={position}
        showCloseButton={true}
      />
    </div>
  );
};