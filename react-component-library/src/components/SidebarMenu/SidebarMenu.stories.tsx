import type { Meta, StoryObj } from "@storybook/react";
import { SidebarMenu, type MenuItem } from "./SidebarMenu";
import { useState } from 'react';

const meta: Meta<typeof SidebarMenu> = {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

const flatItems: MenuItem[] = [
  { id: "1", label: "Dashboard", icon: "📊" },
  { id: "2", label: "Profile", icon: "👤" },
  { id: "3", label: "Settings", icon: "⚙️" },
];

const nestedItems: MenuItem[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: "📊",
  },
  {
    id: "2",
    label: "Products",
    icon: "📦",
    children: [
      { id: "2-1", label: "All Products" },
      { id: "2-2", label: "Categories" },
    ],
  },
  {
    id: "3",
    label: "Customers",
    icon: "👥",
    children: [
      { id: "3-1", label: "List" },
      {
        id: "3-2",
        label: "Analytics",
        children: [
          { id: "3-2-1", label: "Report" },
          { id: "3-2-2", label: "Stats" },
        ],
      },
    ],
  },
];

export const Closed: Story = {
  args: {
    items: flatItems,
    isOpen: false,
    onClose: () => console.log("closed"),
  },
};

export const Open: Story = {
  args: {
    items: flatItems,
    isOpen: true,
    onClose: () => console.log("closed"),
  },
};

export const Nested: Story = {
  args: {
    items: nestedItems,
    isOpen: true,
    onClose: () => console.log("closed"),
  },
};

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{ 
          padding: '8px 16px', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Open Menu
      </button>
      
      <p style={{ marginTop: '10px' }}>Click outside menu to close</p>

      <SidebarMenu
        items={nestedItems}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};