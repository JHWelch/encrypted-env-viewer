import fs from 'fs';
import path from 'path';

export const loadFixture = (name) => {
  const fixturePath = path.join(__dirname, '..', 'fixtures', name);

  return fs.readFileSync(fixturePath, 'utf8');
}
