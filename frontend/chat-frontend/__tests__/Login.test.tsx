import {render, screen} from "@testing-library/react"
import {describe, expect, it} from "vitest"
import Login from "../src/components/Login";


describe("Login component", () => {
    beforeEach(()=>{
        render(<Login/>)
    })
    it("should display login form title", () => {
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should have input field", () => {
        expect(screen.getByRole(""))
    })
});