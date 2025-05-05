import { PublicClient, mainnet } from "@lens-protocol/client";
import { fragments } from "../fragments";

export const lensClient = PublicClient.create({
  environment: mainnet,
  fragments,
}); 