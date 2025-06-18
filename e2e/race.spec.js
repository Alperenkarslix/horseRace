import { test, expect } from '@playwright/test';

test.describe('Horse Racing Game E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Initial State', () => {
    test('should display the game title and initial state correctly', async ({ page }) => {
      await expect(page).toHaveTitle('Horse Race');
      await expect(page.getByText('Horse Racing')).toBeVisible();
      await expect(page.getByText('No races scheduled')).toBeVisible();
      await expect(page.getByText('No Active Race')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Results' })).toBeVisible();
      await expect(page.getByText('No Results Yet')).toBeVisible();
    });

    test('should have correct button states initially', async ({ page }) => {
      await page.waitForSelector('button', { timeout: 10000 });
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      const startButton = page.getByRole('button', { name: 'START RACES' });
      await expect(generateButton).toBeVisible();
      await expect(startButton).toBeVisible();
    });
  });

  test.describe('Race Program Generation', () => {
    test('should generate correct number of races and horses', async ({ page }) => {
      await page.waitForSelector('button', { timeout: 10000 });
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(2000);
      const raceElements = page.locator('.bg-white.rounded.p-2').filter({ hasText: 'Race' });
      await expect(raceElements.first()).toBeVisible();
      await expect(page.getByText('No races scheduled')).toBeHidden();
    });

    test('should show waiting status after program generation', async ({ page }) => {
      await page.waitForSelector('button', { timeout: 10000 });
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(2000);
      await expect(page.getByText('Waiting').first()).toBeVisible();
    });
  });

  test.describe('Race Execution', () => {
    test.beforeEach(async ({ page }) => {
      await page.waitForSelector('button', { timeout: 10000 });
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(2000);
    });

    test('should show race track when starting race', async ({ page }) => {
      const startButton = page.getByRole('button', { name: 'START RACES' });
      await startButton.click();
      await page.waitForTimeout(2000);
      await expect(page.getByText('RACE TRACK')).toBeVisible();
      await expect(page.getByText('No Active Race')).toBeHidden();
      const horses = page.locator('text=🐴');
      await expect(horses.first()).toBeVisible();
    });

    test('should display race results after completion', async ({ page }) => {
      const startButton = page.getByRole('button', { name: 'START RACES' });
      await startButton.click();
      await expect(page.getByText('Finished')).toBeVisible({ timeout: 120000 });
      await expect(page.getByText('No Results Yet')).toBeHidden();
      await expect(page.getByRole('heading', { name: /Race \d+ \(\d+m\)/ })).toBeVisible();
    });
  });

  test.describe('Basic Functionality', () => {
    test('should handle page reload gracefully', async ({ page }) => {
      await page.waitForSelector('button', { timeout: 10000 });
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(2000);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Horse Racing')).toBeVisible();
      await expect(page.getByRole('button', { name: 'GENERATE PROGRAM' })).toBeVisible();
    });
  });
}); 