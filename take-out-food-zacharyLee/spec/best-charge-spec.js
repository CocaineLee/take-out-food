var {dataFormat,addDataDetail,halfPrice,minusSix,bestCharge} = require('../src/best-charge');
// var addDataDetail= require('../src/best-charge');
// var halfPrice=require('../src/best-charge');


describe('Take out food', function () {
    it('dataFormat',function(){
        let selectedItems=["ITEM0013 x 4", "ITEM0022 x 1"];
        let result=dataFormat(selectedItems);
        let expected=[["ITEM0013",'4'],['ITEM0022','1']];
        expect(result).toEqual(expected);
    });

    it('addDataDetail',function(){
        let itemData=[["ITEM0013",'4'],['ITEM0022','1']]
        let result=addDataDetail(itemData);
        let expected=[{
            id: 'ITEM0013',
            name: '肉夹馍',
            price :6.00,
            num : 4    
        },{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00,
            num : 1
        }];
        expect(result).toEqual(expected);
    });

    it('halfPrice',function(){
        let detaiData=[{
            id: 'ITEM0013',
            name: '肉夹馍',
            price :6.00,
            num : 4    
        },{
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00,
            num : 1
        }];
        let total=32;
        let result=halfPrice(detaiData,total);
        let expected=28;
        expect(result).toEqual(expected);
    });

    it('minusSix',function(){
        let total=32;
        let result=minusSix(total);
        let expected=26;
        expect(result).toEqual(expected);
    });
  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});