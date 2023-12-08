export default class ItemUpdaterService {
	private readonly minimum = 0;
	private readonly maximum = 50;

	public brie(brie): void {
		if (brie.quality < this.maximum) {
			if (brie.sellIn > 0) {
				brie.quality += 1
			} else {
				brie.quality = this.setMinQuality(brie.quality + 2, this.maximum);
			}
		}
		this.decrementSellIn(brie)
	}

	public backstagePasses(pass): void {
		if (pass.sellIn > 10) {
			pass.quality = this.setMinQuality(pass.quality + 1, this.maximum);
		} else if (pass.sellIn > 5) {
			pass.quality = this.setMinQuality(pass.quality + 2, this.maximum);
		} else if (pass.sellIn > 0) {
			pass.quality = this.setMinQuality(pass.quality + 3, this.maximum);
		} else {
			pass.quality = 0;
		}
		this.decrementSellIn(pass)
	}

	public standardItem(item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.setMaxQuality(item.quality - 1, this.minimum);
		} else {
			item.quality = this.setMaxQuality(item.quality - 2, this.minimum);
		}
		this.decrementSellIn(item)
	}

	public conjuredItem(item): void {
		if (item.sellIn > this.minimum) {
			item.quality = this.setMaxQuality(item.quality - 2, this.minimum);
		} else {
			item.quality = this.setMaxQuality(item.quality - 4, this.minimum);
		}
		this.decrementSellIn(item)
	}

	private setMaxQuality(newQuality, max) {
		return Math.max(newQuality, max);
	}

	private setMinQuality(newQuality, min) {
		return Math.min(newQuality, min);
	}

	private decrementSellIn(item): void {
		item.sellIn -= 1;
	}
}