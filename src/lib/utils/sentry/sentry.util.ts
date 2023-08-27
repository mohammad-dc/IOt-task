import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { appConfig } from '../../../lib/config/app.config';
import { Application } from 'express';

export const initSentry = (app: Application) =>
  Sentry.init({
    dsn: appConfig.sentry.dsn,
    integrations: [new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });

export const sentryRequestHandler = () => Sentry.Handlers.requestHandler();
export const sentryTracingHandler = () => Sentry.Handlers.tracingHandler();
export const sentryErrorHandler = () => Sentry.Handlers.errorHandler();

export const captureException = (error) => Sentry.captureException(error);
