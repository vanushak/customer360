import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalErrorAlert from '../ErrorAlert'

// Test to ensure the modal displays when a message is passed
test('should render the modal with error message', () => {
  const errorMessage = 'Something went wrong!';

  // Render the ModalErrorAlert component with the error message
  render(<ModalErrorAlert message={errorMessage} onClose={() => {}} />);

  // Check if the error message is rendered
  expect(screen.getByText('Error')).toBeInTheDocument();
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

// Test to ensure the modal does not render when no message is passed
test('should not render the modal if no message is passed', () => {
  // Render the ModalErrorAlert component without a message
  const { container } = render(<ModalErrorAlert message="" onClose={() => {}} />);

  // The modal should not be rendered, so the container should be empty
  expect(container.firstChild).toBeNull();
});

// Test to check if the close button works
test('should close the modal when close button is clicked', () => {
  const errorMessage = 'Something went wrong!';
  const onClose = jest.fn(); // Mock function for onClose

  // Render the ModalErrorAlert component with the error message
  render(<ModalErrorAlert message={errorMessage} onClose={onClose} />);

  // Simulate a click on the close button
  fireEvent.click(screen.getByText('Close'));

  // Ensure that the onClose function is called
  expect(onClose).toHaveBeenCalledTimes(1);
});

// Test to check if the close icon works
test('should close the modal when close icon is clicked', () => {
  const errorMessage = 'Something went wrong!';
  const onClose = jest.fn(); // Mock function for onClose

  // Render the ModalErrorAlert component with the error message
  render(<ModalErrorAlert message={errorMessage} onClose={onClose} />);

  // Simulate a click on the close icon (×)
  fireEvent.click(screen.getByText('×'));

  // Ensure that the onClose function is called
  expect(onClose).toHaveBeenCalledTimes(1);
});
