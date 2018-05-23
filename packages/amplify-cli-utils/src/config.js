import { existsSync, writeFileSync } from 'fs';
import Config from 'appcd-config';

import { configFile as amplifyConfigFile } from './locations';

/**
 * Load a users config, if no userConfig is given then the default AMPLIFY CLI config will be loaded.
 *
 * @param {Object} [opts] - An object with various options.
 * @param {String} [opts.configFile] - Path to the config file to load as the reference.
 * @param {String} [opts.userConfig=~/.axway/amplify-cli.json] - Path to the user defined config file.
 * If the file does not exist, an empty object will be written
 * @returns {Object} An appcd-config instance
 */
export default function loadConfig({ configFile, userConfig } = {}) {
	if (!userConfig) {
		userConfig = amplifyConfigFile;
	}

	if (!existsSync(userConfig)) {
		writeFileSync(userConfig, JSON.stringify({}));
	}

	const cfg = new Config({ configFile });
	cfg.loadUserConfig(userConfig);

	return cfg;
}
