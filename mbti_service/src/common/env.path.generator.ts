import * as path from 'path';

export function envPathGenerator() {
  const envPath =
    process.env.NODE_ENV === 'main'
      ? path.join(__dirname, '../config/env/.main.env')
      : path.join(__dirname, '../config/env/.dev.env');
  console.log('envpath: ', envPath);
  return envPath;
}
