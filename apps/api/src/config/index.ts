import { Config } from "@marvel-wiki/api-interfaces";
import { config as localConfig } from './config-local';
import { config as prodConfig } from './config-production';
const configs: Config[] = [
    localConfig,
    prodConfig
]

export const getConfig = (env: string): Config => configs.find(c => c.id === env);
 