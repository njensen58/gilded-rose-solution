import { Item } from '@/gilded-rose';
import { AGED_BRIE, BACKSTAGE_PASSES, CONJURED } from '@/constants';
import UpdateItemService from '../../app/updateItemService';

describe("Item Updater Service", () => {
    const service = new UpdateItemService();

    describe(AGED_BRIE, () => {
        it("should never have a quality > 50", () => {
            const item = new Item(AGED_BRIE, 10, 50);
            service.brie(item);
            expect(item.quality).toBe(50);
            expect(item.sellIn).toBe(9);
        });

        it('should increase quality by 1 if before sell by', () => {
            const item = new Item(AGED_BRIE, 5, 20);
            service.brie(item);
            expect(item.quality).toBe(21);
            expect(item.sellIn).toBe(4);
        });

        it('should increase quality by 2 if after sell by', () => {
            const item = new Item(AGED_BRIE, 0, 20);
            service.brie(item);
            expect(item.quality).toBe(22);
            expect(item.sellIn).toBe(-1);
        });
    });

    describe(BACKSTAGE_PASSES, () => {
        it("has a quality > 0 if not sellin day", () => {
            const item = new Item(BACKSTAGE_PASSES, 11, 0);
            service.backstagePasses(item);
            expect(item.quality).toBe(1);
        });

        it("increases in quality by 1 if sellin > 10", () => {
            const item = new Item(BACKSTAGE_PASSES, 11, 20);
            service.backstagePasses(item);
            expect(item.quality).toBe(21);
        });

        it("increases in quality by 2 if sellin <= 10", () => {
            const item = new Item(BACKSTAGE_PASSES, 10, 20);
            service.backstagePasses(item);
            expect(item.quality).toBe(22);
        });

        it("increases in quality by 3 if sellin <= 5", () => {
            const item = new Item(BACKSTAGE_PASSES, 5, 20);
            service.backstagePasses(item);
            expect(item.quality).toBe(23);
        });

        it("has a quality of 0 if sellin date is 0 or less", () => {
            const item1 = new Item(BACKSTAGE_PASSES, 0, 20);
            const item2 = new Item(BACKSTAGE_PASSES, -1, 20);
            service.backstagePasses(item1);
            service.backstagePasses(item2);

            expect(item1.quality).toBe(0);
            expect(item2.quality).toBe(0);
        });
    });

    describe(CONJURED, () => {
        it("always has a quality >= 0", () => {
            const item1 = new Item(CONJURED, 5, 0);
            const item2 = new Item(CONJURED, -1, 1);

            service.conjuredItem(item1);
            service.conjuredItem(item2);

            expect(item1.quality).toBe(0);
            expect(item1.sellIn).toBe(4);
            expect(item2.quality).toBe(0);
            expect(item2.sellIn).toBe(-2);
        });

        it("reduces the sellin by 1 and quality by 2 if sellin > 0", () => {
            const item = new Item(CONJURED, 5, 3);
            service.conjuredItem(item);
            expect(item.quality).toBe(1);
            expect(item.sellIn).toBe(4);
        });

        it("reduces the sellin by 1 and quality by 4 if sellin <= 0", () => {
            const item1 = new Item(CONJURED, 0, 5);
            const item2 = new Item(CONJURED, -1, 5);

            service.conjuredItem(item1);
            service.conjuredItem(item2);

            expect(item1.quality).toBe(1);
            expect(item1.sellIn).toBe(-1);
            expect(item2.quality).toBe(1);
            expect(item2.sellIn).toBe(-2);
        });
    });


    describe("All other items", () => {
        it("always has quality >= 0", () => {
            const item1 = new Item("Golden Gun", 5, 0);
            const item2 = new Item("Golden Gun", -1, 1);

            service.standardItem(item1);
            service.standardItem(item2);

            expect(item1.quality).toBe(0);
            expect(item1.sellIn).toBe(4);
            expect(item2.quality).toBe(0);
            expect(item2.sellIn).toBe(-2);
        });

        it("reduces the sellin by 1 and quality by 1 if sellin > 0", () => {
            const item = new Item("Golden Gun", 5, 1);
            service.standardItem(item);

            expect(item.quality).toBe(0);
            expect(item.sellIn).toBe(4);
        });

        it("reduces the sellin by 1 and quality by 2 if sellin <= 0", () => {
            const item1 = new Item("Golden Gun", 0, 1);
            const item2 = new Item("Golden Gun", -1, 2)

            service.standardItem(item1);
            service.standardItem(item2);

            expect(item1.quality).toBe(0);
            expect(item1.sellIn).toBe(-1);
            expect(item2.quality).toBe(0);
            expect(item2.sellIn).toBe(-2);
        });
    });
});