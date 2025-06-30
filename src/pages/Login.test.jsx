import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

test("renders login button and inputs", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const loginButton = screen.getByText(/login/i);
  expect(loginButton).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@example.com" }
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "password123" }
  });

  fireEvent.click(loginButton);
});
