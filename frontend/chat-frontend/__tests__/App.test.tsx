import {render, screen} from "@testing-library/react"
import {describe, expect, it} from "vitest"
import App from "../src/App";


describe("App component", () => {
    it("should display hello world", () => {
        render(<App/>)
        expect(screen.getByRole("heading", {name:/Hello world/i})).toBeInTheDocument();

    });
});