import {render, screen, waitFor} from "@testing-library/react"
import {describe, expect, it, vi} from "vitest"
import axios from "axios";
import userEvent from "@testing-library/user-event";
import Rooms from "../src/components/Rooms";
import {Room} from "../src/types/Room";

// Mock react-router-dom's useNavigate
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => navigateMock
    };
});

const mockRooms: Room[] = [
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" }
];



describe("Rooms component", () => {

    beforeEach(() => {
        navigateMock.mockReset();
    });


    it("renders the heading and empty list initially", () => {
        vi.spyOn(axios, 'get')
            .mockResolvedValue({data:[]})
        const mockOnRoomSelect = vi.fn();
        render(<Rooms onRoomSelect={mockOnRoomSelect} />);

        expect(screen.getByText("Room List")).toBeInTheDocument();
        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("fetches rooms from backend API and displays them", async () => {
        const axiosSpy = vi.spyOn(axios, 'get')
            .mockResolvedValue({data: mockRooms});
        const mockOnRoomSelect = vi.fn();
        render(<Rooms onRoomSelect={mockOnRoomSelect} />);

        await waitFor(() => {
            expect(screen.getByText("Room 1")).toBeInTheDocument();
            expect(screen.getByText("Room 2")).toBeInTheDocument();
        });

        expect(axiosSpy).toHaveBeenCalledWith(
            "http://localhost:8080/api/rooms"
        );
    });

    it("clicking on a room calls onRoomSelect and navigates to the room", async () => {
        const axiosSpy = vi.spyOn(axios, 'get')
            .mockResolvedValue({data: mockRooms});
        const mockOnRoomSelect = vi.fn();
        render(<Rooms onRoomSelect={mockOnRoomSelect} />);

        const room = await screen.findByText("Room 1");

        await userEvent.click(room);

        expect(mockOnRoomSelect).toHaveBeenCalledWith({id:1, name:"Room 1"});
        expect(navigateMock).toHaveBeenCalledWith("/rooms/1");

    })

});