import { Item, GildedRose } from '@/gilded-rose';
import { AGED_BRIE, SULFURAS, BACKSTAGE_PASSES, CONJURED } from '@/constants';
import UpdateItemService from '../../app/updateItemService';

describe("GildedRose class", () => {
  it("should instantiate an ItemUpdaterService by default", () => {
    const gildedRose = new GildedRose([new Item(AGED_BRIE, 10, 50)]);
    expect(gildedRose.updateItemService).toBeInstanceOf(UpdateItemService);
  });

  const service = new UpdateItemService();
  const brieSpy = jest.spyOn(service, 'brie');
  const backstageSpy = jest.spyOn(service, 'backstagePasses');
  const conjuredSpy = jest.spyOn(service, 'conjuredItem');
  const standardSpy = jest.spyOn(service, 'standardItem');

  it("Should call the updater service with a given item", () => {
    const brie = new Item(AGED_BRIE, 10, 50);
    const sulfuras = new Item(SULFURAS, -1, 80);
    const passes = new Item(BACKSTAGE_PASSES, 5, 50);
    const conjured = new Item(CONJURED, 10, 50);
    const standard = new Item("Golden Gun", 10, 15);

    const gildedRose = new GildedRose(
      [brie, sulfuras, passes, conjured, standard],
      service
    );

    gildedRose.updateQuality();

    expect(brieSpy).toHaveBeenCalled();
    expect(brieSpy).toHaveBeenCalledWith(brie);

    expect(backstageSpy).toHaveBeenCalled();
    expect(backstageSpy).toHaveBeenCalledWith(passes)

    expect(conjuredSpy).toHaveBeenCalled();
    expect(conjuredSpy).toHaveBeenCalledWith(conjured)

    expect(standardSpy).toHaveBeenCalled();
    expect(standardSpy).toHaveBeenCalledWith(standard)
  });

  describe(SULFURAS, () => {
    it("should maintain the same sellIn and quality values", () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, -1, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(-1);
    });
  });
});


