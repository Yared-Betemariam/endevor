import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "Sign in to your account" })
  ).toBeVisible();

  await page.locator("[name=email]").fill("testman@gmail.com");
  await page.locator("[name=password]").fill("testman");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Success!")).toBeVisible();
});

test("should save post successufully", async ({ page }) => {
  await page.goto(`${UI_URL}add-post`);

  await page.locator('[name="name"]').fill("Testman");
  await page
    .locator('[name="description"]')
    .fill("This is a test Web Project created");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Web Project").click();

  await page.setInputFiles('[name="imageUrls"]', [
    path.join(__dirname, "files", "one.png"),
    path.join(__dirname, "files", "two.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Post Saved")).toBeVisible();
});
