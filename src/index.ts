#!/usr/bin/env node

import { Command } from 'commander';
import { add } from './commands/add';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

(() => {
  const program = new Command();

  program
    .name('webchemist-hook')
    .description('desc')
    .version('1.0.0');

  program.addCommand(add);

  program.parse();
})();
