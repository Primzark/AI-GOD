FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm i -g pnpm@9.6.0 || true
RUN if [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci; else npm i; fi
COPY . .
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","5173"]
