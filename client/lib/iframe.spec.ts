import { describe, expect, it } from "vitest";
import { getIframeSrc } from "./iframe";

describe("getIframeSrc", () => {
  it("returns no source until the iframe is allowed to load", () => {
    expect(getIframeSrc("https://example.com/embed", false)).toBeUndefined();
  });

  it("returns the embed source once loading is enabled", () => {
    expect(getIframeSrc("https://example.com/embed", true)).toBe("https://example.com/embed");
  });
});
