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
      await expect(page.getByRole('button', { name: 'GENERATE PROGRAM' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'START RACES' })).toBeVisible();
    });
  });

  test.describe('Race Program Generation', () => {
    test('should generate program and show race items on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForLoadState('networkidle');
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(3000);
      const programPanel = page.locator('.hidden.md\\:flex');
      await expect(programPanel.locator('[data-test="race-item"]').first()).toBeVisible({ timeout: 10000 });
    });

    test('should generate program and show race items on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForLoadState('networkidle');      
      await page.locator('button:has-text("📋 Program")').click();
      await page.waitForTimeout(500);
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(3000);
      const mobilePanel = page.locator('.md\\:hidden');
      await expect(mobilePanel.locator('[data-test="race-item"]').first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Race Execution', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForLoadState('networkidle');
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(3000);
    });

    test('should start races and show horses', async ({ page }) => {
      const startButton = page.getByRole('button', { name: 'START RACES' });
      await startButton.click();
      await page.waitForTimeout(2000);
      await expect(page.getByText('No Active Race')).toBeHidden();
      await expect(page.getByRole('button', { name: 'PAUSE' })).toBeVisible();
    });

    test('should complete races and show results', async ({ page }) => {
      const startButton = page.getByRole('button', { name: 'START RACES' });
      await startButton.click();
      const programPanel = page.locator('.hidden.md\\:flex');
      await expect(programPanel.locator('[data-test="race-status"]').filter({ hasText: 'Finished' }).first()).toBeVisible({ timeout: 120000 });
      const resultsPanel = page.locator('.hidden.md\\:flex');
      const resultItems = resultsPanel.locator('[data-test="result-item"]');
      await expect(resultItems).toHaveCount(1);
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport with tabs', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('🏁 Track')).toBeVisible();
      await expect(page.getByText('🐴 Horses')).toBeVisible();
      await expect(page.locator('button:has-text("📋 Program")')).toBeVisible();
      await expect(page.getByText('🏆 Results')).toBeVisible();
      await page.getByText('🐴 Horses').click();
      await page.waitForTimeout(500);
      const mobilePanel = page.locator('.md\\:hidden');
      await expect(mobilePanel.locator('[data-test="horse-item"]').first()).toBeVisible();
      await page.locator('button:has-text("📋 Program")').click();
      await page.waitForTimeout(500);
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(3000);
      
      await expect(mobilePanel.locator('[data-test="race-item"]').first()).toBeVisible();
    });

    test('should work on desktop viewport with all panels', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.waitForLoadState('networkidle');
      await expect(page.getByRole('heading', { name: 'Horse List (1-20)' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Program' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Results' })).toBeVisible();
      const desktopPanel = page.locator('.hidden.md\\:flex');
      await expect(desktopPanel.locator('[data-test="horse-item"]').first()).toBeVisible();
      await expect(page.getByText('🏁 Track')).toBeHidden();
    });
  });

  test.describe('Basic Functionality', () => {
    test('should handle page reload gracefully', async ({ page }) => {
      const generateButton = page.getByRole('button', { name: 'GENERATE PROGRAM' });
      await generateButton.click();
      await page.waitForTimeout(2000);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Horse Racing')).toBeVisible();
      await expect(page.getByRole('button', { name: 'GENERATE PROGRAM' })).toBeVisible();
    });

    test('should switch tabs properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForLoadState('networkidle');
      const trackTab = page.getByText('🏁 Track');
      await expect(trackTab).toHaveClass(/bg-blue-500/);      
      await page.getByText('🐴 Horses').click();
      await page.waitForTimeout(300);
      const horsesTab = page.getByText('🐴 Horses');
      await expect(horsesTab).toHaveClass(/bg-blue-500/);
      await expect(trackTab).toHaveClass(/bg-gray-100/);
    });
  });
}); 