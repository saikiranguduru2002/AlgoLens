import { Request, Response } from 'express';
import { algorithmCatalog } from '../algorithms/catalog';
import { generateSteps } from '../algorithms/generateSteps';
import { RunAlgorithmPayload } from '../types';

export const getAlgorithms = (_request: Request, response: Response) => {
  response.json(algorithmCatalog);
};

export const runAlgorithm = (request: Request, response: Response) => {
  const payload = request.body as RunAlgorithmPayload;

  if (!payload?.algorithm) {
    response.status(400).json({ message: 'Algorithm id is required.' });
    return;
  }

  const steps = generateSteps(payload);
  response.json({ steps });
};
