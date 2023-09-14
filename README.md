# React boilerplate

## Setup project
1. Install dependencies
```bash
npm i
```
2. Fill `.env` files in `env` folder with actual values
3. Change `name` in `package.json` to actual project name in kebab-case if it is not


4. Run development server (uses `dev` mode by default)
```bash
npm start
```

## Build project
There are 3 build modes: `dev`, `stage` and `prod`. Each mode has own `.env` file in `env` folder. To build project in specific mode run:
```bash
npm run build-dev
npm run build-stage
npm run build-prod
```
Result will be in `build` folder.

## Git

### Branch
Describe branch as `TASK_KEY/SHORT_NAME`
- `TASK_KEY` - project prefix + task number (e.g. AVA017)
- `SHORT_NAME` - description of the task

Example:

`AVA0017/create-sign-up-screen`

### Commit
Describe commit as `TASK_KEY`: `SHORT_DESCRIPTION`

Example:

`AVA0017: make sign up layout`

## Deployment

There are 3 git branches: `dev`, `stage` and `master`. Each branch has own deploy environment: `development`, `staging`, `production`.
