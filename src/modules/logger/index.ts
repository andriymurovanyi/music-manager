import winston from 'winston';
import 'winston-daily-rotate-file';

import path from 'path';
import { format } from 'logform';

function createLogger() {
  const level = process.env.LOG_LEVEL || 'info';
  const format= getFormatter();
  const transports = getTransports();
  return winston.createLogger({ level, format, transports });
}

function getFormatter() {
  const { timestamp, printf } = format;

  const templateFn = (info: any) => {
    const meta = info[Symbol.for('splat')] || {};
    let message = `${info.timestamp} ${info.level}: ${info.message}`;

    // TODO: Find a better solution
    if (Object.keys(meta || {}).length) {
      message += ` - ${JSON.stringify(meta)}`;
    }

    return message;
  };

  return winston.format.combine(timestamp!(), printf!(templateFn));
}

function getTransports() {
  const { DailyRotateFile, Console } = winston.transports;
  const errorLogsPath = resolvePath('logs/error-%DATE%.log');
  const combinedLogsPath = resolvePath('logs/combined-%DATE%.log');

  const transports: any[] = [
    new DailyRotateFile!({ filename: errorLogsPath, level: 'error' }),
    new DailyRotateFile!({ filename: combinedLogsPath }),
    new Console!()
  ];

  if (process.env.NODE_ENV !== 'production') {
    transports.push(new Console!());
  }

  return transports;
}

function resolvePath(logPath: string) {
  const parts = [logPath];

  if (process.env.NODE_ENV === 'production') {
    parts.unshift(__dirname);
  }

  return path.join(...parts);
}

export default createLogger;