import { Buffer } from 'node:buffer';
import { Readable } from 'node:stream';
import type { MarkdownImage } from '@/utils/types';
import Config from './Config';

export type UploadFile = Promise<Readable | Buffer>;

export interface UploadFileContext {
  url: string;
  baseDir: string;
}

export interface UploadFileResult {
  url?: string;
}

export interface TransformOptions {
  baseDir: string;
  filename: string;
  ext: string;
  shortPath: string;
  markdown: string;
  images: MarkdownImage[];
  config: Config;
}

export interface BaseOptions {}

export interface PluginConfig {
  images?: Record<string, string>;
}
