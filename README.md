## 🛠 Project Setup Commands

এই প্রজেক্টে TypeScript এবং Express ব্যবহার করার জন্য নিচের কমান্ডগুলো রান করতে হবে:

```bash
# 1. Initialize NPM
npm init -y

# 2. Install TypeScript
npm i -D typescript

# 3. Create tsconfig.json
npx tsc --init

# 4. Install Express
npm i express

# 5. Install Express Types (for TypeScript)
npm i --save-dev @types/express

# 6. Install ts-node-dev (for running TS server)
npm i ts-node-dev

or

npm i -D tsx
package.json: "npx tsx watch ./src/server.ts"

# 7. Install dotenv (for environment variables)
npm i dotenv
```

✅ এখন তুমি `TypeScript + Express Server` তৈরি করার জন্য পুরোপুরি রেডি।
