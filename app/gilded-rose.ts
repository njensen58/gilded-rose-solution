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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  public updateQuality(): Item[] {
    for (let i = 0; i < this.items.length; i++) {
      const curr = this.items[i];
      switch (curr.name) {
        case SULFURAS: {
          break;
        }
        case AGED_BRIE: {
          this.updateBrie(curr);
          break;
        }
        case BACKSTAGE_PASSES: {
          this.updateBackstagePasses(curr);
          break;
        }
        case CONJURED: {
          this.updateConjuredItem(curr);
          break;
        }
        // All other items with no special cases
        default:
          this.updateStandardItem(curr);
          break;
      }
    }

    return this.items;
  }

  private updateBrie(brie): void {
    if (brie.quality < 50) {
      if (brie.sellIn > 0) {
        brie.quality += 1
      } else {
        brie.quality = Math.min(brie.quality + 2 || 50);
      }
    }
    brie.sellIn -= 1;
  }

  private updateBackstagePasses(pass): void {
    if (pass.sellIn <= 0) {
      pass.sellIn -= 1;
      pass.quality = 0;
      return;
    }

    if (pass.sellIn > 10) {
      pass.quality = Math.min(pass.quality + 1, 50);
    } else if (pass.sellIn > 5) {
      pass.quality = Math.min(pass.quality + 2, 50);
    } else if (pass.sellIn > 0) {
      pass.quality = Math.min(pass.quality + 3, 50);
    }
    pass.sellIn -= 1;
  }

  private updateStandardItem(item): void {
    if (item.sellIn > 0) {
      item.quality = Math.max(item.quality - 1, 0);
    } else {
      item.quality = Math.max(item.quality - 2, 0);
    }
    item.sellIn -= 1;
  }

  private updateConjuredItem(item): void {
    if (item.sellIn > 0) {
      item.quality = Math.max(item.quality - 2, 0);
    } else {
      item.quality = Math.max(item.quality - 4, 0);
    }
    item.sellIn -= 1
  }
}
