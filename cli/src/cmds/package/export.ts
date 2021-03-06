import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as util from 'util';
import * as unzipper from 'unzipper';
import { log, fetchFromAEM } from '../../utils';

const JCR_ROOT = 'jcr_root';
const META_INF = 'META-INF';
const execPromise = util.promisify(exec);
const cwd = process.cwd();

export const exportPackage = async (args, config) => {
  try {
    const localPackageDirectory = path.resolve(cwd, config.localPackagePath);
    const localPackagePath = path.resolve(localPackageDirectory, config.packageName);
    const jcrContentPath = path.resolve(localPackageDirectory, JCR_ROOT);
    const metaInfPath = path.resolve(localPackageDirectory, META_INF);
    const packageManagerUrl = `/crx/packmgr/service/.json`;

    let packageUrl = `/etc/packages`;
    if (config.packageGroup) packageUrl += `/${encodeURIComponent(config.packageGroup)}`;
    packageUrl += `/${encodeURIComponent(config.packageName)}`;
    const fullPackageUrl = `http://localhost:4502${packageUrl}`;

    log(`Rebuilding Storybook AEM Library...`);
    await fetchFromAEM({
      url: `${packageManagerUrl}${packageUrl}?cmd=build`,
      method: `POST`,
    });

    log(`Exporting Storybook AEM Library...`);
    await execPromise(`curl -u admin:admin ${fullPackageUrl} -o "${localPackagePath}"`);

    log(`Unzipping new Storybook Library ...`);
    await execPromise(`rm -rf "${jcrContentPath}"`);
    await execPromise(`rm -rf "${metaInfPath}"`);
    await fs
      .createReadStream(localPackagePath)
      .pipe(unzipper.Extract({ path: localPackageDirectory }))
      .promise();

    log(`Cleaning up...`);
    await execPromise(`rm -rf "${localPackagePath}"`);

    log([`Storybook AEM Library:\n`, `  ${localPackageDirectory}`, ``].join('\n'));
  } catch (e) {
    throw log(`There was an error exporting the Storybook AEM Library`, e);
  }
};
