import * as npm from 'npm';
import chalk from 'chalk';

const { version } = require('../../package.json'); // Why is this pointing to the package json of the lib?

export const getLatestVersion = async callback => {
  return true;
};
// export const getLatestVersion = async callback => {
//   return npm.load({ loaded: false }, async err => {
//     if (err) throw err;

//     return npm.commands.view(['@storybook/aem-cli'], true, (param, json) => {
//       if (callback) callback(Object.keys(json)[0]);
//       return Object.keys(json)[0];
//     });
//   });
// };

export const getInstalledVersion = () => version;

export async function checkVersion() {
  return true;
}
// export async function checkVersion() {
//   const installed = getInstalledVersion();
//   getLatestVersion(latest => {
//     if (latest > installed) {
//       const sb = chalk.rgb(255, 71, 133).bold;
//       /* eslint-disable no-console */
//       console.log(
//         [
//           ``,
//           `  ${sb(`---------------------------------------------`)}`,
//           `  ${sb(`|`)}                                           ${sb(`|`)}`,
//           `  ${sb(`|`)}  There's a ${chalk.green(`new version`)} of ${chalk
//             .rgb(255, 71, 133)
//             .bold('@storybook/aem-cli')}!  ${sb(`|`)}`,
//           `  ${sb(`|`)}                                           ${sb(`|`)}`,
//           `  ${sb(`|`)}    ${chalk.bold(`Latest:`)}    v${latest}                      ${sb(`|`)}`,
//           `  ${sb(`|`)}    ${chalk.red.bold(`Installed: v${installed}`)}                      ${sb(
//             `|`
//           )}`,
//           `  ${sb(`|`)}                                           ${sb(`|`)}`,
//           `  ${sb(`---------------------------------------------`)}`,
//           ``,
//         ].join('\n')
//       );
//     }
//   });
// }
