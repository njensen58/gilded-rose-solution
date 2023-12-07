import { Item, GildedRose } from '@/gilded-rose';
import { AGED_BRIE, SULFURAS, BACKSTAGE_PASSES, CONJURED } from '@/constants';


describe(AGED_BRIE, () => {
  it("should never have a quality > 50", () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });

  it('should increase quality by 1 if before sell by', () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(4);
  });

  it('should increase quality by 2 if after sell by', () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(-1);
  });
});


describe(SULFURAS, () => {
  it("should have a quality of 80 and the sellin date of -1 doesn't change", () => {
    const gildedRose = new GildedRose([new Item(SULFURAS, -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(-1);
  });
});


describe(BACKSTAGE_PASSES, () => {
  it("has a quality > 0 if not sellin day", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 11, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  })

  it("increases in quality by 1 if sellin > 10", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  it("increases in quality by 2 if sellin <= 10", () => {
    const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("has a quality of 0 if sellin date is 0 or less", () => {
    const gildedRose = new GildedRose([
      new Item(BACKSTAGE_PASSES, 0, 20),
      new Item(BACKSTAGE_PASSES, -1, 20)
    ]);
    const [first, second] = gildedRose.updateQuality();

    expect(first.quality).toBe(0);
    expect(second.quality).toBe(0);
  });
});

