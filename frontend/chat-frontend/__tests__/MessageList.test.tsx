import axios from "axios";
import {describe, expect, it, vi} from "vitest"
import MessageList from "../src/components/MessageList";
import {render, screen, waitFor} from "@testing-library/react"


describe("MessageList component", () => {

    const mockMessages = [
        { id: 1, message: "Hello", user: { id: 1, name: "Alice" } },
        { id: 2, message: "Hi there!", user: { id: 2, name: "Bob" } },
    ];


    it("fetches message on mount", async ()=>{
        const mockedAxios= vi.spyOn(axios, 'get').mockResolvedValue({data:mockMessages});
        render(<MessageList roomId={1} userId={1}/>);

        await waitFor(() => {
            expect(mockedAxios).toHaveBeenCalledWith("http://localhost:8080/api/messages/1");
        });
    })

    it("renders messages after mounting", async ()=>{
        const mockedAxios= vi.spyOn(axios, 'get').mockResolvedValue({data:mockMessages});
        render(<MessageList roomId={1} userId={1}/>);

        await waitFor(() => {
            expect(screen.getByText("Alice: Hello")).toBeInTheDocument();
            expect(screen.getByText("Bob: Hi there!")).toBeInTheDocument();
        });
    })

    it("renders buttons for editing and deleting if it belongs to user", async ()=> {
        const mockedAxios= vi.spyOn(axios, 'get').mockResolvedValue({data:mockMessages});
        render(<MessageList roomId={1} userId={1}/>);

        await waitFor(() => {
            expect(screen.getByText("Alice: Hello")).toBeInTheDocument();
            expect(screen.getByText("Bob: Hi there!")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByRole("button", {name: /edit/i})).toBeInTheDocument();
            expect(screen.getByRole("button", {name: /delete/i})).toBeInTheDocument();
        });
    })

})