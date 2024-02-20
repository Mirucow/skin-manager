# skin-manager

This is a skin manager for bdsx. It includes conversion between skins and images.


## Features

- [x] Save skin as image
- [x] Construct skin from image
- [ ] Save skin as Base64 text
- [ ] Construct skin from Base64 text


## Usage

### Simulated player with skin

```ts
command.register("smplwithskin", "Spawn simulated player with skin").overload(async (p, o, op) => {
  const pl = o.getEntity();
  if (!pl?.isPlayer()) return;

  const armType = p.armType === "Wide" ? SkinManager.ArmType.Wide : SkinManager.ArmType.Slim;
  const skin = await SkinManager.constructFromImage(__dirname + "/skins/" + p.path + ".png", armType);
  const smpl = SimulatedPlayer.create("Hello", pl.getFeetPos(), pl.getDimensionId(), skin);
  SkinManager.sendSkinToAll(smpl, skin);
}, {
  path: CxxString,
  armType: command.enum("armType", "Wide", "Slim")
});
```


### Save skin as image

```ts
command.register("saveskin", "Save skin as image").overload(async (p, o, op) => {
  const pl = o.getEntity();
  if (!pl?.isPlayer()) return;

  const skin = pl.getSkin();
  await SkinManager.saveAsImage(skin, __dirname + "/skins/" + p.path + ".png");
}, {
  path: CxxString
});
```


***



## Quickstart

### 1. install Jimp

First, you need to install Jimp to your plugin.

```
npm i jimp@0.9.8
```

> [!WARNING]
> Jimp must be 0.9.8 version.


### 2. Copy skin-manager.ts

Copy paste a code from skin-manager.ts in this repo.


### 3. That's finish!

You can use skin manager now!


## Contact

- Discord @mc.w
