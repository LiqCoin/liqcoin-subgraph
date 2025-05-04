import { ByteArray, Bytes } from "@graphprotocol/graph-ts";
import {
  AddTokenInfo as AddTokenInfoEvent,
} from "../generated/LPLaunchState/LPLaunchState";
import { TokenInfo, Launch } from "../generated/schema";

export function handleAddTokenInfo(event: AddTokenInfoEvent): void {
  let launchId = event.params.launchId.toHexString();
  let entity = new TokenInfo(event.logIndex.toHexString() + "-" + launchId);
  entity.launch = launchId;
  entity.name = event.params.info.name;
  entity.symbol = event.params.info.symbol;
  entity.description = event.params.info.description;
  entity.image = event.params.info.image;
  entity.twitter = event.params.info.twitter;
  entity.telegram = event.params.info.telegram;
  entity.discord = event.params.info.discord;
  entity.youtube = event.params.info.youtube;
  entity.website = event.params.info.website;
  entity.link = event.params.info.link;
  entity.github = event.params.info.github;
  entity.instagram = event.params.info.instagram;
  entity.tiktok = event.params.info.tiktok;
  entity.linkedin = event.params.info.linkedin;
  entity.save();

  // let launch = Launch.load(launchId);
  // if (launch) {
  //   launch.tokenInfo = entity.id;
  //   launch.save();
  // }

}