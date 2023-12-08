import UpdateItemService from "./updateItemService";
import { AGED_BRIE, CONJURED, BACKSTAGE_PASSES, SULFURAS } from "./constants";
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  updateItemService: UpdateItemService;

  constructor(items = [] as Array<Item>, updateItemService = new UpdateItemService()) {
    this.items = items;
    this.updateItemService = updateItemService;
  }

  public updateQuality(): Item[] {
    for (let item of this.items) {
      switch (item.name) {
        case SULFURAS: {
          break;
        }
        case AGED_BRIE: {
          this.updateItemService.brie(item);
          break;
        }
        case BACKSTAGE_PASSES: {
          this.updateItemService.backstagePasses(item);
          break;
        }
        case CONJURED: {
          this.updateItemService.conjuredItem(item);
          break;
        }
        default:
          this.updateItemService.standardItem(item);
          break;
      }
    }

    return this.items;
  }
}
