import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import ProjectAuthForm from '@/components/ProjectAuthForm'

describe('ProjectAuthForm', () => {
  it('renders the authentication form fields', () => {
    render(<ProjectAuthForm />)

    expect(screen.getByRole('heading', { name: /session login/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /operator id/i })).toHaveAttribute(
      'placeholder',
      'gm@dragonsight'
    )
    expect(screen.getByLabelText(/access phrase/i)).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: /authenticate/i })).toBeInTheDocument()
  })

  it('updates field state and shows access denied after submit', async () => {
    const user = userEvent.setup()

    render(<ProjectAuthForm />)

    await user.type(screen.getByRole('textbox', { name: /operator id/i }), 'choom')
    await user.type(screen.getByLabelText(/access phrase/i), 'bad-pass')
    await user.click(screen.getByRole('button', { name: /authenticate/i }))

    expect(screen.getByRole('textbox', { name: /operator id/i })).toHaveValue('choom')
    expect(screen.getByLabelText(/access phrase/i)).toHaveValue('bad-pass')
    expect(screen.getByText(/access denied/i)).toBeInTheDocument()
  })
})
