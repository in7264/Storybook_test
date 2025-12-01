import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel']
    },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username'
  }
}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  }
}

export const WithClear: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    clearable: true
  }
}

export const NumberInput: Story = {
  args: {
    type: 'number',
    label: 'Age',
    placeholder: 'Enter your age',
    min: 0,
    max: 120
  }
}

export const EmailInput: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email'
  }
}

export const DisabledInput: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit this field',
    value: 'Read-only value',
    disabled: true
  }
}

export const InputWithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter valid email',
    value: 'invalid-email',
    error: 'Please enter a valid email address'
  }
}

export const InputWithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    value: 'validuser',
    success: true
  }
}

export const PhoneInput: Story = {
  args: {
    type: 'tel',
    label: 'Phone Number',
    placeholder: '+1 (123) 456-7890'
  }
}