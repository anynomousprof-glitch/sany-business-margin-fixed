# Sany's Business Margin — Phase 2 starter

Mobile-first toy shop management app built with HTML, CSS, JavaScript, Vite and Capacitor. The Phase 2 build adds customer and supplier ledgers, supplier restock payables, customer due collection, display/damaged stock fields, dead-stock warnings, age-group filtering, POS add-ons and monthly reports.

## What works in this starter
- Five-tab responsive mobile interface.
- Eight sample toys, demo sales, expenses, customer and supplier.
- Dashboard sales, profit, stock value and outstanding due.
- Inventory add/edit, age-group filter and carton × pieces restock.
- Supplier selection on restock, payable calculation and supplier payment history.
- POS cart, cash/bKash/Nagad/card/due payment, optional customer, gift-wrap and battery add-ons.
- Customer ledger, receive-payment action and customer payment history storage.
- Open display and damaged-box counters.
- Dead-stock warning for items with no sale recorded in 60+ days.
- Expense tracker, monthly summary, CSV export and JSON backup/restore.
- English/Bangla language toggle, light/dark mode.
- Local browser storage through IndexedDB and service-worker caching.
- GitHub Actions workflow to build a debug APK in the cloud.

## Build using an Android phone only
You do not need Android Studio on the phone. Use a GitHub repository and the included Actions workflow to build the APK on GitHub-hosted Ubuntu runners.

1. Sign in to GitHub in your phone browser and create a **private** repository named `sany-business-margin`.
2. Upload the contents of this project ZIP into the repository. Make sure `.github/workflows/android-apk.yml` is included (GitHub's web upload may require uploading the workflow folder too).
3. Open the repository's **Actions** tab and enable workflows if prompted.
4. Run **Build Android APK** using **Run workflow**, or push a commit to `main`.
5. Wait for the workflow to finish successfully. Open the completed run, scroll to **Artifacts**, and download `sany-business-margin-debug-apk`.
6. Extract the artifact ZIP on your phone. It contains `app-debug.apk`. Install it after reviewing Android's install-from-this-source permission prompt.

## Local development (PC)
- Install Node.js 20+.
- `npm install`
- `npm run start`
- `npm run build`
- `npx cap add android` (first time only)
- `npx cap sync android`

## Important production limitations
This is a Phase 2 functional prototype, not a finished production accounting app. The current offline database is IndexedDB inside the web app, not encrypted SQLite. Before real business use, migrate to Capacitor SQLite with tested schema migrations and backup/restore. Also implement and test native barcode scanning/torch/haptics, camera photo attachments, PDF receipt sharing, Bluetooth thermal printing, biometric/PIN security, staff/owner authorization, full transaction audit logs, encrypted cloud sync and automated tests. The current app does not yet provide those native capabilities. The debug APK is for testing; a release APK/AAB requires a securely managed signing key and release build configuration.

## Accounting rules
- Gross profit = sum of (sale unit price − recorded unit cost) × quantity.
- Net profit = gross profit − recorded operating expenses.
- Customer due = outstanding balance on customer records plus unassigned sale dues in the dashboard's sales total.
- Supplier payable = opening payable + restock bill − recorded supplier payments.
- Stock value = current quantity × current unit cost.
- Add-on prices are currently demo defaults: gift wrap ৳30 and extra batteries ৳50. Adjust these in `app.js` for your shop.

Sample records are illustrative. Export a backup before testing destructive changes.
