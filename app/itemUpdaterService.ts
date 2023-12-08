import { Item } from "./gilded-rose";

export default class ItemUpdaterService {
	private readonly minimum = 0;
	private readonly maximum = 50;

	public brie(brie: Item): void {
		if (brie.quality < this.maximum) {
			if (brie.sellIn > 0) {
				brie.quality += 1;
			} else {
				brie.quality = this.setMinQuality(brie.quality + 2);
			}
		}
		this.decrementSellIn(brie);
	}

	public backstagePasses(pass: Item): void {
		if (pass.sellIn > 10) {
			pass.quality = this.setMinQuality(pass.quality + 1);
		} else if (pass.sellIn > 5) {
			pass.quality = this.setMinQuality(pass.quality + 2);
		} else if (pass.sellIn > 0) {
			pass.quality = this.setMinQuality(pass.quality + 3);
		} else {
			pass.quality = 0;
		}
		this.decrementSellIn(pass);
	}

	public standardItem(item: Item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.setMaxQuality(item.quality - 1);
		} else {
			item.quality = this.setMaxQuality(item.quality - 2);
		}
		this.decrementSellIn(item);
	}

	public conjuredItem(item: Item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.setMaxQuality(item.quality - 2);
		} else {
			item.quality = this.setMaxQuality(item.quality - 4,);
		}
		this.decrementSellIn(item);
	}

	private setMaxQuality(newQuality: number): number {
		return Math.max(newQuality, this.minimum);
	}

	private setMinQuality(newQuality: number): number {
		return Math.min(newQuality, this.maximum);
	}

	private decrementSellIn(item: Item): void {
		item.sellIn -= 1;
	}
}