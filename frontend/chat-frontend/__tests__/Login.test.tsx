import {render, screen, waitFor} from "@testing-library/react"
import {describe, expect, it, vi} from "vitest"
import Login from "../src/components/Login";
import {User} from "../src/types/User";
import axios from "axios";
import userEvent from "@testing-library/user-event";


describe("Login component", () => {
    it("renders the login form", () => {
        const mockOnLogin = vi.fn();
        render(<Login onLogin={mockOnLogin} />);

        expect(screen.getByPlaceholderText("Enter you name!")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /go!/i })).toBeInTheDocument();
    });

    it("updates input value when typing", async () => {
        const mockOnLogin = vi.fn();
        render(<Login onLogin={mockOnLogin} />);

        const input = screen.getByPlaceholderText("Enter you name!") as HTMLInputElement;
        await userEvent.type(input, "Andrew")

        expect(input.value).toBe("Andrew");
    });

    it("submits the form and calls onLogin function", async () => {
        const mockOnLogin = vi.fn();
        const mockUser: User = { id: 1, name: "Andrew" };

        const axiosSpy = vi.spyOn(axios, 'post').mockResolvedValue({ data: mockUser });

        render(<Login onLogin={mockOnLogin} />);

        const input = screen.getByPlaceholderText("Enter you name!");
        const button = screen.getByRole("button", { name: /go!/i });

        await userEvent.type(input, "Andrew")
        await userEvent.click(button)

        await waitFor(() => {
            expect(axiosSpy).toHaveBeenCalledWith(
                'http://localhost:8080/api/user',
                { name: "Andrew" }
            );
            expect(mockOnLogin).toHaveBeenCalledWith(mockUser);
        });
    });
});