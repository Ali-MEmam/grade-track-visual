import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display dashboard title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /welcome back, principal smith/i })).toBeVisible();
    await expect(page.getByText(/here's what's happening at your school today/i)).toBeVisible();
  });

  test('should display stats overview cards', async ({ page }) => {
    await expect(page.getByText('Total Students')).toBeVisible();
    await expect(page.getByText('Total Teachers')).toBeVisible();
    await expect(page.getByText('Active Classes')).toBeVisible();
    await expect(page.getByText('Attendance Rate')).toBeVisible();
  });

  test('should display sidebar navigation', async ({ page }) => {
    await expect(page.getByText('EduDash')).toBeVisible();
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /students/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /teachers/i })).toBeVisible();
  });

  test('should display quick actions', async ({ page }) => {
    await expect(page.getByText('Quick Actions')).toBeVisible();
    await expect(page.getByRole('button', { name: /add student/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /create class/i })).toBeVisible();
  });

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText('Recent Activity')).toBeVisible();
    await expect(page.getByText('New Student Enrolled')).toBeVisible();
  });

  test('should display attendance chart', async ({ page }) => {
    await expect(page.getByText('Weekly Attendance Overview')).toBeVisible();
  });
});