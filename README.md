# RFID Fridge Cards

## Getting Started

First, you need to initialize a database:

```
npx prisma generate
npx prisma db push
```

If you change the schema, you'll need to run it again.

### Development

You can host a hot-reload server locally with:

```
npm run dev
```

Chances are you don't have an RFID sensor hooked up, so just log in to a demo account by tapping the corners of the start screen in a clockwise order.

### Production

Build and run the production copy with:

```
npm run build
npm start
```