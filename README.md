## Mid Market ADMIN WEB

This is the repository for Mid Market admin platform

## TECHNOLOGIES

- Next.js
- Typescript
- Material UI
- Redux Toolkit
- Axios

## CODE GUIDELINES

Please make sure your code is neat and clean before committing and/or sending PR/MRs. Always ensure that `yarn build` is running fine before pushing.

### COMPONENTS AND PAGES

Always make sure to stay consistent with the existing file naming standards and conventions.

- use `lowercase-kebab-case` for react components and folders
- use `lowercase-kebab-case` for new pages under `app` dir
- use `lowercase-kebab-case` for static assets under `public` dir

Also make sure to import/call from right places whenever needed.

- the `app` dir should only have imports from `sections`
- the `app` dir should only be concerned with route level stuff, like adding auth/guest guards, and meta titles and descriptions, it shouldn't have any specific view logic, that belongs to `sections`, overall every `page.tsx` under `app` dir should be under 50 LOC or less
- the `app` dir should have layout logic, but the actual implementation should be imported from `layouts` dir

- the `sections` dir should only have imports from `components`, `hooks` or other directories
- the `sections` dir should have most of the logic related to the specific page
- the `sections` dir should have files each having under 300 LOC, if a file is becoming larger, divide it into multiple sections in the same sections subdirectory (example: `sections/user-profile` subdir can have `user-header.tsx` and `user-footer.tsx`)

- the `components` dir should always be independent having minimal imports (only import from libraries like `@mui/material`)
- the `components` dir should have generic view logic not related to any specific page (avoid using stuff like `next/navigation`)
- each file in `components` dir should be under 200 LOC

### ICONS AND ILLUSTRATIONS

Follow these steps when adding/editing icons and illustrations

1. if the icon or illustration is too small (maximum 3-4 paths) and/or requires dynamic coloring logic (change path fill/color based on theme) then make it a react functional component under the `src/assets/icons` or `src/assets/illustrations` folder
2. if the icon or illustration is too large (more than 5-6 paths) and/or is static and doesn't dynamically change the colors, then it should be a .svg file (if possible, otherwise .webp) under the `public/assets/icons` or `public/assets/illustrations` folder

## NODE.JS

- Node 16.x || 18.x

## USING YARN (Recommend)

- yarn install
- yarn dev
