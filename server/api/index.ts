import type { VercelRequest, VercelResponse } from '@vercel/node';
 import {init} from "../src/index";

export default function handler(request: VercelRequest, response: VercelResponse) {
  init()
}