# README.md

Live demo at <https://scrobit.herokuapp.com/>.

Frontend
- React

Backend
- Express used only for serving the JS bundle

## Getting started

Install [pnpm](https://pnpm.io/), or skip and use npm/yarn.

```shell
npm i -g pnpm
```

### Development env.

Run and serve the react app with vite.

```shell
cd frontend
pnpm i
pnpm dev  # and open http://localhost:3000
```

### Production env.

Serve using express.

```shell
cd frontend
pnpm i
pnpm build && mv public ..
cd ..
pnpm start  # and open http://localhost:3001
```
