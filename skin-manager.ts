import { PlayerSkinPacket } from "bdsx/bds/packets";
import { Player } from "bdsx/bds/player";
import { SerializedSkin } from "bdsx/bds/skin";
import { bedrockServer } from "bdsx/launcher";
import * as Jimp from "jimp";





export namespace SkinManager {
  export enum ArmType {
    Slim,
    Wide
  }



  export async function constructFromImage(path: string, armType: ArmType): Promise<SerializedSkin> {
    const image = await Jimp.read(path);
    const { width, height, data } = image.bitmap;

    const skin = SerializedSkin.construct();
    skin.id = Math.floor(Math.random() * 100000).toString();
    skin.fullId = skin.id;
    const slim = armType === ArmType.Slim ? "Slim" : "";
    skin.resourcePatch = `{\n"geometry":{\n"default":"geometry.humanoid.custom${slim}"\n}\n}\n`;
    skin.defaultGeometryName = `geometry.humanoid.custom${slim}`;
    skin.skinImage.width = width;
    skin.skinImage.height = height;
    skin.skinImage.blob.setFromBuffer(data);
    skin.armSizeType = armType;
    skin.isTrustedSkin = 1;
    return skin;
  }

  export async function saveAsImage(skin: SerializedSkin, path: string): Promise<void> {
    const image = new Jimp(skin.skinImage.width, skin.skinImage.height);
    const data = skin.skinImage.blob.toBuffer();
    image.bitmap.data = Buffer.from(data);
    await image.writeAsync(path);
  }



  export function sendSkin(pl: Player, skin: SerializedSkin, to: Player[]) {
    const pk = PlayerSkinPacket.allocate();
    pk.uuid = pl.getUuid();
    pk.localizedNewSkinName = "";
    pk.localizedOldSkinName = "";
    pk.skin.destruct();
    pk.skin.construct(skin);
    for (const p of to) {
      p.sendPacket(pk);
    }
    pk.dispose();
  }

  export function sendSkinToAll(pl: Player, skin: SerializedSkin): void {
    sendSkin(pl, skin, bedrockServer.level.getPlayers());
  }
}
