import { ServerRespond } from './DataStreamer';

export interface Row {
  // define properties of object of class Row
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    // declare or compute values of the various required entities
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.035;
    const lowerBound = 1 - 0.035;
    return {
      //return corresponding values after being processed
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
