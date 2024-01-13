import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should sign in succesfully", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(
    page.getByRole("heading", { name: "Sign in to your account" })
  ).toBeVisible();

  await page.locator("[name=email]").fill("testman@gmail.com");
  await page.locator("[name=password]").fill("testman");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Success!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create One" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Create an Account",
    })
  ).toBeVisible();

  await page.locator("[name=username]").fill("test_un");
  await page.locator("[name=email]").fill("test_em@gmail.com");
  await page.locator("[name=password]").fill("test_p");
  await page.locator("[name=confirmPassword]").fill("test_p");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
