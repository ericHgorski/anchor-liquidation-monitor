# anchor-liquidation-monitor

### Install

```bash
   yarn install
```

### Run Service (Production)
```bash
   yarn start
```

### Further considerations
1. Additional unit tests to test controllers, utils and observer class
2. Stronger typing (instead of using any in most places)
3. Use dotenv npm package to define global enviornment variable for mainnet (Columbus-5) & testnet (Bombay-12)
4. Route error handling (if request handler is undefined) and frontend loading indication
5. Beautify frontend with a table/graph (perhaps using react-apexcharts npm pkg)
4. Poll backend for live updates instead of requiring refresh