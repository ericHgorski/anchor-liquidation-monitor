# anchor-liquidation-monitor

## Further considerations
1. Additional unit tests to test controllers, utils and observer class
2. Stronger typing
3. Use dotenv npm package to define global enviornment variable for mainnet (Columbus-5) & testnet (Bombay-12)
4. Route error handling (if request handler is undefined) and frontend loading indication
5. Beautify frontend with a table/graph (perhaps using react-apexcharts npm pkg)
6. Poll backend for live updates instead of requiring refresh
7. Consider nexus protocol related borrow/repay events separately?
8. Consider ETH collateral as well
9. Performance improvment: querying all relevant borrow info in one go instead of iterating over addreses

### Install

```bash
   yarn install
```

### Run Service (Production)
```bash
   yarn start
```
