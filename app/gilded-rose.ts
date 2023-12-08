import ItemUpdaterService from "./itemUpdaterService";
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
  updateItem: ItemUpdaterService;

  constructor(items = [] as Array<Item>, updateItem = new ItemUpdaterService()) {
    this.items = items;
    this.updateItem = updateItem;
  }

  public updateQuality(): Item[] {
    for (let item of this.items) {
      switch (item.name) {
        case SULFURAS: {
          break;
        }
        case AGED_BRIE: {
          this.updateItem.brie(item);
          break;
        }
        case BACKSTAGE_PASSES: {
          this.updateItem.backstagePasses(item);
          break;
        }
        case CONJURED: {
          this.updateItem.conjuredItem(item);
          break;
        }
        default:
          this.updateItem.standardItem(item);
          break;
      }
    }

    return this.items;
  }
}
