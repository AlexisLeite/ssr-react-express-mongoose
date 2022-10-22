import { readFileSync } from 'fs';
import { replacePlaceholders } from '..';
import { ITemplaterOptions } from './types';

const templater = new (class Templaer {
  loadFromFile(path: string, options?: ITemplaterOptions) {
    let file = readFileSync(path).toString() || `No template${path}`;

    if (options?.replacements) file = replacePlaceholders(file, options.replacements);

    return file;
  }
})();

export default templater;
