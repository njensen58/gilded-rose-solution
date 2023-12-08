import { Item } from "./gilded-rose";

export default class UpdateItemService {
	private readonly minimum = 0;
	private readonly maximum = 50;

	private getMaxQuality(newQuality: number): number {
		return Math.max(newQuality, this.minimum);
	}

	private getMinQuality(newQuality: number): number {
		return Math.min(newQuality, this.maximum);
	}

	private decrementSellIn(item: Item): void {
		item.sellIn -= 1;
	}

	public brie(brie: Item): void {
		if (brie.quality < this.maximum) {
			if (brie.sellIn > this.minimum) {
				brie.quality += 1;
			} else {
				brie.quality = this.getMinQuality(brie.quality + 2);
			}
		}
		this.decrementSellIn(brie);
	}

	public backstagePasses(pass: Item): void {
		if (pass.sellIn > 10) {
			pass.quality = this.getMinQuality(pass.quality + 1);
		} else if (pass.sellIn > 5) {
			pass.quality = this.getMinQuality(pass.quality + 2);
		} else if (pass.sellIn > this.minimum) {
			pass.quality = this.getMinQuality(pass.quality + 3);
		} else {
			pass.quality = this.minimum;
		}
		this.decrementSellIn(pass);
	}

	public standardItem(item: Item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.getMaxQuality(item.quality - 1);
		} else {
			item.quality = this.getMaxQuality(item.quality - 2);
		}
		this.decrementSellIn(item);
	}

	public conjuredItem(item: Item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.getMaxQuality(item.quality - 2);
		} else {
			item.quality = this.getMaxQuality(item.quality - 4);
		}
		this.decrementSellIn(item);
	}
}