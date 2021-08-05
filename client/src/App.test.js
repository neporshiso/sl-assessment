import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('clicking buttons toggles the tables', async () => {
  render(<App />);

  await waitFor(
    () => expect(screen.getByTestId('Button1')).not.toBeDisabled(),
    {
      timeout: 5000,
    },
  );
  expect(screen.getByText('Level One Table')).toBeInTheDocument();
  let button = screen.getByTestId('Button1');
  await fireEvent.click(button);
  expect(screen.getByText('Level Two Table')).toBeInTheDocument();

  button = screen.getByTestId('Button2');
  await fireEvent.click(button);
  expect(screen.getByText('Level Three Table')).toBeInTheDocument();

  button = screen.getByTestId('Button3');
  await fireEvent.click(button);
  expect(screen.getByText('Level One Table')).toBeInTheDocument();
});
