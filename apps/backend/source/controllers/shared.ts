import axios from 'axios';
import * as fs from 'fs';
import { Request, Response, NextFunction } from 'express';

import { APP_CONSTANTS, FIAT_RATE_API, FIAT_VENUES } from '../shared/consts.js';
import { logger } from '../shared/logger.js';
import handleError from '../shared/error-handler.js';
import { APIError } from '../models/errors.js';

class SharedController {
  getApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Application Settings from ' + APP_CONSTANTS.CONFIG_LOCATION);
      res.status(200).json(JSON.parse(fs.readFileSync(APP_CONSTANTS.CONFIG_LOCATION, 'utf-8')));
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  setApplicationSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Updating Application Settings: ' + JSON.stringify(req.body));
      fs.writeFileSync(APP_CONSTANTS.CONFIG_LOCATION, JSON.stringify(req.body, null, 2), 'utf-8');
      res.status(201).json({ message: 'Application Settings Updated Successfully' });
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  getWalletConnectSettings(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Connection Settings');
      let macaroon = '';
      if (fs.existsSync(APP_CONSTANTS.MACAROON_PATH)
      ) {
        logger.info('Getting REST Access Macaroon from ' + process.env.CLN_REST_CERT_DIR);
        macaroon = Buffer.from(
          fs.readFileSync(APP_CONSTANTS.MACAROON_PATH),
        ).toString('hex');
      }
      logger.warn(macaroon);
      const CONNECT_WALLET_SETTINGS = {
        DEVICE_DOMAIN_NAME: 'http://' + process.env.DEVICE_DOMAIN_NAME || '',
        TOR_HOST: 'http://' + process.env.CLN_REST_HIDDEN_SERVICE || '',
        WS_PORT: process.env.CLN_DAEMON_WS_PORT || '',
        GRPC_PORT: process.env.CLN_DAEMON_GRPC_PORT || '',
        REST_PORT: process.env.CLN_REST_PORT || '',
        REST_MACAROON: macaroon,
      };
      res.status(200).json(CONNECT_WALLET_SETTINGS);
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }

  getFiatRate(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Getting Fiat Rate for: ' + req.params.fiatCurrency);
      const FIAT_VENUE = FIAT_VENUES.hasOwnProperty(req.params.fiatCurrency)
        ? FIAT_VENUES[req.params.fiatCurrency]
        : 'COINGECKO';
      return axios
        .get(FIAT_RATE_API + FIAT_VENUE + '/pairs/XBT/' + req.params.fiatCurrency)
        .then((response: any) => {
          logger.info('Fiat Response: ' + JSON.stringify(response.data));
          if (response.data.rate) {
            return res.status(200).json({ venue: FIAT_VENUE, rate: response.data.rate });
          } else {
            return handleError(new APIError('Price Not Found', 'Price Not Found'), req, res, next);
          }
        })
        .catch(err => {
          return handleError(err, req, res, next);
        });
    } catch (error: any) {
      handleError(error, req, res, next);
    }
  }
}

export default new SharedController();
