import {render, screen, waitFor} from "@testing-library/react"
import {describe, expect, it, vi} from "vitest"
import axios from "axios";
import userEvent from "@testing-library/user-event";
import MessageInput from "../src/components/MessageInput";


describe("MessageInput component", () => {
    const mockUser = { id: 1, name: "Andrew" };
    const mockRoom = { id: 101, name: "Room 1" };
    const mockMessage = { id: 10, message: "Hi!", user: mockUser, room: mockRoom };

    it("renders input and button", () => {
        render(<MessageInput user={mockUser} room={mockRoom} />);
        expect(screen.getByPlaceholderText(/enter a message/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    });

    it("updates input when user types", async () => {
        render(<MessageInput user={mockUser} room={mockRoom} />);
        const input = screen.getByPlaceholderText(/enter a message/i);
        await userEvent.type(input, "Hello");
        expect(input).toHaveValue("Hello");
    });

    it("sends message when clicking send button then cleats input field", async () => {
        const axiosSpy =
            vi.spyOn(axios, 'post').mockResolvedValue({ data: mockMessage });
        render(<MessageInput user={mockUser} room={mockRoom} />);

        const input = screen.getByPlaceholderText(/enter a message/i);
        const button = screen.getByRole("button", { name: /send/i });

        await userEvent.type(input, "Hello");
        await userEvent.click(button);

        await waitFor(() => {
            expect(axiosSpy).toHaveBeenCalledWith(
                "http://localhost:8080/api/messages",
                expect.objectContaining({
                    message: "Hello",
                    user: mockUser,
                    room: mockRoom,
                })
            );
        });

        expect(input).toHaveValue("");
    });

});