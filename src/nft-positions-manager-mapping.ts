import {
  Approval,
  ApprovalForAll,
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  Transfer,
} from '../generated/NFTPositionsManager/NFTPositionsManager';
import { Position } from '../generated/schema';
import { BigInt } from "@graphprotocol/graph-ts";

export function handleIncreaseLiquidity(event: IncreaseLiquidity): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity == null) {
    entity = new Position(event.params.tokenId.toHex());
    entity.approved = null;
    entity.tokenId = event.params.tokenId;
    entity.owner = event.transaction.from;
    entity.staked = BigInt.fromI32(0);;
    entity.oldOwner = null;
  }
  entity.liquidity = event.params.liquidity;
  entity.save();
}

export function handleDecreaseLiquidity(event: DecreaseLiquidity): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.liquidity = event.params.liquidity;
    entity.save();
  }
}

export function handleTransfer(event: Transfer): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.oldOwner = event.params.from;
    entity.owner = event.params.to;
    entity.approved = null;
    entity.save();
  }
}

export function handleApproval(event: Approval): void {
  let entity = Position.load(event.params.tokenId.toHex());
  if (entity != null) {
    entity.approved = event.params.approved;
    entity.save();
  }
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleCollect(event: Collect): void {}
