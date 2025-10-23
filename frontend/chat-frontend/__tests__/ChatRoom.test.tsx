import { render, screen } from "@testing-library/react";
import ChatRoom from "../src/components/ChatRoom";
import { vi } from "vitest";

// Mock react-router-dom's useNavigate
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => navigateMock
    };
});

vi.mock("../src/components/MessageList", () => ({
    default: ({ roomId }: { roomId: number }) => (
        <div data-testid="message-list">MessageList for room {roomId}</div>
    ),
}));

vi.mock("../src/components/MessageInput", () => ({
    default: ({ user, room }: any) => (
        <div data-testid="message-input">
            MessageInput for {user.name} in {room.name}
        </div>
    ),
}));


describe("ChatRoom component", () => {
    const mockUser = { id: 1, name: "Andrew" };
    const mockRoom = { id: 101, name: "Room 1" };

    it("renders room name and welcome message", () => {
        render(<ChatRoom user={mockUser} room={mockRoom} />);

        expect(screen.getByText("Room: Room 1")).toBeInTheDocument();
        expect(screen.getByText("Welcome Andrew!")).toBeInTheDocument();
    });

    it("renders MessageList and MessageInput with correct props", () => {
        render(<ChatRoom user={mockUser} room={mockRoom} />);

        expect(screen.getByTestId("message-list")).toHaveTextContent("room 101");
        expect(screen.getByTestId("message-input")).toHaveTextContent("Andrew");
        expect(screen.getByTestId("message-input")).toHaveTextContent("Room 1");
    });
});
