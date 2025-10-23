import { render, screen} from "@testing-library/react";
import { describe, it, vi} from "vitest";
import App from "../src/App";


describe("App component", () => {
    it("renders Login on page load when no user is present", () => {
        render(<App />);
        expect(screen.getByRole("heading", {name: /login/i})).toBeInTheDocument();
    });

});
